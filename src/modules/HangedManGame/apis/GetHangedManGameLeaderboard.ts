import { prisma } from "../../../database/prisma";
import { getDateFromPeroid, Peroid } from "../../../utils/GetDateFromPeroid";
import { rankingToText } from "../../../utils/RankingToText";

interface GetHangedManGameLeaderboardOptions {
	peroid?: Peroid;
	top: number;
}

export async function getHangedManGameLeaderboards(
	twitchUserId: string,
	options?: GetHangedManGameLeaderboardOptions
) {
	let limitDate: Date | undefined;

	if (options && options.peroid) {
		limitDate = getDateFromPeroid(options.peroid);
	}

	const guessLogs = await prisma.hangedManGameAttemptedLog.findMany({
		where: {
            isCorrect: true,
			createAt: {
				gte: limitDate,
			},
		},
	});

	const playerScoreRecord: {
		[twitchUserId: string]: {
			twitchUserId: string;
			twitchUsername: string;
			score: number;
		};
	} = {};

	for (const guessLog of guessLogs) {
		if (!playerScoreRecord[guessLog.twitchUserId]) {
			playerScoreRecord[guessLog.twitchUserId] = {
				twitchUserId: guessLog.twitchUserId,
				twitchUsername: guessLog.twitchUsername,
				score: 0,
			};
		}
		playerScoreRecord[guessLog.twitchUserId].score += guessLog.score;
	}

	const playerScoreList = Object.entries(playerScoreRecord)
		.map(([_, value]) => value)
		.sort((a, b) => b.score - a.score)
		.map((player, index) => ({
			...player,
			ranking: index + 1,
		}));

	let modifiedPlayerScoreList = playerScoreList;

	if (options && options.top) {
		modifiedPlayerScoreList = playerScoreList.slice(0, options.top);
	}

	const targetPlayer = {
		score: playerScoreRecord[twitchUserId]?.score || 0,
		ranking:
			playerScoreList.find(
				(player) => player.twitchUserId === twitchUserId
			)?.ranking || "-",
	};

	let playerScoreListText = modifiedPlayerScoreList
		.map(
			(playerScore) =>
				`${rankingToText(playerScore.ranking)}: ${
					playerScore.twitchUsername
				} - (${playerScore.score})`
		)
		.join(" | ");

	return {
		leaderboards: modifiedPlayerScoreList,
		text: playerScoreListText,
		targetPlayer,
	};
}

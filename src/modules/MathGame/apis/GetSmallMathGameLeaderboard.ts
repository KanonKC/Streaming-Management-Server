import { prisma } from "../../../database/prisma";

interface GetSmallMathGameLeaderboardOptions {
	peroid?: "daily" | "weekly" | "monthly" | "alltime";
	top: number;
}

function rankingToText(ranking: number) {
	if (ranking === 1) {
		return "🥇";
	} else if (ranking === 2) {
		return "🥈";
	} else if (ranking === 3) {
		return "🥉";
	} else {
		return `${ranking}th`;
	}
}

export async function getSmallMathGameLeaderboard(
	twitchUserId: string,
	options?: GetSmallMathGameLeaderboardOptions
) {
	let limitDate: Date | undefined;

	if (options && options.peroid) {
		if (options.peroid === "daily") {
			limitDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
		} else if (options.peroid === "weekly") {
			limitDate = new Date(
				new Date().getTime() - 1000 * 60 * 60 * 24 * 7
			);
		} else if (options.peroid === "monthly") {
			limitDate = new Date(
				new Date().getTime() - 1000 * 60 * 60 * 24 * 30
			);
		}
	}

	const guessLogs = await prisma.mathGameGuessLog.findMany({
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
		playerScoreRecord[guessLog.twitchUserId].score += 1;
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

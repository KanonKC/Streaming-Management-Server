import { prisma } from "../../../database/prisma";
import { getTwitchUsersById } from "../../../services/Twitch.service";
import { TwitchUser } from "../../../types/Twitch.type";
import { getDateFromPeroid, Peroid } from "../../../utils/GetDateFromPeroid";
import { rankingToText } from "../../../utils/RankingToText";

interface GetHangedManGameLeaderboardOptions {
	startPeroid?: Peroid;
	endPeroid?: Peroid;
	offset?: number;
	limit?: number;
}

export async function getHangedManGameLeaderboards(
	twitchUserId: string,
	options?: GetHangedManGameLeaderboardOptions
) {
	let startDate: Date | undefined;
	let endDate: Date | undefined;

	if (options && options.startPeroid) {
		startDate = getDateFromPeroid(options.startPeroid);
	}
	if (options && options.endPeroid) {
		endDate = getDateFromPeroid(options.endPeroid);
	}

	const guessLogs = await prisma.hangedManGameAttemptedLog.findMany({
		where: {
			isCorrect: true,
			createAt: {
				gte: startDate,
				lte: endDate,
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

	const playerIdList = [
		twitchUserId,
		...Object.keys(playerScoreRecord),
	].filter((value, index, self) => self.indexOf(value) === index);

	let twitchUserList: TwitchUser[] = [];
	try {
		const twitchUserListResponse = await getTwitchUsersById(playerIdList);
		twitchUserList = twitchUserListResponse.data.data;
	} catch (error) {}

	const playerScoreList = Object.entries(playerScoreRecord)
		.map(([_, value]) => value)
		.sort((a, b) => b.score - a.score)
		.map((player, index) => ({
			...player,
			ranking: index + 1,
			imageUrl: twitchUserList.find(
				(twitchUser) => twitchUser.id === player.twitchUserId
			)?.profile_image_url,
		}));

	let modifiedPlayerScoreList = playerScoreList;

	if (options && options.offset) {
		modifiedPlayerScoreList = modifiedPlayerScoreList.slice(options.offset);
	}
	if (options && options.limit) {
		modifiedPlayerScoreList = modifiedPlayerScoreList.slice(
			0,
			options.limit
		);
	}

	let targetPlayer = playerScoreList.find(
		(player) => player.twitchUserId === twitchUserId
	);

	if (!targetPlayer) {
        const targetTwitchUser = twitchUserList.find(user => user.id === twitchUserId);

        if (!targetTwitchUser) throw new Error("User not found");

		targetPlayer = {
            twitchUserId,
            twitchUsername: targetTwitchUser.display_name,
            score: 0,
            ranking: 0,
            imageUrl: targetTwitchUser.profile_image_url,
        }
	}

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
        total: playerScoreList.length,
	};
}

import { prisma } from "../../../database/prisma";
import { getTwitchUsersById } from "../../../services/Twitch.service";
import { TwitchUser } from "../../../types/Twitch.type";
import { getDateFromPeroid, Peroid } from "../../../utils/GetDateFromPeroid";
import { rankingToText } from "../../../utils/RankingToText";

interface GetLeaderboardsOptions {
	startPeroid?: Peroid;
	endPeroid?: Peroid;
	offset?: number;
	limit?: number;
}

export type LeaderboardsType =  "hanged-man" | "math-game"

export async function getLeaderboards(
	leaderboards: LeaderboardsType,
	twitchUserId: string,
	options?: GetLeaderboardsOptions
) {
	let startDate: Date | undefined;
	let endDate: Date | undefined;

	if (options && options.startPeroid) {
		startDate = getDateFromPeroid(options.startPeroid);
	}
	if (options && options.endPeroid) {
		endDate = getDateFromPeroid(options.endPeroid);
	}

	const playerIdToScoreTable: {
		[twitchUserId: string]: {
			twitchUserId: string;
			score: number;
		};
	} = {};

	if (leaderboards === "hanged-man") {
		const guessLogs = await prisma.hangedManGameAttemptedLog.findMany({
			where: {
				isCorrect: true,
				createAt: {
					gte: startDate,
					lte: endDate,
				},
			},
		});

		for (const guessLog of guessLogs) {
			if (!playerIdToScoreTable[guessLog.twitchUserId]) {
				playerIdToScoreTable[guessLog.twitchUserId] = {
					twitchUserId: guessLog.twitchUserId,
					score: 0,
				};
			}
			playerIdToScoreTable[guessLog.twitchUserId].score += guessLog.score;
		}
	} else if (leaderboards === "math-game") {
        const guessLogs = await prisma.mathGameGuessLog.findMany({
            where: {
                isCorrect: true,
                createAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        for (const guessLog of guessLogs) {
			if (!playerIdToScoreTable[guessLog.twitchUserId]) {
				playerIdToScoreTable[guessLog.twitchUserId] = {
					twitchUserId: guessLog.twitchUserId,
					score: 0,
				};
			}
			playerIdToScoreTable[guessLog.twitchUserId].score += 1;
		}
    } else {
        throw new Error("Invalid leaderboards type");
    }

	// Create unique list of player id
	const playerIdList = [
		twitchUserId,
		...Object.keys(playerIdToScoreTable),
	].filter((value, index, self) => self.indexOf(value) === index);

	let twitchUserList: TwitchUser[] = [];
	try {
		const twitchUserListResponse = await getTwitchUsersById(playerIdList);
		twitchUserList = twitchUserListResponse.data.data;
	} catch (error) {}

	const twichUserIdToTwitchUserTable: {
		[twitchUserId: string]: TwitchUser;
	} = twitchUserList.reduce(
		(object, twitchUser) => ({
			...object,
			[twitchUser.id]: { ...twitchUser },
		}),
		{}
	);

	const leaderboardsList = Object.entries(playerIdToScoreTable)
		.map(([_, value]) => value)
		.sort((a, b) => b.score - a.score)
		.map((player, index) => ({
			...player,
			ranking: index + 1,
			imageUrl:
				twichUserIdToTwitchUserTable[player.twitchUserId]
					.profile_image_url,
			twitchUsername:
				twichUserIdToTwitchUserTable[player.twitchUserId].display_name,
		}));

	let modifiedLeaderboardsList = leaderboardsList;

	if (options && options.offset) {
		modifiedLeaderboardsList = modifiedLeaderboardsList.slice(
			options.offset
		);
	}
	if (options && options.limit) {
		modifiedLeaderboardsList = modifiedLeaderboardsList.slice(
			0,
			options.limit
		);
	}

	let targetPlayer = leaderboardsList.find(
		(player) => player.twitchUserId === twitchUserId
	);

	if (!targetPlayer) {
		const targetTwitchUser = twichUserIdToTwitchUserTable[twitchUserId];
		targetPlayer = {
			twitchUserId,
			twitchUsername: targetTwitchUser.display_name,
			score: 0,
			ranking: 0,
			imageUrl: targetTwitchUser.profile_image_url,
		};
	}

	const playerScoreListText = modifiedLeaderboardsList
		.map(
			(playerScore) =>
				`${rankingToText(playerScore.ranking)}: ${
					playerScore.twitchUsername
				} - (${playerScore.score})`
		)
		.join(" | ");

	return {
		leaderboards: modifiedLeaderboardsList,
		text: playerScoreListText,
		targetPlayer,
        total: leaderboardsList.length,
	};
}

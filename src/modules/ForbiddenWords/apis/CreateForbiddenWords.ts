import { prisma } from "../../../database/prisma";
import { getTwitchUserById } from "../../../services/Twitch.service";

export async function createForbiddenWords(twitchUserId: string, word: string) {
	const { data: userList } = await getTwitchUserById(twitchUserId);
	const user = userList.data[0];
	return prisma.forbiddenWords.create({
		data: {
			twitchUserId,
			twitchUsername: user.display_name,
			word: word,
		},
	});
}

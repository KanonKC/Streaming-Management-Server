import { prisma } from "../../database/prisma";

export async function recordTwitchUserRevealTarotCard(payload: {
	twitchUserId: string;
	majorCardId: number;
	minorCardId: number;
}) {
	const { twitchUserId, majorCardId, minorCardId } = payload;
	return prisma.twitchUserRevealTarotCard.create({
		data: {
			twitchUserId,
			majorCardId,
			minorCardId,
		},
	});
}

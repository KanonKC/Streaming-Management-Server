import { prisma } from "../../database/prisma";
import { RevealTarotCard } from "./RevealTarotCard";

export async function recordTwitchUserRevealTarotCard(payload: {
	twitchUserId: string;
	majorCardId: number;
	minorCardId: number;
    data: RevealTarotCard;
}) {
	const { twitchUserId, majorCardId, minorCardId, data } = payload;
	return prisma.twitchUserRevealTarotCard.create({
		data: {
			twitchUserId,
			majorCardId,
			minorCardId,
            data: JSON.stringify(data),
		},
	});
}

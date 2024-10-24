import { MajorCards } from "../../constants/Tarot.constant";
import { prisma } from "../../database/prisma";

export async function getTwitchUserTarotCardDetail(twitchUserId: string) {
	const userRecords = await prisma.twitchUserRevealTarotCard.findMany({
		where: { twitchUserId },
	});

    const openedMajorCardId = userRecords.map((record) => record.majorCardId);

    return MajorCards.map((card) => ({
        id: card.id,
        name: card.name,
        description: card.description,
        isUnlocked: openedMajorCardId.includes(card.id)
    }))
}

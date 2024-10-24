import { MajorCards } from "../../constants/Tarot.constant";
import { prisma } from "../../database/prisma";

const { SERVER_URL } = process.env

export async function getTwitchUserTarotCardCollections(twitchUserId: string) {
	const userRecords = await prisma.twitchUserRevealTarotCard.findMany({
		where: { twitchUserId },
	});

    const openedMajorCardId = userRecords.map((record) => record.majorCardId);

    return MajorCards.map((card) => ({
        id: card.id,
        name: card.name,
        description: card.description,
        isUnlocked: openedMajorCardId.includes(card.id),
        imageUrl: `${SERVER_URL}/public/images/tarots/${card.id}.png`
    }))
}

import { MajorCards } from "../../constants/Tarot.constant";
import { prisma } from "../../database/prisma";
import { getTwitchUserById } from "../../services/Twitch.service";
import { TarotCard, TarotCardSoundProfile } from "../../types/Tarot.type";
import { RevealTarotCard } from "./RevealTarotCard";

const { SERVER_URL } = process.env

function getSoundFilename(card: RevealTarotCard) {
	return card.majorCard.soundFilePath.split("/").pop();
}

export async function getTwitchUserTarotCardDetail(
	twitchUserId: string,
	cardId: number
) {
	const userRecords = await prisma.twitchUserRevealTarotCard.findMany({
		where: {
			twitchUserId,
			OR: [{ majorCardId: cardId }, { minorCardId: cardId }],
		},
	});

	const currentMajorCard = MajorCards.find((card) => card.id === cardId);

	if (!currentMajorCard) {
		throw new Error("Card not found");
	}

	const userRecordData: RevealTarotCard[] = userRecords.map((record) =>
		JSON.parse(record.data)
	);
	const collectedSoundFilenames = userRecordData.map((record) =>
		getSoundFilename(record)
	);

	const collectedSounds = currentMajorCard.sounds.map((sound) => ({
        ...sound,
        isUnlocked: collectedSoundFilenames.includes(sound.filename),
        soundUrl: collectedSoundFilenames.includes(sound.filename) ? `${SERVER_URL}/public/sounds/tarot-voices/${sound.filename}` : null
    }));

    let voiceActor = null

    if (collectedSounds.length > 0 && collectedSounds[0].voiceActorTwitchId) {
        const voiceActorTwitchUserResponse = await getTwitchUserById(collectedSounds[0].voiceActorTwitchId);
        const voiceActorProfile = voiceActorTwitchUserResponse.data.data[0];
        voiceActor = {
            twitchLogin: voiceActorProfile.login,
            displayName: voiceActorProfile.display_name,
            profileUrl: voiceActorProfile.profile_image_url,
            youtube: collectedSounds[0].voiceActorCustomURL || null
        }
    }
    
    return {
        ...currentMajorCard,
        voiceActor,
        sounds: collectedSounds
    }

}

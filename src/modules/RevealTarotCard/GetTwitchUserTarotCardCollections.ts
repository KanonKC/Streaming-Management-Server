import { MajorCards } from "../../constants/Tarot.constant";
import { prisma } from "../../database/prisma";
import {
	getTwitchUsersById,
	getTwitchUsersChatColorById,
} from "../../services/Twitch.service";
import { TarotCard } from "../../types/Tarot.type";
import { TwitchUser, TwitchUsers } from "../../types/Twitch.type";
import { onlyUnique } from "../../utils/OnlyUnique.util";
import { RevealTarotCard } from "./RevealTarotCard";

const { SERVER_URL } = process.env;

function getSoundFilename(card: RevealTarotCard) {
	return card.majorCard.soundFilePath.split("/").pop();
}

function getCollectedSoundsAndVoiceActor(
	userRecordData: RevealTarotCard[],
	currentMajorCard: TarotCard,
	twitchVoiceActorsList: (TwitchUser & { color: string })[]
) {
	const collectedSoundFilenames = userRecordData.map((record) =>
		getSoundFilename(record)
	);

	const collectedSounds = currentMajorCard.sounds.map((sound) => ({
		...sound,
		isUnlocked: collectedSoundFilenames.includes(sound.filename),
		soundUrl: collectedSoundFilenames.includes(sound.filename)
			? `${SERVER_URL}/public/sounds/tarot-voices/${sound.filename}`
			: null,
	}));

	let voiceActor = null;

	if (collectedSounds.length > 0 && collectedSounds[0].voiceActorTwitchId) {
		const voiceActorProfile = twitchVoiceActorsList.find(
			(voiceActor) =>
				voiceActor.id === collectedSounds[0].voiceActorTwitchId
		);
		if (voiceActorProfile) {
			voiceActor = {
				twitchLogin: voiceActorProfile.login,
				displayName: voiceActorProfile.display_name,
				profileUrl: voiceActorProfile.profile_image_url,
				youtube: collectedSounds[0].voiceActorCustomURL || null,
				color: voiceActorProfile.color,
			};
		}
	}

	return {
		sounds: collectedSounds,
		voiceActor,
	};
}

export async function getTwitchUserTarotCardCollections(twitchUserId: string) {

	const userRecords = await prisma.twitchUserRevealTarotCard.findMany({
		where: { twitchUserId },
	});

	const voiceActorTwitchIds = MajorCards.map((card) =>
		card.sounds.map((sound) => sound.voiceActorTwitchId)
	)
		.flat()
		.filter(onlyUnique);

	const twitchVoiceActorsChatColorResponse =
		await getTwitchUsersChatColorById(voiceActorTwitchIds as string[]);
	const twitchVoiceActorsResponse = await getTwitchUsersById(
		voiceActorTwitchIds as string[]
	);


	const twitchVoiceActorsList = twitchVoiceActorsResponse.data.data.map(
		(user) => ({
			...user,
			color:
				twitchVoiceActorsChatColorResponse.data.data.find(
					(chatColor) => chatColor.user_id === user.id
				)?.color || "",
		})
	);

	const openedMajorCardId = userRecords.map((record) => record.majorCardId);

	return MajorCards.map((card) => ({
		id: card.id,
		name: card.name,
		description: card.description,
		isUnlocked: openedMajorCardId.includes(card.id),
		imageUrl: `${SERVER_URL}/public/images/tarots/${card.id}.png`,
		...getCollectedSoundsAndVoiceActor(
			userRecords.map((record) => JSON.parse(record.data)),
			card,
			twitchVoiceActorsList
		),
	}));
}

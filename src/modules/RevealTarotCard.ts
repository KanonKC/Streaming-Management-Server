import { TAROT_CARD_SOUND_PATH } from "../constants/LocalFilePath.constant";
import { MajorCards, MinorCards } from "../constants/Tarot.constant"
import { getTwitchUserById } from "../services/Twitch.service";
import { getMediaDuration } from "../utils/GetMediaDuration.util";

export async function revealTarotCard(majorCardId?: number, minorCardId?: number): Promise<{
    majorCard: {
        id: number;
        title: string;
        description: string;
        picturePage: number;
        pictureIndex: number;
        soundFilePath: string;
        soundDurationMilliseconds: number;
        voiceActorDisplayName: string;
        voiceActorTwitchId: string | null;
        voiceActorTwitchLogin: string | null;
    },
    minorCard: {
        id: number;
        title: string;
        description: string;
        picturePage: number;
        pictureIndex: number;
    }
}> {

    const randomMajorCard = MajorCards[
        (majorCardId || majorCardId === 0) ? majorCardId :
        Math.floor(Math.random() * MajorCards.length)
    ]

    const randomMajorCardSound = randomMajorCard.sounds[Math.floor(Math.random() * randomMajorCard.sounds.length)]
    const majorSoundFilePath = `${TAROT_CARD_SOUND_PATH}/${randomMajorCardSound.filename}`
    
    let majorCardSoundDuration = 10

    try {
        majorCardSoundDuration = await getMediaDuration(majorSoundFilePath)
    } catch(error) {}

    let voiceActorDisplayName = randomMajorCardSound.voiceActor
    let voiceActorTwitchLogin = null

    if (randomMajorCardSound.voiceActorTwitchId) {
        const voiceActorTwitchAccountResponse = await getTwitchUserById(randomMajorCardSound.voiceActorTwitchId)
        voiceActorDisplayName = voiceActorTwitchAccountResponse.data.data[0].display_name
        voiceActorTwitchLogin = voiceActorTwitchAccountResponse.data.data[0].login
    } else {
        voiceActorDisplayName = randomMajorCardSound.voiceActor
        voiceActorTwitchLogin = ""
    }

    const randomMinorCard = MinorCards[
        (minorCardId || minorCardId === 0) ? minorCardId - 22 :
        Math.floor(Math.random() * MinorCards.length)
    ]

    let majorPicturePosition = randomMajorCard.id

    if (majorPicturePosition >= 19 && majorPicturePosition <= 21) {
        majorPicturePosition += 1
    }

    const majorCard = {
        id: randomMajorCard.id,
        title: randomMajorCard.name,
        description: randomMajorCard.description,
        picturePage: Math.floor(majorPicturePosition / 8) + 1,
        pictureIndex: majorPicturePosition % 8,
        soundFilePath: majorSoundFilePath,
        soundDurationMilliseconds: Math.ceil(majorCardSoundDuration * 1000),
        voiceActorDisplayName: voiceActorDisplayName,
        voiceActorTwitchId: randomMajorCardSound.voiceActorTwitchId,
        voiceActorTwitchLogin: voiceActorTwitchLogin,
    }

    const minorCard = {
        id: randomMinorCard.id,
        title: randomMinorCard.name,
        description: randomMinorCard.description,
        picturePage: Math.floor((randomMinorCard.id - 22) / 8) + 4,
        pictureIndex: (randomMinorCard.id - 22) % 8,
    }

    return { majorCard, minorCard }
}
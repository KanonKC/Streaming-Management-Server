import { TAROT_CARD_SOUND_PATH } from "../constants/LocalFilePath.constant";
import { MajorCards, MinorCards } from "../constants/Tarot.constant"

export function revealTarotCard(majorCardId?: number, minorCardId?: number):{
    majorCard: {
        id: number;
        title: string;
        description: string;
        picturePage: number;
        pictureIndex: number;
        soundFilePath: string;
        voiceActor: string;
        voiceActorTwitchId: string | null;
    },
    minorCard: {
        id: number;
        title: string;
        description: string;
        picturePage: number;
        pictureIndex: number;
    }
} {

    const randomMajorCard = MajorCards[
        (majorCardId || majorCardId === 0) ? majorCardId :
        Math.floor(Math.random() * MajorCards.length)
    ]

    const randomMajorCardSound = randomMajorCard.sounds[Math.floor(Math.random() * randomMajorCard.sounds.length)]

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
        soundFilePath: `${TAROT_CARD_SOUND_PATH}/${randomMajorCardSound.filename}`,
        voiceActor: randomMajorCardSound.voiceActor,
        voiceActorTwitchId: randomMajorCardSound.voiceActorTwitchId,
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
import { PrimaryCards, SecondaryCards } from "../constants/Tarot.constant"

function getPictureNumberAndIndex(id: number, diffIdStart: number, diffIdEnd: number, pictureNumberOffset: number) {
    let picturePosition = id

    if (id >= diffIdStart && id <= diffIdEnd) {
        picturePosition += 1
    }

    const pictureNumber = Math.floor(picturePosition / 8) + 1 + pictureNumberOffset
    const pictureOneIndex = (picturePosition % 8) + 1

    return { pictureNumber, pictureOneIndex }
}


export function revealTarotCard() {
    const randomCard = PrimaryCards[Math.floor(Math.random() * PrimaryCards.length)]
    const randomSecondaryCard = SecondaryCards[Math.floor(Math.random() * SecondaryCards.length)]

    const { pictureNumber, pictureOneIndex } = getPictureNumberAndIndex(randomCard.id, 19, 21, 0)

    const secondaryBody = {
        secondaryId: randomSecondaryCard.id,
        secondaryName: randomSecondaryCard.name,
        secondaryDescription: randomSecondaryCard.description,
        secondaryPictureNumber: Math.floor((randomSecondaryCard.id - 22) / 8) + 4,
        secondaryPictureOneIndex: ((randomSecondaryCard.id - 22) % 8) + 1,
    }

    return { ...randomCard, pictureNumber, pictureOneIndex, ...secondaryBody }
}
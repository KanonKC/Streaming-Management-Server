import { prisma } from "../../../database/prisma";

function sum(list: number[]) {
    return list.reduce((acc, cur) => acc + cur, 0)
}

export async function createGame24() {
    await prisma.game24.updateMany({
        where: {
            isActive: true
        },
        data: {
            isActive: false,
            isSkipped: true
        }
    })

    let numberList = [0,0,0,0]

    while (sum(numberList) < 10 || sum(numberList) > 54) {
        for (let i = 0; i < 4; i++) {
            numberList[i] = Math.floor(Math.random() * 10)
        }
    }

    const game24 = await prisma.game24.create({
        data: {
            numberList: numberList.join(',')
        }
    })

    return {
        ...game24,
        numberText: numberList.join(', ')
    }
}
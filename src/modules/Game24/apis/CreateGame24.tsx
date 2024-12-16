import { prisma } from "../../../database/prisma";

function product(list: number[]) {
    return list.reduce((acc, cur) => acc * cur, 1)
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

    while (product(numberList) < 24) {
        for (let i = 0; i < 4; i++) {
            numberList[i] = Math.floor(Math.random() * 16)
        }
    }

    return prisma.game24.create({
        data: {
            numberList: numberList.join(',')
        }
    })
}
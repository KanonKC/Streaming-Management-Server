import { prisma } from "../../../database/prisma";

export async function createNewViewerCounter() {
    await prisma.startStream.updateMany({data: {isActive: false}})
    return prisma.startStream.create({})
}
import { prisma } from "../../../database/prisma";

export async function deactiveForbiddenWords(id: number) {
    return prisma.forbiddenWords.update({
        where: {
            id: id,
        },
        data: {
            isActive: false,
        }
    })
}
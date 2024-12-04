import { prisma } from "../../../database/prisma";

export async function checkForbiddenWordsFromMessage(message: string) {
    const activeForbiddenWordsList = await prisma.forbiddenWords.findMany({
        where: {
            isActive: true,
        }
    });

    for (const forbid of activeForbiddenWordsList) {
        if (message.includes(forbid.word)) {
            return {
                code: "CONTAINS_FORBIDDEN_WORDS",
                ...forbid
            };
        }
    }

    return {
        code: "NO_FORBIDDEN_WORDS",
    };
}
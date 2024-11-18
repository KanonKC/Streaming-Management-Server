import { prisma } from "../../../database/prisma";
import { resolveMathExpression } from "../utils/ResolveMathExpression";

export async function createSmallMathGame() {
    const expressionCount = Math.floor(Math.random() * 2) + 3;
    const expressionList = [];

    const operators = ["+", "-", "*"];

    for (let i = 0; i < expressionCount - 1; i++) {
        const randomOperatorIndex = Math.floor(Math.random() * operators.length);
        
        const number = Math.floor(Math.random() * 11);
        const operator = operators[randomOperatorIndex];

        expressionList.push(number);
        expressionList.push(operator);
    }

    expressionList.push(Math.floor(Math.random() * 11));

    const expression = expressionList.join(" ");
    const answer = await resolveMathExpression(expression)

    const game = await prisma.mathGame.findFirst({
        where: {
            isResolved: false,
        },
    })

    if (game) {
        await prisma.mathGame.update({
            where: {
                id: game.id,
            },
            data: {
                isResolved: true,
            },
        })
    }

    return prisma.mathGame.create({
        data: {
            expression,
            answer,
        },
    });
}
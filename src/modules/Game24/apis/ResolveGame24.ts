import { Parser } from "expr-eval";
import { prisma } from "../../../database/prisma";
import { ResolveGame24State } from "../constants/ResolveGame24State.constant";

function isValidExpression(expression: string, fixedNumberList: number[]) {
    console.log('expression', expression)
    const numberList = expression.match(/\d+/g)?.map(Number) ?? [];
    console.log('numberList', numberList)
    if (numberList.length !== 4) {
        return false;
    }

    const sortedNumberList = [...numberList].sort((a, b) => a - b);
    const sortedFixedNumberList = [...fixedNumberList].sort((a, b) => a - b);

    console.log('sortedNumberList', sortedNumberList)
    console.log('sortedFixedNumberList', sortedFixedNumberList)

    for (let i = 0; i < 4; i++) {
        if (sortedNumberList[i] !== sortedFixedNumberList[i]) {
            return false;
        }
    }

    return true;
}

export async function resolveGame24(twitchUserId: string, expression: string) {

    async function createLog(isCorrect: boolean) {
        return prisma.game24GuessLog.create({
            data: {
                game24Id: currentGame24.id,
                twitchUserId,
                expression,
                isCorrect
            }
        })
    }
    async function endGame() {
        return prisma.game24.update({
            where: {
                id: currentGame24.id
            },
            data: {
                isActive: false,
                isSolved: true
            }
        })
    }

    console.log('resolveGame24', expression)

    const currentGame24 = await prisma.game24.findFirstOrThrow({ where: { isActive: true } });
    const fixedNumberList = currentGame24.numberList.split(',').map(Number);

    if (!isValidExpression(expression, fixedNumberList)) {
        await createLog(false);
        return ResolveGame24State.invalidExpression(expression);
    } 
    
    let result;

    try {
        const parser = new Parser();
        const expr = parser.parse(expression);
        result = expr.evaluate();
    } catch (e) {
        await createLog(false);
        return ResolveGame24State.errorExpression(expression);
    }
        
    if (result === 24) {
        await endGame();
        await createLog(true);
        return ResolveGame24State.guessCorrect(expression);
    } else {
        await createLog(false);
        return ResolveGame24State.guessIncorrect(expression, result);
    }

}
import { Parser } from "expr-eval";
import { prisma } from "../../../database/prisma";

const ResolveGame24Return = {
    guessCorrect: (expression: string) => ({
        code: "GUESS_CORRECT",
        expression,
        text: `สามารถแก้ข้อนี้ได้ ✅ -> ${expression} = 24`,
    }),
    guessIncorrect: (expression: string, result: number) => ({
        code: "GUESS_INCORRECT",
        expression,
        text: `ยังไม่ได้ผลลัพธ์เป็น 24 ❌ -> ${expression} = ${result}`,
    }),
    errorExpression: (expression: string) => ({
        code: "ERROR_EXPRESSION",
        expression,
        text: `ข้อความที่ใส่มาไม่สามารถนำมาคำนวณได้ ⚠️ -> ${expression}`,
    }),
    invalidExpression: (expression: string) => ({
        code: "INVALID_EXPRESSION",
        expression,
        text: `ตัวเลขที่ใส่มา ไม่ตรงกับที่กำหนด ⚠️ -> ${expression}`,
    }),
};

function isValidExpression(expression: string, fixedNumberList: number[]) {
    const numberList = expression.split(/[\+\-\*\/\(\)]/).map(Number);

    if (numberList.length !== 4) {
        return false;
    }

    for (const number of numberList) {
        if (!fixedNumberList.includes(number)) {
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

    const currentGame24 = await prisma.game24.findFirstOrThrow({ where: { isActive: true } });

    const fixedNumberList = currentGame24.numberList.split(',').map(Number);

    if (!isValidExpression(expression, fixedNumberList)) {
        await createLog(false);
        return ResolveGame24Return.invalidExpression(expression);
    } 
    
    let result;
    try {
        const parser = new Parser();
        const expr = parser.parse(expression);
        result = expr.evaluate();
    } catch (e) {
        await createLog(false);
        return ResolveGame24Return.errorExpression(expression);
    }
        
    if (result === 24) {
        await endGame();
        await createLog(true);
        return ResolveGame24Return.guessCorrect(expression);
    } else {
        await createLog(false);
        return ResolveGame24Return.guessIncorrect(expression, result);
    }

    
}
export const ResolveGame24State = {
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
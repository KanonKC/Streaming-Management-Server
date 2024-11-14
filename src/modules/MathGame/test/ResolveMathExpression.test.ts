import { resolveMathExpression } from "../utils/ResolveMathExpression";

resolveMathExpression("8 - 6 - 10 + 1").then((problem) => {
    console.log(problem)
})
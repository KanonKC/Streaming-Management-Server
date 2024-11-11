import { exec } from "child_process";

export function resolveMathExpression(expression: string): Promise<number> {
	return new Promise((resolve, reject) => {
		exec(
			`python src/modules/MathGame/sources/calculate.py "${expression}"`,
			(error, stdout, _) => {
				if (error) {
					reject(error);
				} else {
					resolve(parseInt(stdout));
				}
			}
		);
	});
}

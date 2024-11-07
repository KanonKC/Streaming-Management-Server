import { FastifyInstance } from "fastify";
import { createSmallMathGameController, resolveSmallMathGameController } from "../controllers/MathGame.controller";

export function createMathGameRoutes(server: FastifyInstance) {
	server.get(
		"/math-game/create",
		createSmallMathGameController
	);
	server.get(
		"/math-game/resolve",
		resolveSmallMathGameController
	);
}

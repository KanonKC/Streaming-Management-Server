import { FastifyInstance } from "fastify";
import { checkForbiddenWordsFromMessageController, createForbiddenWordsController, deactiveForbiddenWordsController } from "../controllers/ForbiddenWords.controller";

export function createForbiddenWordsRoutes(server: FastifyInstance) {
	server.get(
		"/forbidden-words/check",
		checkForbiddenWordsFromMessageController
	);
	server.get(
		"/forbidden-words",
		createForbiddenWordsController
	);
	server.get(
		"/forbidden-words/deactive/:id",
		deactiveForbiddenWordsController
	);
}

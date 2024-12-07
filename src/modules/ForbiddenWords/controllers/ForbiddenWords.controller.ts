import { FastifyReply, FastifyRequest } from "fastify";
import { checkForbiddenWordsFromMessage } from "../apis/CheckForbiddenWordsFromMessage";
import { createForbiddenWords } from "../apis/CreateForbiddenWords";
import { deactiveForbiddenWords } from "../apis/DeactiveForbiddenWords";

export async function checkForbiddenWordsFromMessageController(
	request: FastifyRequest<{
		Querystring: {
			message: string;
		};
	}>,
	reply: FastifyReply
) {
	const { message } = request.query;
	const response = await checkForbiddenWordsFromMessage(message);
	return reply.status(200).send(response);
}

export async function createForbiddenWordsController(
	request: FastifyRequest<{
		Querystring: {
			twitchUserId: string;
            word: string;
		};
	}>,
	reply: FastifyReply
) {
	const { twitchUserId, word } = request.query;
	const response = await createForbiddenWords(twitchUserId, word);
	return reply.status(200).send(response);
}

export async function deactiveForbiddenWordsController(
	request: FastifyRequest<{
		Params: {
			id: string;
		};
	}>,
	reply: FastifyReply
) {
	const id = parseInt(request.params.id);
	const response = await deactiveForbiddenWords(id);
	return reply.status(200).send(response);
}

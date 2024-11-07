import { FastifyReply, FastifyRequest } from "fastify";
import { createSmallMathGame } from "../apis/CreateSmallMathGame";
import { resolveSmallMathGame } from "../apis/ResolveSmallMathGame";

export async function createSmallMathGameController(
	_: FastifyRequest,
	reply: FastifyReply
) {
	const response = await createSmallMathGame();
	return reply.send(response);
}

export async function resolveSmallMathGameController(
	request: FastifyRequest<{
		Querystring: {
			twitchUserId: string;
			twitchUsername: string;
			guess: string;
		};
	}>,
	reply: FastifyReply
) {
	const { twitchUserId, twitchUsername, guess } = request.query;

	const response = await resolveSmallMathGame({
		twitchUserId,
		twitchUsername,
		guess,
	});

	return reply.send(response);
}

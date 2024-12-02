import { FastifyReply, FastifyRequest } from "fastify";
import { getStreamerBotTwitchOAuth } from "../modules/GetStreamerbotTwitchOAuth";

export async function getStreamerBotTwitchOAuthController(
	request: FastifyRequest<{
		Querystring: {
			clientId: string;
			token: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
		const { clientId, token } = request.query;
		const response = await getStreamerBotTwitchOAuth(clientId, token);
		return reply.status(200).send(response);
	} catch (err) {
		return reply.status(400).send({ error: String(err) });
	}
}

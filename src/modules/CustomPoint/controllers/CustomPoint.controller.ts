import { FastifyReply, FastifyRequest } from "fastify";
import { getCustomPoint } from "../apis/GetCustomPoint";

export async function getCustomPointController(
	request: FastifyRequest<{
		Params: {
			twitchUserId: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
		const { twitchUserId } = request.params;
		const response = await getCustomPoint(twitchUserId);
		return reply.status(200).send(response);
	} catch (error) {
		return reply.status(400).send({ error: String(error) });
	}
}

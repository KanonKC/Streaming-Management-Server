import { FastifyReply, FastifyRequest } from "fastify";
import { getStreamerBotTwitchOAuth } from "../modules/GetStreamerBotTwitchOAuth";
import { loadRewardRedemptionFromTwitch } from "../modules/ChannelPointRedeem/apis/LoadRewardRedemptionFromTwitch";

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
        await loadRewardRedemptionFromTwitch()
        console.log("Recieved TOKEN",clientId, token)
		return reply.status(200).send(response);
	} catch (err) {
		return reply.status(400).send({ error: String(err) });
	}
}

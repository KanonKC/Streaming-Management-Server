import { FastifyReply, FastifyRequest } from "fastify";
import { getRedeemableChannelPointAmount } from "../apis/GetRedeemableChannelPointAmount";
import { redeemChannelPointFromCustomPoint } from "../apis/RedeemChannelPointFromCustomPoint";
import { getRedeemableChannelPointAmountList } from "../apis/GetRedeemableChannelPointAmountList";

export async function getRedeemableChannelPointAmountController(
	request: FastifyRequest<{
		Querystring: {
			twitchUserId: string;
		};
	}>,
	reply: FastifyReply
) {
	const { twitchUserId } = request.query;
	const response = await getRedeemableChannelPointAmount(twitchUserId);
	return reply.status(200).send(response);
}

export async function getRedeemableChannelPointAmountListController(
	request: FastifyRequest<{
		Querystring: {
			twitchUserId: string;
			customAmountList: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
		const { twitchUserId, customAmountList } = request.query;
		const parsedCustomAmountList = customAmountList
			.split(",")
			.map((n) => parseInt(n));
		const response = await getRedeemableChannelPointAmountList(
			twitchUserId,
			parsedCustomAmountList
		);
		return reply.status(200).send(response);
	} catch (error) {
		return reply.status(400).send({ error: String(error) });
	}
}

export async function redeemChannelPointFromCustomPointController(
	request: FastifyRequest<{
		Querystring: {
			twitchUserId: string;
			amount: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
		const { twitchUserId, amount } = request.query;
		const response = await redeemChannelPointFromCustomPoint(
			twitchUserId,
			parseInt(amount)
		);
		return reply.status(200).send(response);
	} catch (error) {
		return reply.status(400).send({ error: String(error) });
	}
}

import { FastifyReply, FastifyRequest } from "fastify";
import { getChannelInfo } from "../services/Twitch.service";
import { changeStreamTitle } from "../modules/ChangeStreamTitle";
import { configDotenv } from "dotenv";
import { revealTarotCard } from "../modules/RevealTarotCard/RevealTarotCard";
import { recordTwitchUserRevealTarotCard } from "../modules/RevealTarotCard/RecordTwitchUserRevealTarotCard";
import { getTwitchUserTarotCardDetail } from "../modules/RevealTarotCard/GetTwitchUserTarotCardDetail";
import { getTwitchUserTarotCardCollections } from "../modules/RevealTarotCard/GetTwitchUserTarotCardCollections";

export async function revealTarotCardController(
	request: FastifyRequest<{
		Querystring: {
			twitchUserId: string;
		};
	}>,
	reply: FastifyReply
) {
	const response = await revealTarotCard();
	await recordTwitchUserRevealTarotCard({
		twitchUserId: request.query.twitchUserId,
		majorCardId: response.majorCard.id,
		minorCardId: response.minorCard.id,
		data: response,
	});
	return reply.status(200).send(response);
}

export async function getTwitchUserTarotCardCollectionsController(
	request: FastifyRequest<{
		Params: {
			twitchUserId: string;
		};
	}>,
	reply: FastifyReply
) {
	const { twitchUserId } = request.params;
	const response = await getTwitchUserTarotCardCollections(twitchUserId);
	return reply.status(200).send({ data: response });
}

export async function getTwitchUserTarotCardDetailController(
	request: FastifyRequest<{
		Params: {
			twitchUserId: string;
			cardNumber: string;
		};
	}>,
	reply: FastifyReply
) {
	const { twitchUserId, cardNumber } = request.params;
	const response = await getTwitchUserTarotCardDetail(
		twitchUserId,
		parseInt(cardNumber)
	);
	return reply.status(200).send(response);
}

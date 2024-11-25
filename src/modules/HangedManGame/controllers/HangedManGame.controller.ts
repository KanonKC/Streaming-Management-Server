import { FastifyReply, FastifyRequest } from "fastify";
import { createHangedManGame } from "../apis/CreateHangedManGame";
import { guessLetterHangedManGame } from "../apis/GuessLetterHangedManGame";
import { guessWordHangedManGame } from "../apis/GuessWordHangedManGame";
import { getHangedManGameLeaderboards } from "../apis/GetHangedManGameLeaderboard";

export async function createHangedManGameController(
	_: FastifyRequest,
	reply: FastifyReply
) {
	const response = await createHangedManGame(8);
	return reply.status(200).send(response);
}

export async function guessLetterHangedManGameController(
	request: FastifyRequest<{
		Querystring: {
			letter: string;
			twitchUserId: string;
			twitchUsername: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
        const { letter, twitchUserId, twitchUsername } = request.query;
        const response = await guessLetterHangedManGame(
            letter,
            twitchUserId,
            twitchUsername
        );
        return reply.status(200).send(response);
    } catch (error) {
        console.log(error)
    }
}

export async function guessWordHangedManGameController(
	request: FastifyRequest<{
		Querystring: {
			word: string;
			twitchUserId: string;
			twitchUsername: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
        const { word, twitchUserId, twitchUsername } = request.query;
        const response = await guessWordHangedManGame(
            word,
            twitchUserId,
            twitchUsername
        );
        return reply.status(200).send(response);
    } catch (error) {
        console.log(error)
    }
}

export async function getHangedManGameLeaderboardsController(
	request: FastifyRequest<{
		Querystring: {
			twitchUserId: string;
		};
	}>,
	reply: FastifyReply
) {
	try {
        const { twitchUserId } = request.query;
        const response = await getHangedManGameLeaderboards(
            twitchUserId, {
                top: 5,
            }
        );
        return reply.status(200).send(response);
    } catch (error) {
        console.log(error)
    }
}

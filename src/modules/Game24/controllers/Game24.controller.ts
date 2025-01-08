import { FastifyReply, FastifyRequest } from "fastify";
import { createGame24 } from "../apis/CreateGame24";
import { resolveGame24 } from "../apis/ResolveGame24";


export async function createGame24Controller(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
        const response = await createGame24();
        console.log(response)
        return reply.status(200).send(response);
    } catch (error) {
        console.log(error)
    }
}

export async function resolveGame24Controller(
	request: FastifyRequest<{
        Params: {
            twitchUserId: string;
        }
		Header: {
			expression: string
		};
	}>,
	reply: FastifyReply
) {
	try {
        console.log(request.headers)
        const { twitchUserId } = request.params;
        const { expression } = request.headers;
        const response = await resolveGame24(
            twitchUserId,
            String(expression)
        );
        return reply.status(200).send(response);
    } catch (error) {
        console.log(error)
    }
}
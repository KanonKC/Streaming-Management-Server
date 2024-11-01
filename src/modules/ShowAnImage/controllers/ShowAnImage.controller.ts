import { FastifyReply, FastifyRequest } from "fastify";
import { clearBackslash } from "../../../utils/ClearBackslash.util";
import { showAnImage, ShowImageOptions } from "../apis/ShowAnImage";

type ShowImage = FastifyRequest<{
	Querystring: { url: string };
	Headers: {
		imageurl: string;
		twitchid: string;
		username: string;
	};
}>;

type AdvancedShowImage = FastifyRequest<{
	Body: { url: string; options: ShowImageOptions };
}>;

export async function showAnImageController(
	request: ShowImage,
	reply: FastifyReply
) {
	const { imageurl, twitchid, username } = request.headers;
	const formatUrl = clearBackslash(String(imageurl));
	const image = await showAnImage(formatUrl, twitchid, username);
    console.log(image)
	return reply.send(image);
}

export async function advancedShowAnImageController(
	request: AdvancedShowImage,
	reply: FastifyReply
) {
	const { body } = request;
	const image = await showAnImage(
		body.url,
		undefined,
		undefined,
		body.options
	);
	return reply.send(image);
}

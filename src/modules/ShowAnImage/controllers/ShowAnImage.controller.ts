import { FastifyReply, FastifyRequest } from "fastify";
import { clearBackslash } from "../../../utils/ClearBackslash.util";
import { showImage, ShowImageOptions } from "../../ShowImage";

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
	const image = await showImage(formatUrl, twitchid, username);
	return reply.send(image);
}

export async function advancedShowAnImageController(
	request: AdvancedShowImage,
	reply: FastifyReply
) {
	const { body } = request;
	const image = await showImage(body.url, undefined, undefined, body.options);
	return reply.send(image);
}

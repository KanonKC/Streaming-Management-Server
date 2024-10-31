import axios from "axios";
import { configDotenv } from "dotenv";
import sharp from "sharp";
import { detectImageMatureContent } from "../../../services/Sightengine.service";
import { prisma } from "../../../database/prisma";

configDotenv();
const { STREAMING_MANAGEMENT_SERVER_ABSOLUTE_PATH } = process.env;
const IMAGE_PATH = "dumps/show-images";

export interface ShowImageOptions {
	outputVideoFilePath?: string;
}

export async function showAnImage(
	url: string,
	twitchId?: string,
	username?: string,
	options?: ShowImageOptions
): Promise<{
	code: "INVALID_URL" | "NOT_IMAGE" | "CONTAIN_MATURE" | "ERROR" | "SUCCESS";
	filename: string | null;
	imagePath: string | null;
	matureContentText?: string;
}> {
	const timestamp = new Date().getTime();
	const filename = `${timestamp}_${twitchId}.png`;

	try {
		new URL(url);
	} catch (error) {
		return { code: "INVALID_URL", imagePath: null, filename: null };
	}

	const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
	const contentType: string = imageResponse.headers["content-type"];

	if (!contentType.includes("image")) {
		return { code: "NOT_IMAGE", imagePath: null, filename: null };
	}

	const matureContentResponse = await detectImageMatureContent(url);
	const { nudity, gore } = matureContentResponse.data;

	const matureContentTags = [];
	if (nudity.none < 0.6) matureContentTags.push("Nudity");
	if (gore.prob > 0.5) matureContentTags.push("Gore");

	if (matureContentTags.length > 0) {
		return {
			code: "CONTAIN_MATURE",
			filename: null,
			imagePath: null,
			matureContentText: matureContentTags.join(", "),
		};
	}

	const image = sharp(imageResponse.data);
	const { width, height } = await image.metadata();

	if (!width || !height)
		return { code: "ERROR", imagePath: null, filename: null };

	if (width > height) {
		image.resize({ width: 500 });
	} else {
		image.resize({ height: 500 });
	}

	if (twitchId && username) {
		await prisma.showImage.create({
			data: {
				twitchId,
				username,
				imageUrl: url,
				imageFilename: filename,
			},
		});
	}

	const fullImagePath = options?.outputVideoFilePath
		? `${options.outputVideoFilePath}/${filename}`
		: `${STREAMING_MANAGEMENT_SERVER_ABSOLUTE_PATH}/${IMAGE_PATH}/${filename}`;

	const imageBuffer = await image.toBuffer();
	await sharp(imageBuffer).toFile(fullImagePath);

	return {
		code: "SUCCESS",
		filename: filename,
		imagePath: fullImagePath,
	};
}

import { exec } from "child_process";
import { SHOUTOUT_CLIP_FULL_PATH } from "../../../constants/LocalFilePath.constant";
import { generateRandomString } from "../../../utils/RandomString.util";

const FULL_PATH = SHOUTOUT_CLIP_FULL_PATH;

export interface DownloadTwitchClipOptions {
	outputVideoFilePath?: string;
	resolution?: {
		width: number;
		height: number;
	};
}

export async function videoResize(
	filename: string,
	width: number,
	height: number,
	options?: DownloadTwitchClipOptions
): Promise<{
	filename: string;
}> {
	let filePath = `${FULL_PATH}/${filename}`;

	if (options && options.outputVideoFilePath) {
		filePath = options.outputVideoFilePath;
	}

	const generateString = generateRandomString(8);
	const videoId = `${filename.split(".")[0]}_resize_${generateString}`;
	const outputFilename = `${videoId}.mp4`;

	return new Promise((resolve, reject) => {
		exec(
			`ffmpeg -i ${FULL_PATH}/${filename} -s ${width}x${height} -c:a copy ${filePath}`,
			async (error) => {
				if (error) {
					reject(error);
				} else {
					resolve({
						filename: outputFilename,
					});
				}
			}
		);
	});
}

export async function getVideoResolution(
	filename: string,
	options?: DownloadTwitchClipOptions
): Promise<{
	width: number;
	height: number;
}> {
	let filePath = `${FULL_PATH}/${filename}`;

	if (options && options.outputVideoFilePath) {
		filePath = options.outputVideoFilePath;
	}

	return new Promise((resolve, reject) => {
		exec(
			`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${filePath}`,
			async (error, stdout, stderr) => {
				if (error) {
					reject(error);
				} else {
					const [width, height] = stdout
						.split("x")
						.map((value) => parseInt(value));
					resolve({ width, height });
				}
			}
		);
	});
}

export async function getVideoDuration(
	filename: string,
	options?: DownloadTwitchClipOptions
): Promise<number> {
	let filePath = `${FULL_PATH}/${filename}`;

	if (options && options.outputVideoFilePath) {
		filePath = options.outputVideoFilePath;
	}

	return new Promise((resolve, reject) => {
		exec(
			`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${filePath}`,
			async (error, stdout, stderr) => {
				if (error) {
					reject(error);
				} else {
					const duration = parseFloat(stdout);
					resolve(duration);
				}
			}
		);
	});
}

export async function downloadTwitchClip(
	url: string,
	options?: DownloadTwitchClipOptions
): Promise<{
	filename: string;
	duration: number;
	outputVideoFilePath: string;
}> {
	const videoId = `twitch_${generateRandomString(16)}`;
	let filename = `${videoId}.mp4`;

	let outputVideoFilePath = `${FULL_PATH}/${filename}`;

	if (options && options.outputVideoFilePath) {
		console.log("outputVideoFilePath", options.outputVideoFilePath);
		outputVideoFilePath = `${options.outputVideoFilePath}/${filename}`;
	}

	const command = `twitch-dl download ${url} -q source --overwrite -o ${outputVideoFilePath}`;

	return new Promise((resolve, reject) => {
		exec(command, async (error) => {
			if (error) {
				throw new Error(error.message);
			} else {
				const duration = await getVideoDuration(filename, {
					outputVideoFilePath: outputVideoFilePath,
				});
				const resolution = await getVideoResolution(filename, {
					outputVideoFilePath: outputVideoFilePath,
				});


                if (options && options.resolution) {

                    if (resolution.width !== options.resolution.width || resolution.height !== options.resolution.height) {
                        const resizedFilename = await videoResize(
                            filename,
                            options.resolution.width,
                            options.resolution.height
                        );
                        filename = resizedFilename.filename;
                    }

                }

				resolve({ filename, duration, outputVideoFilePath });
			}
		});
	});
}

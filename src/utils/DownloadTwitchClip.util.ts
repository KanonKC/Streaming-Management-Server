import { exec } from "child_process";
import { SHOUTOUT_CLIP_FULL_PATH } from "../constants/LocalFilePath.constant";
import { generateRandomString } from "./RandomString.util";


const FULL_PATH = SHOUTOUT_CLIP_FULL_PATH

export async function videoResize(filename:string, width: number, height: number): Promise<{
    filename: string,
}> {
    
    const generateString = generateRandomString(8)
    const videoId = `${filename.split(".")[0]}_resize_${generateString}`
    const outputFilename = `${videoId}.mp4`;
    
    return new Promise((resolve, reject) => {
		exec(
			`ffmpeg -i ${process.env.VIDEO_STORAGE_PATH}/${filename} -s ${width}x${height} -c:a copy ${FULL_PATH}/${outputFilename}`,
			async (error) => {
				if (error) {
					reject(error)
				}
				else {
					resolve({
                        filename: outputFilename,
                    })
				}
			}
		);
	});
}

export async function getVideoResolution(filename:string): Promise<{
    width: number,
    height: number,
}> {
    
    return new Promise((resolve, reject) => {
		exec(
			`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${FULL_PATH}/${filename}`,
			async (error, stdout, stderr) => {
				if (error) {
					reject(error)
				}
				else {
                    const [width, height] = stdout.split('x').map((value) => parseInt(value))
                    resolve({ width, height })
				}
			}
		);
	});
}

export async function getVideoDuration(filename:string): Promise<number> {
    
    return new Promise((resolve, reject) => {
		exec(
			`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${FULL_PATH}/${filename}`,
			async (error, stdout, stderr) => {
				if (error) {
					reject(error)
				}
				else {
                    const duration = parseFloat(stdout)
					resolve(duration)
				}
			}
		);
	});
}

export async function downloadTwitchClip(url: string): Promise<{ filename: string, duration: number }> {
    const videoId = `twitch_${generateRandomString(16)}`;
    let filename = `${videoId}.mp4`;
    const command = `twitch-dl download ${url} -q source --overwrite -o ${FULL_PATH}/${filename}`

    return new Promise((resolve, reject) => {
        exec(
			command,
			async (error) => {
				if (error) {
                    throw new Error(error.message)
				}
				else {
                    
                    const duration = await getVideoDuration(filename)
                    const resolution = await getVideoResolution(filename)
    

                    if (resolution.width !== 1920 || resolution.height !== 1080) {
                        const resizedFilename = await videoResize(filename, 1920, 1080)
                        filename = resizedFilename.filename
                    }

					resolve({ filename, duration });
				}

			}
		);
	});
}
import { exec } from "child_process";

export async function getMediaDuration(filename:string):Promise<number> {
    
    return new Promise((resolve, reject) => {
		exec(
			`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${filename}`,
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
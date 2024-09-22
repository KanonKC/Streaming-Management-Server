import axios from "axios";
import sharp from "sharp";
import fs from "fs";
import { prisma } from "../database/prisma";
import { configDotenv } from "dotenv";

configDotenv();
const { STREAM_MANAGEMENT_SERVER_FULL_PATH } = process.env;
const IMAGE_PATH = 'dumps/show-images'

export async function showImage(url: string, twitchId: string, username: string) {
    const timestamp = new Date().getTime();
    const filename = `${timestamp}_${twitchId}.png`;

    try {
        new URL(url);
    }
    catch (error) {
        return { imagePath: null };
    }
    
    const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
    
    const contentType:string = imageResponse.headers['content-type'];

    if (!contentType.includes('image')) {
        return { imagePath: null };
    } 

    const image = sharp(imageResponse.data)
    const { width, height } = await image.metadata();

    if (!width || !height) return { imagePath: null };

    if (width > height) {
        image.resize({ width: 500 });
    }
    else {
        image.resize({ height: 500 });
    }

    await prisma.showImage.create({
        data: {
            twitchId,
            username,
            imageUrl: url,
            imageFilename: filename
        }
    })

    const fullImagePath = `${STREAM_MANAGEMENT_SERVER_FULL_PATH}/${IMAGE_PATH}/${filename}`;

    const imageBuffer = await image.toBuffer();
    await sharp(imageBuffer).toFile(fullImagePath);

    return { imagePath: fullImagePath };
}
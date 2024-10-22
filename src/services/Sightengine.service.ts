import axios from "axios";
import { ImageMatureContentDetection } from "../types/Sightengine.type";

export async function detectImageMatureContent(imageUrl: string) {
    return axios.get<ImageMatureContentDetection>('https://api.sightengine.com/1.0/check.json', {
        params: {
            url: imageUrl,
            models: 'nudity-2.1,gore-2.0',
            api_user: '1965163788',
            api_secret: 'BaH6F2V38pebTSE8T9tdE7Z9Rheb225Y',
        }
    });
}
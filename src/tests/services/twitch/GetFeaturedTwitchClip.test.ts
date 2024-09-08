import { configDotenv } from "dotenv";
import { getTwitchClips } from "../../../services/Twitch.service";

configDotenv();

const { TWITCH_BROADCASTER_ID } = process.env;

getTwitchClips(TWITCH_BROADCASTER_ID as string, false).then((response) => {
    console.log('response', response.data)
})
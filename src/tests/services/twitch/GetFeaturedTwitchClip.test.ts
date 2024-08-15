import { configDotenv } from "dotenv";
import { getTwitchClips } from "../../../services/Twitch.service";

configDotenv();

const { TWITCH_BROADCASTER_ID } = process.env;

getTwitchClips(TWITCH_BROADCASTER_ID as string).then((clips) => {
    clips.data.map((clip) => console.log(clip.title, clip.url))
})
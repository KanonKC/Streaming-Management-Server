import { configDotenv } from "dotenv";
import { showFeaturedTwitchClip } from "../modules/ShowFeaturedTwitchClip";

configDotenv();

const { TWITCH_BROADCASTER_ID } = process.env;

showFeaturedTwitchClip(TWITCH_BROADCASTER_ID as string).then((response) => {
    console.log(response);
    // Open video player
    
})
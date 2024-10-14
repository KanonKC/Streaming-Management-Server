import { configDotenv } from "dotenv"

configDotenv();

export const LocalAccountUsername = "local-account"
export const LocalAccountTwitchID = process.env.TWITCH_BROADCASTER_ID
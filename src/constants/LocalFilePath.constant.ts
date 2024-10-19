import { configDotenv } from "dotenv";

configDotenv();
const { STREAM_MANAGEMENT_SERVER_FULL_PATH, SERVER_URL } = process.env;

export const PUBLIC_URL = `${SERVER_URL}/public`;

export const IMAGE_PATH = 'dumps/show-images'
export const IMAGE_FULL_PATH = `${STREAM_MANAGEMENT_SERVER_FULL_PATH}/${IMAGE_PATH}`;

export const SHOUTOUT_CLIP_PATH = 'dumps/shoutout-clips'
export const SHOUTOUT_CLIP_FULL_PATH = `${STREAM_MANAGEMENT_SERVER_FULL_PATH}/${SHOUTOUT_CLIP_PATH}`;

export const TAROT_CARD_SOUND_PATH = 'assets/sounds/tarot-voices/normalized'
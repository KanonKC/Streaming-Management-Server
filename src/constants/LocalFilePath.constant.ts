import { configDotenv } from "dotenv";

configDotenv();
const { STREAM_MANAGEMENT_SERVER_FULL_PATH } = process.env;

export const IMAGE_PATH = 'dumps/show-images'
export const IMAGE_FULL_PATH = `${STREAM_MANAGEMENT_SERVER_FULL_PATH}/${IMAGE_PATH}`;

export const SHOUTOUT_CLIP_PATH = 'dumps/shoutout-clips'
export const SHOUTOUT_CLIP_FULL_PATH = `${STREAM_MANAGEMENT_SERVER_FULL_PATH}/${SHOUTOUT_CLIP_PATH}`;
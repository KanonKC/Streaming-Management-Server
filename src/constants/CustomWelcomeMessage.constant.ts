import { readFileSync } from "fs";

export const CustomWelcomeMessages: {
	twitchUserId: string;
	soundFilePath: string;
	message: string | null;
}[] = JSON.parse(
	readFileSync("src/constants/CustomWelcomeMessage.constant.json", "utf-8")
);

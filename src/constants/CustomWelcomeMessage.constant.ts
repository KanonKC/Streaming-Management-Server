import { readFileSync } from "fs";

export const CustomWelcomeMessages: {
	twitchUserId: string;
	soundFilePath: string | null;
	message: string | null;
}[] = JSON.parse(
	readFileSync("assets/data/custom-welcome-message.json", "utf-8")
);

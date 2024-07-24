import { readFileSync } from "fs";

// TODO: Change this to regex
const ALLOWED_CHARS = "!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ๅ/-ภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ+๑๒๓๔ู฿๕๖๗๘๙,ฐญฯณ๊ํธฑฎ\"๐ฤ()ฆฏฉโฮฌฺ็์๋?ษฒศฬซฦ. ";
const badWords:string[] = JSON.parse(readFileSync("./assets/data/bad_word_list.json", "utf-8")).words;

export function changeStreamTitle(currentTitle: string, newTitle: string) {
    let legitNewTitle = newTitle;

    // If the new title contains a |, split it and only use the first part
    if (newTitle.includes("|")) {
        legitNewTitle = newTitle.split("|")[0];
    }

    // Remove all characters that are not in the allowed characters list
    for (const char of legitNewTitle) {
        while (!ALLOWED_CHARS.includes(char)) {
            legitNewTitle = legitNewTitle.replace(char, "");
            if (!ALLOWED_CHARS.includes(char)) {
                break;
            }
        }
    }
    
    // Replace all bad words with 👍
    for (const badword of badWords) {
        while (legitNewTitle.includes(badword)) {
            legitNewTitle = legitNewTitle.replace(badword, "👍");
        }
    }

    // If the new title is longer than 140 characters, cut it off
    if (currentTitle.includes("|")) {
        const newTitleSuffix = currentTitle.split("|").slice(1).join("|");
        if (legitNewTitle.length + newTitleSuffix.length + 1 > 140) {
            legitNewTitle = legitNewTitle.slice(0, 140 - newTitleSuffix.length - 1);
        }
        legitNewTitle = `${legitNewTitle} |${newTitleSuffix}`;
    }

    return legitNewTitle.slice(0, 140);
}
import { readFileSync } from "fs";

const parsedData: { common: string[], mit: string[] } = JSON.parse(readFileSync("assets/data/common-english-word-list.json", "utf-8"));
export const CommonEnglishWordList = parsedData.mit;
import { readFileSync } from "fs";

const parsedData: { data: string[] } = JSON.parse(readFileSync("assets/data/common-english-word-list.json", "utf-8"));
export const CommonEnglishWordList = parsedData.data;
import { isMeaningfulThaiLanguage, isMischangingThaiLanguage } from "../services/Gemini.service";

function switchKeyboardFromEnglishToThai(text: string) {
    const thaiKeyboard: Record<string,string> = {
        // Lowercase Letter
        "1": "ๅ", "2": "/", "3": "-", "4": "ภ", "5": "ถ", "6": "ุ", "7": "ึ", "8": "ค", "9": "ต", "0": "จ", "-": "ข", "=": "ช",
        "q": "ๆ", "w": "ไ", "e": "ำ", "r": "พ", "t": "ะ", "y": "ั", "u": "ี", "i": "ร", "o": "น", "p": "ย", "[": "บ", "]": "ล", "\\": "ฃ",
        "a": "ฟ", "s": "ห", "d": "ก", "f": "ด", "g": "เ", "h": "้", "j": "่", "k": "า", "l": "ส", ";": "ว", "'": "ง",
        "z": "ผ", "x": "ป", "c": "แ", "v": "อ", "b": "ิ", "n": "ื", "m": "ท", ",": "ม", ".": "ใ", "/": "ฝ",

        // Uppercase Letter
        "!": "+", "@": '"', "#": "ฅ", "$": "ฐ", "%": "ฎ", "^": "ฑ", "&": "ธ", "*": "ํ", "(": "๊", ")": "ณ", "_": "ฯ", "+": "ญ",
        "Q": "๐", "W": "ฎ", "E": "ฑ", "R": "ธ", "T": "ํ", "Y": "๊", "U": "ณ", "I": "ฯ", "O": "ญ", "P": "ฐ", "{": ",", "}": "%", "|": "_",
        "A": "ฤ", "S": "ฆ", "D": "ฏ", "F": "โ", "G": "ฌ", "H": "็", "J": "๋", "K": "ษ", "L": "ศ", ":": "ซ", "\"": ".",
        "Z": "(", "X": ")", "C": "ฉ", "V": "ฮ", "B": "ฺ", "N": "์", "M": "?", "<": "ฒ", ">": "ฬ", "?": "ฦ",
    }

    let thaiText = "";
    for (let i = 0; i < text.length; i++) {
        if (thaiKeyboard[text[i]]) {
            thaiText += thaiKeyboard[text[i]];
        } else {
            thaiText += text[i];
        }
    }

    return thaiText;
}

export async function changeMischangingLanguageThaiToEnglish(text: string) {
    const thaiKeyText = switchKeyboardFromEnglishToThai(text);
    const meaningfulThaiLanguage = await isMeaningfulThaiLanguage(thaiKeyText);
    if (meaningfulThaiLanguage) {
        return thaiKeyText;
    }
    return;
}
import { Translate, TranslateConfig } from "@google-cloud/translate/build/src/v2";
import { configDotenv } from "dotenv";

configDotenv();

const translate = new Translate({
    key: process.env.GOOGLE_API_KEY
});

async function translateEnglishToThai(text: string) {
    let [ translations ] = await translate.translate(text, "th");
    const translationsArr = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translationsArr.forEach((translation, i) => {
      console.log(`${text[i]} => ${translation}`);
    });
  
}

// translateEnglishToThai("Hello, World!");

// ต้องจ่ายเงินอ่ะ https://console.cloud.google.com/marketplace/product/google/translate.googleapis.com
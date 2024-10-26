import { getTwitchUserTarotCardCollections } from "../../modules/RevealTarotCard/GetTwitchUserTarotCardCollections";
import { getTwitchUserTarotCardDetail } from "../../modules/RevealTarotCard/GetTwitchUserTarotCardDetail";

// getTwitchUserTarotCardDetail("135783794", 9).then((result) => {
//     console.log(result);
// })

getTwitchUserTarotCardCollections("135783794").then((result) => {
    console.log(result);
})
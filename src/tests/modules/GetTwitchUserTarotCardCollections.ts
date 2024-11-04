import { getTwitchUserTarotCardCollections } from "../../modules/TarotCard/apis/GetTwitchUserTarotCardCollections";
import { getTwitchUserTarotCardDetail } from "../../modules/TarotCard/apis/GetTwitchUserTarotCardDetail";

// getTwitchUserTarotCardDetail("135783794", 9).then((result) => {
//     console.log(result);
// })

getTwitchUserTarotCardCollections("135783794").then((result) => {
    console.log(result);
})
import { loadRewardRedemptionFromTwitch } from "../modules/ChannelPointRedeem/apis/LoadRewardRedemptionFromTwitch";
import { refundChannelPointToViewer } from "../modules/ChannelPointRedeem/apis/RefundChannelPointToViewer";
import { getTwitchCustomRewardRedemption } from "../services/Twitch.service";
// (async ()=> {
//     const data = await getTwitchCustomRewardRedemption(
//         "135783794",
//         "4cc751fa-ddb0-43c5-a039-78c1a6275ed3",
//         "UNFULFILLED",
//         "dnafsrivhw88gj7eltolrsq6794teq",
//         "9fs8ibhwf3gaetuzrgjkaya54v7mls",
//     )
//     console.log(data.data)
// })()

// loadRewardRedemptionFromTwitch().then((res) => {
//     console.log(res)
// })

refundChannelPointToViewer("135783794", 5000);

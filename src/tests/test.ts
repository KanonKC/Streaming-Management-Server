import { getRedeemableChannelPointAmount } from "../modules/ChannelPointRedeem/apis/GetRedeemableChannelPointAmount";
import { getRedeemableChannelPointAmountList } from "../modules/ChannelPointRedeem/apis/GetRedeemableChannelPointAmountList";
import { loadRewardRedemptionFromTwitch } from "../modules/ChannelPointRedeem/apis/LoadRewardRedemptionFromTwitch";
import { redeemChannelPointFromCustomPoint } from "../modules/ChannelPointRedeem/apis/RedeemChannelPointFromCustomPoint";
import { addCustomPoint } from "../modules/CustomPoint/apis/AddCustomPoint";
// (async ()=> {
//     const data = await getTwitchCustomRewardRedemption(
//         "135783794",
//         "4cc751fa-ddb0-43c5-a039-78c1a6275ed3",
//         "UNFULFILLED",
//         "dnafsrivhw88gj7eltolrsq6794teq",
//         "zaqvfcse5t5w20tatai97i9kj9nqxc",
//     )
//     console.log(data.data)
// })()

// loadRewardRedemptionFromTwitch().then((res) => {
//     console.log(res)
// })

// addCustomPoint("135783794", 1234).then((res) => {
//     console.log(res)
// })
// redeemChannelPointFromCustomPoint("175591332", 1000).then(res => {
//     console.log(res)
// })

// getRedeemableChannelPointAmount("175591332").then((res) => {
//     console.log(res)
// })

getRedeemableChannelPointAmountList("175591332", [
    1 * 0.1,
    1 * 0.25,
    1 * 0.5,
    1 * 0.75,
    1 * 1
]).then((res) => {
    console.log(res)
})
import { getRedeemableChannelPointAmount } from "../modules/ChannelPointRedeem/apis/GetRedeemableChannelPointAmount";
import { loadRewardRedemptionFromTwitch } from "../modules/ChannelPointRedeem/apis/LoadRewardRedemptionFromTwitch";
import { redeemChannelPointFromCustomPoint } from "../modules/ChannelPointRedeem/apis/RedeemChannelPointFromCustomPoint";
import { addCustomPoint } from "../modules/CustomPoint/apis/AddCustomPoint";
// (async ()=> {
//     const data = await getTwitchCustomRewardRedemption(
//         "135783794",
//         "4cc751fa-ddb0-43c5-a039-78c1a6275ed3",
//         "UNFULFILLED",
//         "dnafsrivhw88gj7eltolrsq6794teq",
//         "20slcp652ai7x11axnvvxkyuud4pw9",
//     )
//     console.log(data.data)
// })()

// loadRewardRedemptionFromTwitch().then((res) => {
//     console.log(res)
// })

// addCustomPoint("175591332", 2000).then((res) => {
//     console.log(res)
// })
redeemChannelPointFromCustomPoint("175591332", 1000).then(res => {
    console.log(res)
})

// getRedeemableChannelPointAmount("175591332").then((res) => {
//     console.log(res)
// })
import { prisma } from "../../../database/prisma";
import { getTwitchCustomReward, getTwitchCustomRewardRedemption } from "../../../services/Twitch.service";

export async function loadRewardRedemptionFromTwitch() {

    console.log("Loading RewardRedemptionFromTwitch ...")

    const customRewardResponse = await getTwitchCustomReward("135783794")
    const customRewardList = customRewardResponse.data.data
    let response;

    await prisma.twitchRewardRedemption.deleteMany()

    for (const customReward of customRewardList) {
        console.log(`Fetching ${customReward.title} ...`)
        while (true) {
            
            try {
                response = await getTwitchCustomRewardRedemption(
                    "135783794",
                    customReward.id,
                    "UNFULFILLED",
                    "dnafsrivhw88gj7eltolrsq6794teq",
                    "20slcp652ai7x11axnvvxkyuud4pw9",
                    {
                        first: 50,
                        after: response?.data.pagination.cursor
                    }
                )
            } catch (error) {
                break
            }
    
            await prisma.twitchRewardRedemption.createMany({
                data: response.data.data.map((redemption) => ({
                    rewardId: redemption.reward.id,
                    redemptionId: redemption.id,
                    twitchUserId: redemption.user_id,
                    status: "UNFULFILLED",
                    cost: redemption.reward.cost,
                }))
            })
    
            if (!response.data.pagination.cursor) {
                break
            }
    
        }
    }

    console.log("Load RewardRedemptionFromTwitch completed.")
}
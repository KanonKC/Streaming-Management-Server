/*
  Warnings:

  - A unique constraint covering the columns `[rewardId,redemptionId]` on the table `TwitchRewardRedemption` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TwitchRewardRedemption_rewardId_redemptionId_key" ON "TwitchRewardRedemption"("rewardId", "redemptionId");

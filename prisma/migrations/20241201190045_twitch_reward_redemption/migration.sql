/*
  Warnings:

  - You are about to drop the `RewardRedemption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RewardRedemption";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TwitchRewardRedemption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rewardId" TEXT NOT NULL,
    "redemptionId" TEXT NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

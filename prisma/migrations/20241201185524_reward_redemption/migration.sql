-- CreateTable
CREATE TABLE "RewardRedemption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rewardId" TEXT NOT NULL,
    "redemptionId" TEXT NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

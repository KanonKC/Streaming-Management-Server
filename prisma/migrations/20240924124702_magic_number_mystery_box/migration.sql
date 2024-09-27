-- CreateTable
CREATE TABLE "MagicNumberMysteryBox" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "minNumber" INTEGER NOT NULL,
    "maxNumber" INTEGER NOT NULL,
    "correntNumber" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "twitchRewardId" TEXT NOT NULL,
    "winnerUserId" TEXT NOT NULL,
    "winnerUsername" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "MagicNumberMysteryBox_twitchRewardId_key" ON "MagicNumberMysteryBox"("twitchRewardId");

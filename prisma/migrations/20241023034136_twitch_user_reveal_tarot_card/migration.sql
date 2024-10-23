-- CreateTable
CREATE TABLE "TwitchUserRevealTarotCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "majorCardId" INTEGER NOT NULL,
    "minorCardId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

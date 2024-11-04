-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TwitchUserRevealTarotCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchUserId" TEXT NOT NULL,
    "majorCardId" INTEGER NOT NULL,
    "minorCardId" INTEGER NOT NULL,
    "data" TEXT NOT NULL DEFAULT '{}',
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_TwitchUserRevealTarotCard" ("id", "majorCardId", "minorCardId", "timestamp", "twitchUserId") SELECT "id", "majorCardId", "minorCardId", "timestamp", "twitchUserId" FROM "TwitchUserRevealTarotCard";
DROP TABLE "TwitchUserRevealTarotCard";
ALTER TABLE "new_TwitchUserRevealTarotCard" RENAME TO "TwitchUserRevealTarotCard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

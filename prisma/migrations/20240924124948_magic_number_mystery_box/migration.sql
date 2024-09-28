-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MagicNumberMysteryBox" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "minNumber" INTEGER NOT NULL,
    "maxNumber" INTEGER NOT NULL,
    "correntNumber" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "twitchRewardId" TEXT NOT NULL,
    "winnerUserId" TEXT,
    "winnerUsername" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MagicNumberMysteryBox" ("correntNumber", "id", "isActive", "maxNumber", "minNumber", "timestamp", "twitchRewardId", "winnerUserId", "winnerUsername") SELECT "correntNumber", "id", "isActive", "maxNumber", "minNumber", "timestamp", "twitchRewardId", "winnerUserId", "winnerUsername" FROM "MagicNumberMysteryBox";
DROP TABLE "MagicNumberMysteryBox";
ALTER TABLE "new_MagicNumberMysteryBox" RENAME TO "MagicNumberMysteryBox";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

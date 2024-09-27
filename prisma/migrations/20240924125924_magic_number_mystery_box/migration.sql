/*
  Warnings:

  - Added the required column `possibleMax` to the `MagicNumberMysteryBox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `possibleMin` to the `MagicNumberMysteryBox` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MagicNumberMysteryBox" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "minNumber" INTEGER NOT NULL,
    "maxNumber" INTEGER NOT NULL,
    "possibleMin" INTEGER NOT NULL,
    "possibleMax" INTEGER NOT NULL,
    "correctNumber" INTEGER NOT NULL,
    "twitchRewardId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "winnerUserId" TEXT,
    "winnerUsername" TEXT,
    "description" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MagicNumberMysteryBox" ("correctNumber", "description", "id", "isActive", "maxNumber", "minNumber", "timestamp", "twitchRewardId", "winnerUserId", "winnerUsername") SELECT "correctNumber", "description", "id", "isActive", "maxNumber", "minNumber", "timestamp", "twitchRewardId", "winnerUserId", "winnerUsername" FROM "MagicNumberMysteryBox";
DROP TABLE "MagicNumberMysteryBox";
ALTER TABLE "new_MagicNumberMysteryBox" RENAME TO "MagicNumberMysteryBox";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

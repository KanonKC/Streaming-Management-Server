-- CreateTable
CREATE TABLE "TwitchChannelPointRedeemedLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "rewardName" TEXT NOT NULL,
    "rewardCost" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShowImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchId" TEXT,
    "username" TEXT,
    "imageUrl" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ShowImage" ("id", "imageUrl", "timestamp", "twitchId", "username") SELECT "id", "imageUrl", "timestamp", "twitchId", "username" FROM "ShowImage";
DROP TABLE "ShowImage";
ALTER TABLE "new_ShowImage" RENAME TO "ShowImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

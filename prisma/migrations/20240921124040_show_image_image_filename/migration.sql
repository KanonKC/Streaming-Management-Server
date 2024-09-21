-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShowImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchId" TEXT,
    "username" TEXT,
    "imageUrl" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageFilename" TEXT NOT NULL
);
INSERT INTO "new_ShowImage" ("id", "imageFilename", "imageUrl", "timestamp", "twitchId", "username") SELECT "id", "imageFilename", "imageUrl", "timestamp", "twitchId", "username" FROM "ShowImage";
DROP TABLE "ShowImage";
ALTER TABLE "new_ShowImage" RENAME TO "ShowImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

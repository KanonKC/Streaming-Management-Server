-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_KillerRequestQueue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isRandom" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_KillerRequestQueue" ("description", "id", "isActive", "timestamp", "twitchUserId", "twitchUsername") SELECT "description", "id", "isActive", "timestamp", "twitchUserId", "twitchUsername" FROM "KillerRequestQueue";
DROP TABLE "KillerRequestQueue";
ALTER TABLE "new_KillerRequestQueue" RENAME TO "KillerRequestQueue";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

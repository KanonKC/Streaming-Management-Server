/*
  Warnings:

  - You are about to drop the column `twitchUsername` on the `ViewerCheckIn` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ViewerCheckIn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchUserId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ViewerCheckIn" ("id", "order", "timestamp", "twitchUserId") SELECT "id", "order", "timestamp", "twitchUserId" FROM "ViewerCheckIn";
DROP TABLE "ViewerCheckIn";
ALTER TABLE "new_ViewerCheckIn" RENAME TO "ViewerCheckIn";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

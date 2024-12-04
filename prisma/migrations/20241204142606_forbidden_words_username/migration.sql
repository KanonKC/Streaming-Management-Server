/*
  Warnings:

  - Added the required column `twitchUsername` to the `ForbiddenWords` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ForbiddenWords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ForbiddenWords" ("createAt", "id", "isActive", "twitchUserId", "updatedAt", "word") SELECT "createAt", "id", "isActive", "twitchUserId", "updatedAt", "word" FROM "ForbiddenWords";
DROP TABLE "ForbiddenWords";
ALTER TABLE "new_ForbiddenWords" RENAME TO "ForbiddenWords";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

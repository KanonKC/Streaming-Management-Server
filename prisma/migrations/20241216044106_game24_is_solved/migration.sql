-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game24" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberList" TEXT NOT NULL,
    "isSkipped" BOOLEAN NOT NULL DEFAULT false,
    "isSolved" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Game24" ("createAt", "id", "isActive", "isSkipped", "numberList", "updatedAt") SELECT "createAt", "id", "isActive", "isSkipped", "numberList", "updatedAt" FROM "Game24";
DROP TABLE "Game24";
ALTER TABLE "new_Game24" RENAME TO "Game24";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

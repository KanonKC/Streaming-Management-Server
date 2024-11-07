-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MathGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expression" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "resolveTwitchUserId" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MathGame" ("answer", "createAt", "expression", "id", "resolveTwitchUserId", "updatedAt") SELECT "answer", "createAt", "expression", "id", "resolveTwitchUserId", "updatedAt" FROM "MathGame";
DROP TABLE "MathGame";
ALTER TABLE "new_MathGame" RENAME TO "MathGame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

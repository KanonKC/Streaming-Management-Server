-- CreateTable
CREATE TABLE "MathGameGuess" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mathGameId" INTEGER NOT NULL,
    "guess" TEXT NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MathGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expression" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "resolveTwitchUserId" TEXT,
    "resolveTwitchUsername" TEXT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MathGame" ("answer", "createAt", "expression", "id", "resolveTwitchUserId", "updatedAt") SELECT "answer", "createAt", "expression", "id", "resolveTwitchUserId", "updatedAt" FROM "MathGame";
DROP TABLE "MathGame";
ALTER TABLE "new_MathGame" RENAME TO "MathGame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HangedManGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolveTwitchUserId" TEXT,
    "resolveTwitchUsername" TEXT,
    "word" TEXT NOT NULL,
    "currentGuessedWord" TEXT NOT NULL DEFAULT '',
    "incorrectGuessesChar" TEXT NOT NULL DEFAULT '',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_HangedManGame" ("createAt", "currentGuessedWord", "id", "incorrectGuessesChar", "isResolved", "resolveTwitchUserId", "resolveTwitchUsername", "updatedAt", "word") SELECT "createAt", "currentGuessedWord", "id", "incorrectGuessesChar", "isResolved", "resolveTwitchUserId", "resolveTwitchUsername", "updatedAt", "word" FROM "HangedManGame";
DROP TABLE "HangedManGame";
ALTER TABLE "new_HangedManGame" RENAME TO "HangedManGame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

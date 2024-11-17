/*
  Warnings:

  - Added the required column `guessesLeft` to the `HangedManGame` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HangedManGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "word" TEXT NOT NULL,
    "currentWordState" TEXT NOT NULL DEFAULT '',
    "correctGuessedLetters" TEXT NOT NULL DEFAULT '',
    "incorrectGuessedLetters" TEXT NOT NULL DEFAULT '',
    "guessesLeft" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_HangedManGame" ("correctGuessedLetters", "createAt", "currentWordState", "id", "incorrectGuessedLetters", "isResolved", "updatedAt", "word") SELECT "correctGuessedLetters", "createAt", "currentWordState", "id", "incorrectGuessedLetters", "isResolved", "updatedAt", "word" FROM "HangedManGame";
DROP TABLE "HangedManGame";
ALTER TABLE "new_HangedManGame" RENAME TO "HangedManGame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

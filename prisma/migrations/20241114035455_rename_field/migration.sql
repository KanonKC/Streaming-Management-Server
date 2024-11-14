/*
  Warnings:

  - You are about to drop the column `currentGuessedWord` on the `HangedManGame` table. All the data in the column will be lost.
  - You are about to drop the column `incorrectGuessesChar` on the `HangedManGame` table. All the data in the column will be lost.
  - You are about to drop the column `resolveTwitchUserId` on the `HangedManGame` table. All the data in the column will be lost.
  - You are about to drop the column `resolveTwitchUsername` on the `HangedManGame` table. All the data in the column will be lost.

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
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_HangedManGame" ("createAt", "id", "isResolved", "updatedAt", "word") SELECT "createAt", "id", "isResolved", "updatedAt", "word" FROM "HangedManGame";
DROP TABLE "HangedManGame";
ALTER TABLE "new_HangedManGame" RENAME TO "HangedManGame";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

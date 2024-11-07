/*
  Warnings:

  - You are about to drop the `MathGameGuess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MathGameGuess";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MathGameGuessLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mathGameId" INTEGER NOT NULL,
    "guess" TEXT NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

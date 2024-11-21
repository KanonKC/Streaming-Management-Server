-- CreateTable
CREATE TABLE "HangedManGameAttemptedLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hangedManGameId" INTEGER NOT NULL,
    "twitchUserId" TEXT NOT NULL,
    "twitchUsername" TEXT NOT NULL,
    "guessType" TEXT NOT NULL,
    "guess" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

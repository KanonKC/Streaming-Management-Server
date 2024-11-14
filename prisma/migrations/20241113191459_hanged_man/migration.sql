-- CreateTable
CREATE TABLE "HangedManGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolveTwitchUserId" TEXT,
    "resolveTwitchUsername" TEXT,
    "word" TEXT NOT NULL,
    "currentGuessedWord" TEXT NOT NULL,
    "incorrectGuessesChar" INTEGER NOT NULL DEFAULT 0,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MathGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "expression" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "resolveTwitchUserId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

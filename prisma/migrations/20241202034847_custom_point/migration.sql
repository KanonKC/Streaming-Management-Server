-- CreateTable
CREATE TABLE "CustomPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchUserId" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ShowImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

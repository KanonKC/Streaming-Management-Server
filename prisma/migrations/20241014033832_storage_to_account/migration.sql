/*
  Warnings:

  - You are about to drop the `Storage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Storage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "twitchId" TEXT,
    "spotifyAccessToken" TEXT,
    "spotifyRefreshToken" TEXT,
    "spotifyTokenExpires" DATETIME,
    "twitchAppAccessToken" TEXT,
    "twitchAppTokenExpires" DATETIME,
    "twitchAccessToken" TEXT,
    "twitchRefreshToken" TEXT,
    "twitchTokenExpires" DATETIME,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_twitchId_key" ON "Account"("twitchId");

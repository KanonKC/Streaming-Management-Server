/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Account";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Storage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namespace" TEXT NOT NULL,
    "spotifyAccessToken" TEXT,
    "spotifyRefreshToken" TEXT,
    "spotifyTokenExpires" DATETIME,
    "twitchAccessToken" TEXT,
    "twitchRefreshToken" TEXT,
    "twitchTokenExpires" DATETIME,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Storage_namespace_key" ON "Storage"("namespace");

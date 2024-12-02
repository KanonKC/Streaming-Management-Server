/*
  Warnings:

  - A unique constraint covering the columns `[twitchUserId]` on the table `CustomPoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomPoint_twitchUserId_key" ON "CustomPoint"("twitchUserId");

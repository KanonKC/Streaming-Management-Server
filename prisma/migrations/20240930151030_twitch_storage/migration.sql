-- AlterTable
ALTER TABLE "Storage" ADD COLUMN "twitchAccessToken" TEXT;
ALTER TABLE "Storage" ADD COLUMN "twitchRefreshToken" TEXT;
ALTER TABLE "Storage" ADD COLUMN "twitchTokenExpires" DATETIME;

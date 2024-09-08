-- CreateTable
CREATE TABLE "CustomWelcomeMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "twitchUserId" TEXT NOT NULL,
    "soundFilePath" TEXT NOT NULL,
    "message" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomWelcomeMessage_twitchUserId_key" ON "CustomWelcomeMessage"("twitchUserId");

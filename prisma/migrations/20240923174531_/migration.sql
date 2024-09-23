-- CreateTable
CREATE TABLE `ShowImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `twitchId` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageFilename` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ShowImage_imageFilename_key`(`imageFilename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwitchChannelPointRedeemedLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `rewardId` VARCHAR(191) NOT NULL,
    `rewardName` VARCHAR(191) NOT NULL,
    `rewardCost` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rewardPrompt` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomWelcomeMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `twitchUserId` VARCHAR(191) NOT NULL,
    `soundFilePath` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,

    UNIQUE INDEX `CustomWelcomeMessage_twitchUserId_key`(`twitchUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KillerRequestQueue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `twitchUserId` VARCHAR(191) NOT NULL,
    `twitchUsername` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

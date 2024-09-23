/*
  Warnings:

  - A unique constraint covering the columns `[imageFilename]` on the table `ShowImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShowImage_imageFilename_key" ON "ShowImage"("imageFilename");

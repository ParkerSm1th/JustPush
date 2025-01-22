/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Repository_url_key" ON "Repository"("url");

/*
  Warnings:

  - Added the required column `repositoryId` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" ADD COLUMN     "repositoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

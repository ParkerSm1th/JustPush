-- CreateEnum
CREATE TYPE "RepositoryStatus" AS ENUM ('PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "status" "RepositoryStatus" NOT NULL DEFAULT 'ACTIVE';

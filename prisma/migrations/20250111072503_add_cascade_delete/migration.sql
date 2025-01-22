-- DropForeignKey
ALTER TABLE "Usage" DROP CONSTRAINT "Usage_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRespositoryMembership" DROP CONSTRAINT "UserRespositoryMembership_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserRespositoryMembership" ADD CONSTRAINT "UserRespositoryMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

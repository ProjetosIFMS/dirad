-- DropForeignKey
ALTER TABLE "CompletedStep" DROP CONSTRAINT "CompletedStep_userId_fkey";

-- AlterTable
ALTER TABLE "CompletedStep" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CompletedStep" ADD CONSTRAINT "CompletedStep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

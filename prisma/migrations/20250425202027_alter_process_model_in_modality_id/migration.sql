-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_modalityId_fkey";

-- AlterTable
ALTER TABLE "Process" ALTER COLUMN "modalityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "Modality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

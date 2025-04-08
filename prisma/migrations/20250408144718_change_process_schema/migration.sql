/*
  Warnings:

  - You are about to drop the column `checklistId` on the `Process` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_managingUnitId_fkey";

-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_processTypeId_fkey";

-- DropIndex
DROP INDEX "Process_checklistId_key";

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "checklistId";

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_processTypeId_fkey" FOREIGN KEY ("processTypeId") REFERENCES "ProcessType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_managingUnitId_fkey" FOREIGN KEY ("managingUnitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

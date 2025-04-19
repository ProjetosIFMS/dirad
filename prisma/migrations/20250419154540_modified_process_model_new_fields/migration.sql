/*
  Warnings:

  - You are about to drop the column `managingUnitId` on the `Process` table. All the data in the column will be lost.
  - Added the required column `executingUnitId` to the `Process` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedEndDate` to the `Process` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_managingUnitId_fkey";

-- DropIndex
DROP INDEX "Process_managingUnitId_idx";

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "managingUnitId",
ADD COLUMN     "executingUnitId" TEXT NOT NULL,
ADD COLUMN     "expectedEndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Process_executingUnitId_idx" ON "Process"("executingUnitId");

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_executingUnitId_fkey" FOREIGN KEY ("executingUnitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

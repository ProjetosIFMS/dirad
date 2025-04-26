/*
  Warnings:

  - You are about to drop the column `sectorId` on the `Step` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_sectorId_fkey";

-- DropIndex
DROP INDEX "Step_activityId_modalityId_sectorId_idx";

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "sectorId";

-- CreateIndex
CREATE INDEX "Step_activityId_modalityId_idx" ON "Step"("activityId", "modalityId");

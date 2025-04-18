/*
  Warnings:

  - Made the column `objectDescription` on table `Process` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `modalityId` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Step_activityId_idx";

-- AlterTable
ALTER TABLE "Process" ALTER COLUMN "objectDescription" SET NOT NULL;

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "modalityId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Modality_name_idx" ON "Modality"("name");

-- CreateIndex
CREATE INDEX "Modality_createdAt_idx" ON "Modality"("createdAt");

-- CreateIndex
CREATE INDEX "Modality_updatedAt_idx" ON "Modality"("updatedAt");

-- CreateIndex
CREATE INDEX "Step_activityId_modalityId_idx" ON "Step"("activityId", "modalityId");

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "Modality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

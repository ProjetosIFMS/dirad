-- DropIndex
DROP INDEX "Step_activityId_modalityId_idx";

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "sectorId" TEXT;

-- CreateIndex
CREATE INDEX "Step_activityId_modalityId_sectorId_idx" ON "Step"("activityId", "modalityId", "sectorId");

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

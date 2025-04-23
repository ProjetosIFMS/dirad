/*
  Warnings:

  - Changed the type of `estimatedCompletionDays` on the `Step` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Step" DROP COLUMN "estimatedCompletionDays",
ADD COLUMN     "estimatedCompletionDays" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Step_estimatedCompletionDays_idx" ON "Step"("estimatedCompletionDays");

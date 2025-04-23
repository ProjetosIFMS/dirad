/*
  Warnings:

  - You are about to drop the column `deadline` on the `Step` table. All the data in the column will be lost.
  - Added the required column `estimatedCompletionDays` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Step_deadline_idx";

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "deadline",
ADD COLUMN     "estimatedCompletionDays" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Step_estimatedCompletionDays_idx" ON "Step"("estimatedCompletionDays");

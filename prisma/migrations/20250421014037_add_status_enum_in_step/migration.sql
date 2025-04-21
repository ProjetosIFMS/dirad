/*
  Warnings:

  - Changed the type of `status` on the `Step` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'INACTIVE';

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;

-- CreateIndex
CREATE INDEX "Step_status_idx" ON "Step"("status");

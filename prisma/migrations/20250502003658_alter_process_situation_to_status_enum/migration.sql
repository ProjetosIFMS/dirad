/*
  Warnings:

  - Changed the type of `situation` on the `Process` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Process" DROP COLUMN "situation",
ADD COLUMN     "situation" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "template" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Process_situation_idx" ON "Process"("situation");

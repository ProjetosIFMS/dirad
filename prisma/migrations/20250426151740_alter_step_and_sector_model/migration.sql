/*
  Warnings:

  - You are about to drop the column `destiny` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Step` table. All the data in the column will be lost.
  - Added the required column `destinySector` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originSector` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Made the column `template` on table `Step` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Step" DROP COLUMN "destiny",
DROP COLUMN "origin",
ADD COLUMN     "destinySector" TEXT NOT NULL,
ADD COLUMN     "originSector" TEXT NOT NULL,
ALTER COLUMN "template" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_originSector_fkey" FOREIGN KEY ("originSector") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_destinySector_fkey" FOREIGN KEY ("destinySector") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

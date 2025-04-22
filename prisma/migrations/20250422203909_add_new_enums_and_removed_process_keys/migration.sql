/*
  Warnings:

  - You are about to drop the column `costing` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the column `supplierValue` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `Process` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'OVERDUE';
ALTER TYPE "Status" ADD VALUE 'PREDICTED';

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "costing",
DROP COLUMN "supplierValue",
DROP COLUMN "totalValue";

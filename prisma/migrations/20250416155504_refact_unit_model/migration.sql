/*
  Warnings:

  - You are about to drop the column `description` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `color` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortName` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "description",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "shortName" TEXT NOT NULL;

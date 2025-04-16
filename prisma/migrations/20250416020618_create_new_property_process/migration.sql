/*
  Warnings:

  - Added the required column `objectDescription` to the `Process` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "objectDescription" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `order` to the `CompletedStep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompletedStep" ADD COLUMN     "order" INTEGER NOT NULL;

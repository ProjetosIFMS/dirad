/*
  Warnings:

  - A unique constraint covering the columns `[checklistId]` on the table `Process` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "checklistId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Process_checklistId_key" ON "Process"("checklistId");

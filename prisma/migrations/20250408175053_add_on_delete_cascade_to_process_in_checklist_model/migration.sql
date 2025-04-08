-- DropForeignKey
ALTER TABLE "Checklist" DROP CONSTRAINT "Checklist_processId_fkey";

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

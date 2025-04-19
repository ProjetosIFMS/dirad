-- DropForeignKey
ALTER TABLE "ParticipatingUnit" DROP CONSTRAINT "ParticipatingUnit_processId_fkey";

-- AddForeignKey
ALTER TABLE "ParticipatingUnit" ADD CONSTRAINT "ParticipatingUnit_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE CASCADE ON UPDATE CASCADE;

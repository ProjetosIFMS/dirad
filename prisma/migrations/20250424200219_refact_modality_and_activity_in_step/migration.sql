-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_modalityId_fkey";

-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "activityId" DROP NOT NULL,
ALTER COLUMN "modalityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "Modality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

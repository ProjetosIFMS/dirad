-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "order" INTEGER;

-- CreateIndex
CREATE INDEX "Activity_order_idx" ON "Activity"("order");

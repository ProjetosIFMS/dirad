/*
  Warnings:

  - You are about to drop the column `destinySector` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `originSector` on the `Step` table. All the data in the column will be lost.
*/

-- Step 1: Create a default sector if it doesn't exist
INSERT INTO "Sector" (id, "shortName", description, responsible_name, responsible_email, "createdAt", "updatedAt")
SELECT 
    'default-sector',
    'Default',
    'Default Sector',
    'System',
    'system@example.com',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM "Sector" WHERE id = 'default-sector'
);

-- Step 2: Add new columns as nullable
ALTER TABLE "Step" ADD COLUMN "destinySectorId" TEXT;
ALTER TABLE "Step" ADD COLUMN "originSectorId" TEXT;

-- Step 3: Create indexes for the new columns
CREATE INDEX "Step_originSectorId_idx" ON "Step"("originSectorId");
CREATE INDEX "Step_destinySectorId_idx" ON "Step"("destinySectorId");

-- Step 4: Add foreign key constraints
ALTER TABLE "Step" ADD CONSTRAINT "Step_originSectorId_fkey" FOREIGN KEY ("originSectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Step" ADD CONSTRAINT "Step_destinySectorId_fkey" FOREIGN KEY ("destinySectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 5: Migrate existing data to use the default sector
UPDATE "Step" SET "originSectorId" = 'default-sector' WHERE "originSectorId" IS NULL;
UPDATE "Step" SET "destinySectorId" = 'default-sector' WHERE "destinySectorId" IS NULL;

-- Step 6: Make columns required
ALTER TABLE "Step" ALTER COLUMN "destinySectorId" SET NOT NULL;
ALTER TABLE "Step" ALTER COLUMN "originSectorId" SET NOT NULL;

-- Step 7: Drop old columns
ALTER TABLE "Step" DROP COLUMN "destinySector";
ALTER TABLE "Step" DROP COLUMN "originSector";

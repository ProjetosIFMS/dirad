-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedStep" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "checklistId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CompletedStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checklist" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" TEXT NOT NULL,
    "processNumber" TEXT NOT NULL,
    "processTypeId" TEXT NOT NULL,
    "managingUnitId" TEXT NOT NULL,
    "costing" DOUBLE PRECISION NOT NULL,
    "situation" TEXT NOT NULL,
    "estimatedValue" DOUBLE PRECISION NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "supplierValue" DOUBLE PRECISION NOT NULL,
    "object" TEXT NOT NULL,
    "adictionalInformation" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "checklistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipatingUnit" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParticipatingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "Activity_name_idx" ON "Activity"("name");

-- CreateIndex
CREATE INDEX "Step_activityId_idx" ON "Step"("activityId");

-- CreateIndex
CREATE INDEX "Step_status_idx" ON "Step"("status");

-- CreateIndex
CREATE INDEX "Step_deadline_idx" ON "Step"("deadline");

-- CreateIndex
CREATE INDEX "CompletedStep_stepId_idx" ON "CompletedStep"("stepId");

-- CreateIndex
CREATE INDEX "CompletedStep_checklistId_idx" ON "CompletedStep"("checklistId");

-- CreateIndex
CREATE INDEX "CompletedStep_userId_idx" ON "CompletedStep"("userId");

-- CreateIndex
CREATE INDEX "CompletedStep_status_idx" ON "CompletedStep"("status");

-- CreateIndex
CREATE INDEX "CompletedStep_completedAt_idx" ON "CompletedStep"("completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Checklist_processId_key" ON "Checklist"("processId");

-- CreateIndex
CREATE INDEX "Checklist_processId_idx" ON "Checklist"("processId");

-- CreateIndex
CREATE INDEX "Unit_name_idx" ON "Unit"("name");

-- CreateIndex
CREATE INDEX "ProcessType_name_idx" ON "ProcessType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Process_processNumber_key" ON "Process"("processNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Process_checklistId_key" ON "Process"("checklistId");

-- CreateIndex
CREATE INDEX "Process_processNumber_idx" ON "Process"("processNumber");

-- CreateIndex
CREATE INDEX "Process_processTypeId_idx" ON "Process"("processTypeId");

-- CreateIndex
CREATE INDEX "Process_managingUnitId_idx" ON "Process"("managingUnitId");

-- CreateIndex
CREATE INDEX "Process_situation_idx" ON "Process"("situation");

-- CreateIndex
CREATE INDEX "Process_priority_idx" ON "Process"("priority");

-- CreateIndex
CREATE INDEX "Process_createdAt_idx" ON "Process"("createdAt");

-- CreateIndex
CREATE INDEX "ParticipatingUnit_unitId_idx" ON "ParticipatingUnit"("unitId");

-- CreateIndex
CREATE INDEX "ParticipatingUnit_processId_idx" ON "ParticipatingUnit"("processId");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipatingUnit_unitId_processId_key" ON "ParticipatingUnit"("unitId", "processId");

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedStep" ADD CONSTRAINT "CompletedStep_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedStep" ADD CONSTRAINT "CompletedStep_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedStep" ADD CONSTRAINT "CompletedStep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_processTypeId_fkey" FOREIGN KEY ("processTypeId") REFERENCES "ProcessType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_managingUnitId_fkey" FOREIGN KEY ("managingUnitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipatingUnit" ADD CONSTRAINT "ParticipatingUnit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipatingUnit" ADD CONSTRAINT "ParticipatingUnit_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

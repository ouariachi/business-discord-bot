/*
  Warnings:

  - The primary key for the `Opportunity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Opportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `OpportunityRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OpportunityRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `UserSkill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `creatorId` on the `Opportunity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `OpportunityRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `opportunityId` on the `OpportunityRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "OpportunityRequest" DROP CONSTRAINT "OpportunityRequest_opportunityId_fkey";

-- DropForeignKey
ALTER TABLE "OpportunityRequest" DROP CONSTRAINT "OpportunityRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_userId_fkey";

-- DropIndex
DROP INDEX "Skill_name_key";

-- AlterTable
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "creatorId",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OpportunityRequest" DROP CONSTRAINT "OpportunityRequest_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "opportunityId",
ADD COLUMN     "opportunityId" INTEGER NOT NULL,
ADD CONSTRAINT "OpportunityRequest_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "UserSkill";

-- CreateIndex
CREATE UNIQUE INDEX "OpportunityRequest_userId_opportunityId_key" ON "OpportunityRequest"("userId", "opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_userId_key" ON "Skill"("name", "userId");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityRequest" ADD CONSTRAINT "OpportunityRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityRequest" ADD CONSTRAINT "OpportunityRequest_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

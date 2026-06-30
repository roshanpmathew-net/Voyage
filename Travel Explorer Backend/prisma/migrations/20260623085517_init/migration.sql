/*
  Warnings:

  - The `status` column on the `travel_packages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DRAFT');

-- AlterTable
ALTER TABLE "travel_packages" DROP COLUMN "status",
ADD COLUMN     "status" "PackageStatus" DEFAULT 'ACTIVE';

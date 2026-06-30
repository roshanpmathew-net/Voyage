/*
  Warnings:

  - You are about to drop the column `country_code` on the `destinations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "destinations" DROP CONSTRAINT "destinations_country_code_fkey";

-- AlterTable
ALTER TABLE "destinations" DROP COLUMN "country_code";

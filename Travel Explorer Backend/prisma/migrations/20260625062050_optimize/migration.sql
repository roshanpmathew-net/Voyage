/*
  Warnings:

  - You are about to alter the column `offer_value` on the `travel_packages` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "travel_packages" ALTER COLUMN "offer_value" SET DATA TYPE DECIMAL(10,2);

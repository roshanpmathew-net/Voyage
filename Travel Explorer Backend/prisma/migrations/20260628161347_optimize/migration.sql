/*
  Warnings:

  - The `booking_status` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[user_id,destination_id]` on the table `destination_visits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Confirmed', 'Cancelled', 'Completed');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "payment_id" TEXT,
ADD COLUMN     "payment_order_id" TEXT,
ADD COLUMN     "payment_signature" TEXT,
ADD COLUMN     "travelers" JSONB,
ALTER COLUMN "payment_status" SET DEFAULT 'Pending',
DROP COLUMN "booking_status",
ADD COLUMN     "booking_status" "BookingStatus" DEFAULT 'Pending',
ALTER COLUMN "booked_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "age" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "destination_visits_user_id_destination_id_key" ON "destination_visits"("user_id", "destination_id");

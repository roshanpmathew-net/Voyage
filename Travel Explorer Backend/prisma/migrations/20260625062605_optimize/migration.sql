/*
  Warnings:

  - A unique constraint covering the columns `[user_id,destination_id]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destination_id` on table `favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `favorites` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_user_id_fkey";

-- AlterTable
ALTER TABLE "favorites" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "destination_id" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_destination_id_key" ON "favorites"("user_id", "destination_id");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

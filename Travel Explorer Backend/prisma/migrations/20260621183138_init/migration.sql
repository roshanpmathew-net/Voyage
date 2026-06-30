/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Approved', 'Pending', 'Rejected');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Completed', 'Pending', 'Cancelled');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "avatarUrl" TEXT,
    "nativeCountry" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_profiles" (
    "alpha_3_code" CHAR(3) NOT NULL,
    "alpha_2_code" CHAR(2),
    "common_name" VARCHAR(100),
    "official_name" VARCHAR(150),
    "continent" VARCHAR(50),
    "population" BIGINT,
    "area_sq_km" DECIMAL(12,2),
    "capitals" JSONB,
    "languages" TEXT[],
    "timezones" TEXT[],
    "flag_description" TEXT,
    "flag_url_png" TEXT,
    "flag_url_svg" TEXT,
    "currencies" JSONB,
    "google_maps_url" TEXT,
    "open_street_maps_url" TEXT,
    "tagline" VARCHAR(255),
    "cost_of_living_per_day_usd" DECIMAL(10,2),
    "budget_level" VARCHAR(20),
    "infrastructure_rating" DECIMAL(3,1),
    "safety_score" DECIMAL(3,1),
    "climate" VARCHAR(100),
    "top_industry" VARCHAR(100),
    "tourism_speciality" TEXT[],
    "visa_difficulty" VARCHAR(50),
    "best_time_to_visit" VARCHAR(100),
    "transport_options" TEXT[],
    "tourist_friendliness" DECIMAL(3,1),
    "featured_attraction" JSONB,

    CONSTRAINT "country_profiles_pkey" PRIMARY KEY ("alpha_3_code")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" UUID NOT NULL,
    "country_code" CHAR(3),
    "name" VARCHAR(100),
    "region" VARCHAR(100),
    "lat" DECIMAL(9,6),
    "lng" DECIMAL(9,6),
    "short_description" VARCHAR(255),
    "description" TEXT,
    "long_description" TEXT,
    "did_you_know" TEXT,
    "budget_level" VARCHAR(20),
    "currency" CHAR(3),
    "visa_difficulty" VARCHAR(50),
    "best_time_to_visit" VARCHAR(255),
    "average_temperature" VARCHAR(20),
    "color_hex" VARCHAR(7),
    "highlights" TEXT[],
    "famous_for" TEXT[],
    "languages" TEXT[],
    "top_attractions" JSONB,
    "created_at" TIMESTAMP,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel_packages" (
    "id" UUID NOT NULL,
    "destination_id" UUID,
    "created_by" UUID,
    "name" VARCHAR(255),
    "description" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    "original_price" DECIMAL(10,2),
    "discounted_price" DECIMAL(10,2),
    "has_offer" BOOLEAN DEFAULT false,
    "max_travelers" INTEGER,
    "available_slots" INTEGER,
    "status" VARCHAR(20),
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "travel_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "package_id" UUID,
    "traveler_count" INTEGER,
    "total_cost" DECIMAL(10,2),
    "payment_status" "PaymentStatus",
    "booking_status" VARCHAR(20),
    "booked_at" TIMESTAMP,
    "start_date" DATE,
    "end_date" DATE,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "destination_id" UUID,
    "created_at" TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_visits" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "destination_id" UUID,
    "visited_at" TIMESTAMP,

    CONSTRAINT "destination_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_images" (
    "id" UUID NOT NULL,
    "uploaded_by" UUID,
    "destination_id" UUID,
    "image_url" TEXT,
    "caption" TEXT,
    "status" "Status",
    "reviewed_by" UUID,
    "reviewed_at" TIMESTAMP,
    "created_at" TIMESTAMP,

    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "country_profiles"("alpha_3_code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_packages" ADD CONSTRAINT "travel_packages_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel_packages" ADD CONSTRAINT "travel_packages_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "travel_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_visits" ADD CONSTRAINT "destination_visits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_visits" ADD CONSTRAINT "destination_visits_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

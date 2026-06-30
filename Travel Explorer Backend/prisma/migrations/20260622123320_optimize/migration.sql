-- AlterTable
ALTER TABLE "country_profiles" ALTER COLUMN "tourism_speciality" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "transport_options" SET DEFAULT ARRAY[]::TEXT[];

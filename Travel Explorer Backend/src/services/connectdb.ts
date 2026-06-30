import prisma from "../config/prisma.ts";

export const ConnectDb = async () => {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;

    console.log("✅ Database connected");
  } catch (e) {
    console.error("Database Connection failed due to : ", e);
    process.exit(0);
  }
};

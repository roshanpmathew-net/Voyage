import "dotenv/config";
import app from "./app.ts";
import prisma from "./config/prisma.ts";
import { ConnectDb } from "./services/connectdb.ts";
import { verifyMailConnection } from "./config/mail.ts";


const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
  await ConnectDb();
  await verifyMailConnection()

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Startup Failed due to:", error);
  process.exit(1);
}
}

//Helmet, ratelimit,  

startServer();
// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  console.log("Disconnecting Database...")
  await prisma.$disconnect();
  process.exit(0);
});
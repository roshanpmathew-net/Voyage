import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import userAuthRoutes from "./routes/userAuth.routes.ts";
import userActionsRoutes from "./routes/userActions.routes.ts"
import adminRoutes from "./routes/admin.routes.ts"
import morgan from "morgan";
import { rateLimiter } from "./middlewares/ratelimitter.ts";
import helmet from "helmet";

const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(cors());
// app.use(rateLimiter)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Travel Explorer API Running",
  });
});

app.use("/api/users/auth", userAuthRoutes);
app.use("/api/users/action",userActionsRoutes)
app.use("/api/admin", adminRoutes);

export default app;

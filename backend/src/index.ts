import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import usersRouter from "./routes/users.js";
import projectsRouter from "./routes/projects.js";

dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();
app.set("prisma", prisma);

// Routers
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

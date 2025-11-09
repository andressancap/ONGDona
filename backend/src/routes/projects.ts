import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

router.post("/", async (req, res) => {
  const prisma: PrismaClient = req.app.get("prisma");
  const { title, description, ownerId, goal } = req.body;

  try {
    const project = await prisma.project.create({
      data: { title, description, ownerId, goal: Number(goal) },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Error creating project", details: err });
  }
});

router.get("/", async (req, res) => {
  const prisma: PrismaClient = req.app.get("prisma");
  const projects = await prisma.project.findMany();
  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const prisma: PrismaClient = req.app.get("prisma");
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  });
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

export default router;

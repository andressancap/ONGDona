import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

router.post("/", async (req, res) => {
  const prisma: PrismaClient = req.app.get("prisma");
  const { email, name, role } = req.body;

  try {
    const user = await prisma.user.create({
      data: { email, name, role },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error creating user", details: err });
  }
});

export default router;

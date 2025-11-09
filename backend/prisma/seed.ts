import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: { email: "alice@example.com", name: "Alice", role: "ONG" },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: { email: "bob@example.com", name: "Bob", role: "DONOR" },
  });

  const project = await prisma.project.upsert({
    where: { title: "Agua potable para pueblo X" },
    update: {},
    create: {
      title: "Agua potable para pueblo X",
      description: "Suministro de filtros y mantenimiento",
      ownerId: alice.id,
      goal: 5000,
    },
  });

  console.log({ alice, bob, project });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultInterests = [
  { title: "Technology", userId: null },
  { title: "Sports", userId: null },
  { title: "Music", userId: null },
  { title: "Travel", userId: null },
  { title: "Fitness", userId: null },
];

async function seed() {
  console.log("Seeding default interests...");

  // Use createMany for bulk insert
  await prisma.interest.createMany({
    data: defaultInterests,
    skipDuplicates: true, // ✅ Prevents duplicates in PostgreSQL (NeonDB)
  });

  console.log("Seeding complete!");
}

seed()
  .catch((e) => console.error("Error:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });

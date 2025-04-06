import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tags = [
    'Technology',
    'Health',
    'Travel',
    'Food',
    'Lifestyle',
    'Finance',
    'Education',
    'Sports',
    'Entertainment',
    'Science',
    'Coding',
    'Startups',
    'Self Improvement',
  ];

  for (const name of tags) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Tags seeded!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

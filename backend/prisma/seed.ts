import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('- Starting Mega Seed ---');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.coupon.deleteMany();

  const categoryNames = ['Burgers', 'Pizza', 'Sushi', 'Desserts', 'Drinks'];
  const shopNames = [
    'Burger Master',
    'Pizza Hub',
    'Sushi World',
    'Sweet Dreams',
    'Drink Stop',
    'Healthy Food',
    'Street Food',
    'Pasta Palace',
    'Taco Bell',
    'Wok Express',
    'Steak House',
    'Morning Coffee',
  ];

  const categories = await Promise.all(
    categoryNames.map((name) => prisma.category.create({ data: { name } })),
  );

  await prisma.coupon.createMany({
    data: [
      { code: 'SAVE10', discount: 10 },
      { code: 'FREE', discount: 100 },
      { code: 'WELCOME20', discount: 20 },
    ],
  });

  for (let i = 0; i < shopNames.length; i++) {
    await prisma.shop.create({
      data: {
        name: shopNames[i],
        rating: parseFloat((Math.random() * (5 - 1) + 1).toFixed(1)),
        products: {
          create: Array.from({ length: 50 }).map((_, j) => {
            const randomCategory =
              categories[Math.floor(Math.random() * categories.length)];

            return {
              name: `${shopNames[i]} Item ${j + 1}`,
              price: Math.floor(Math.random() * (400 - 50) + 50),
              imageUrl: `https://picsum.photos/seed/shop${i}prod${j}/400/400`,
              categoryId: randomCategory.id,
            };
          }),
        },
      },
    });
  }

  console.log('Mega Seed Finished ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

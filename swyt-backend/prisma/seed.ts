import { faker } from '@faker-js/faker';
import { PrismaClient, Brand } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  // Check if the 'Men' category already exists
  let men = await prisma.category.findUnique({
    where: { name: 'Men' },
  });

  // If not, create it with its subcategories
  if (!men) {
    men = await prisma.category.create({
      data: {
        name: 'Men',
        children: {
          create: [
            { name: 'Formal Shoes' },
            { name: 'Casual Shoes' },
            { name: 'Sports Shoes' },
            { name: 'Boots' },
            { name: 'Sandals & Slippers' },
          ],
        },
      },
    });
  }

  // Check if the 'Women' category already exists
  let women = await prisma.category.findUnique({
    where: { name: 'Women' },
  });

  // If not, create it with its subcategories
  if (!women) {
    women = await prisma.category.create({
      data: {
        name: 'Women',
        children: {
          create: [
            { name: 'Heels' },
            { name: 'Flats' },
            { name: 'Sneakers' },
            { name: 'Sandals' },
          ],
        },
      },
    });
  }

  console.log('Categories ensured:', men, women);
}

async function seedProducts() {
  const categories = await prisma.category.findMany({
    where: {
      name: {
        in: ['Formal Shoes', 'Casual Shoes', 'Sports Shoes', 'Heels', 'Flats', 'Sneakers'],
      },
    },
  });

  for (const category of categories) {
    const productData = {
      name: `${category.name} Example`,
      description: `An example of ${category.name}`,
      price: Math.random() * 100 + 20,  // Random price between 20 and 120
      image: faker.image.urlLoremFlickr({ category: 'food' }),
      size: 42,
      brand: faker.helpers.arrayElement(Object.values(Brand)),
      categories: {
        connect: { id: category.id },
      },
    };

    await prisma.product.create({ data: productData });
  }

  console.log('Products added for each category.');
}

async function main() {
  console.log(`Start seeding ...`);
  await seedCategories();
  await seedProducts();
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

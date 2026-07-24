import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, products } from "../scripts/seed-data.mjs";

const prisma = new PrismaClient();

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: product.categorySlug } });
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        categoryId: category.id,
        name: product.name,
        shortDescription: product.shortDescription,
        specSheet: product.specSheet,
        images: product.images
      },
      create: {
        categoryId: category.id,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        specSheet: product.specSheet,
        images: product.images
      }
    });
  }

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await prisma.adminUser.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: { passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) },
      create: {
        email: process.env.ADMIN_EMAIL,
        passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
      }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

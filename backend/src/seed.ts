import prisma from "./prisma";

async function main() {
  const category = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      categoryName: 'General Supplies',
    },
  });

  const supplier = await prisma.supplier.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      supplierName: 'Main Distributor',
      contactInfo: 'contact@distributor.com',
    },
  });

  console.log({ category, supplier });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

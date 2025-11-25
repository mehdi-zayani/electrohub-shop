const { prisma } = require('./prisma.ts');
const seedData = require('./seed.json');

async function main() {
  for (const user of seedData.users) {
    await prisma.user.create({ data: user });
  }
  for (const product of seedData.products) {
    await prisma.product.create({ data: product });
  }
  console.log('Seed completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

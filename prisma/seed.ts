/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const qrCode = await prisma.qrCode.create({
    data: {
      createdAt: new Date(),
    },
  });
  console.log("Created QR Code:", qrCode);
  await prisma.$disconnect();
}

await main();

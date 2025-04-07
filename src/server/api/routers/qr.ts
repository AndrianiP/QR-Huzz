/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const qrTrackerRouter = createTRPCRouter({
  incrementCount: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      await db.qrCode.upsert({
        where: { id: 1 },
        create: {
          total_downloaded: 1,
          updatedAt: new Date(),
        },
        update: {
          total_downloaded: {
            increment: 1,
          },
          updatedAt: new Date(),
        },
      });
      await db.qrCodeDownload.create({
        data: {
          qrCodeId: 1,
          createdAt: new Date(),
          data: input.text,
        },
      });
    }),
});

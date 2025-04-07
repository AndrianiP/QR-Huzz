/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const qrTrackerRouter = createTRPCRouter({
  incrementCount: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      console.log("Incrementing QR code download count");
      console.log("Input text:", input.text);
      try {
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
      } catch (error) {
        console.error("Error updating QR code:", error);
        throw new Error("Failed to update QR code");
      }
      try {
        await db.qrCodeDownload.create({
          data: {
            qrCodeId: 1,
            createdAt: new Date(),
            data: input.text,
          },
        });
      } catch (error) {
        console.error("Error creating QR code download:", error);
        throw new Error("Failed to create QR code download");
      }
    }),
});

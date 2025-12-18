import z from "zod";

import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const messageRouter = createTRPCRouter({

  create: baseProcedure
    .input(
      z.object({
        prompt: z.string().min(1, { message: "Message is required" })
      }),
    )
    .mutation(async ({ input }) => {
      const createdMessage = await prisma.message.create({
        data: {
          content: input.prompt,
          role: 'USER',
          type: 'RESULT'
        }
      })

      await inngest.send({
        name: "code-agent/run",
        data: {
          email: input.prompt,
        }
      })

      return createdMessage;

    }),

  getMany: baseProcedure
    .query(async () => {
      const messages = await prisma.message.findMany({
        orderBy: {
          updatedAt: 'desc',
        }
      });

      return messages;
    })
})

import { prisma } from "~/utils/db";

export async function getAllMessages() {
  const data = await prisma.guestbook.findMany({
    select: {
      id: true,
      userId: true,
      content: true,
      createdAt: true,
      name: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export type GetAllMessages = Awaited<ReturnType<typeof getAllMessages>>;

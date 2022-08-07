import type { APIContext } from "astro";
import { prisma } from "~/utils/db";

export async function get({ params, request }: APIContext) {
  const data = await prisma.projectCategory.findMany({
    select: {
      id: true,
      title: true,
      Projects: {
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
        },
      },
    },
  });
  return {
    body: JSON.stringify({
      data,
    }),
  };
}

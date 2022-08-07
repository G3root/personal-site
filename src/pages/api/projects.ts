import type { APIContext } from "astro";
import { prisma } from "~/utils/db";
import { cache } from "~/utils/cache";
import { PROJECT_CACHE_KEY } from "~/constants";

export async function get({ params, request }: APIContext) {
  if (cache.has(PROJECT_CACHE_KEY)) {
    const data = await cache.get(PROJECT_CACHE_KEY);
    return {
      body: JSON.stringify({
        data,
      }),
    };
  }
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
  cache.set(PROJECT_CACHE_KEY, data);
  return {
    body: JSON.stringify({
      data,
    }),
  };
}

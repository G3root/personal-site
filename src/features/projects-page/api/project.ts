import { PROJECT_CACHE_KEY } from "~/constants";
import { cache } from "~/utils/cache";
import { prisma } from "~/utils/db";

const allProjects = async () => {
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
  return data;
};

export type AllProjects = Awaited<ReturnType<typeof allProjects>>;

export const getAllProjects = async () => {
  if (cache.has(PROJECT_CACHE_KEY)) {
    const data = await cache.get(PROJECT_CACHE_KEY);

    return data as AllProjects;
  }
  const data = await allProjects();
  cache.set(PROJECT_CACHE_KEY, data);
  return data;
};

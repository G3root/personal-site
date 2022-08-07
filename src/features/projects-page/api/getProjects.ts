import { Prisma } from "@prisma/client";

type GetAllProjects = {
  data: {
    id: number;
    title: string;
    Projects: {
      id: number;
      title: string;
      description: string | null;
      link: string;
    }[];
  }[];
};

export const getProjects = async (): Promise<GetAllProjects> => {
  const req = await fetch("/api/projects");
  const res = await req.json();

  return res;
};

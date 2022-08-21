import type { APIContext } from "astro";
import { generateAuthCookie, GenerateAuthToken, GetUser } from "~/utils/auth";
import { prisma } from "~/utils/db";

export async function post({ params, request }: APIContext) {
  const user = GetUser(request.headers);
  if (!user) {
    return new Response("unAuthorized", {
      status: 401,
    });
  }
  const body = (await request.json()) as { id?: number };

  if (!body || !body.id || typeof body.id !== "number") {
    return new Response("unAuthorized", {
      status: 401,
    });
  }

  prisma.guestbook.findFirst({
    where: {
      userId: user.id,
      id: body.id,
    },
  });
  try {
    await prisma.$transaction([
      prisma.guestbook.findFirstOrThrow({
        where: {
          userId: user.id,
          id: body.id,
        },
      }),
      prisma.guestbook.delete({ where: { id: body.id } }),
    ]);
    const token = GenerateAuthToken({
      ...user,
      gm_count: Number(user.gm_count) - 1,
    });

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        "Set-Cookie": generateAuthCookie(token),
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

import type { APIContext } from "astro";
import { MAX_MESSAGE } from "~/constants";
import { getAllMessages } from "~/features/guest-book-page/api/guestbook";
import { generateAuthCookie, GenerateAuthToken, GetUser } from "~/utils/auth";
import { prisma } from "~/utils/db";

export async function get({ params, request }: APIContext) {
  const data = await getAllMessages();

  return new Response(JSON.stringify({ data }), { status: 200 });
}

export async function post({ params, request }: APIContext) {
  const user = GetUser(request.headers);
  if (!user) {
    return new Response("unAuthorized", {
      status: 401,
    });
  }
  const body = (await request.json()) as { content?: string };

  if (
    !body ||
    !body.content ||
    typeof body.content !== "string" ||
    body.content.length <= 0
  ) {
    return new Response("unAuthorized", {
      status: 401,
    });
  }

  if (Number(user.gm_count) === MAX_MESSAGE) {
    return new Response("only two messages can be created by a single user", {
      status: 401,
    });
  }

  const data = await prisma.guestbook.create({
    data: {
      content: body.content,
      name: user.name,
      userId: user.id,
    },
  });

  const token = GenerateAuthToken({
    ...user,
    gm_count: Number(user.gm_count) + 1,
  });

  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      "Set-Cookie": generateAuthCookie(token),
    },
  });
}

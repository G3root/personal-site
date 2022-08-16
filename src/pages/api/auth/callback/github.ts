import type { APIRoute } from "astro";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "~/constants";
import { prisma } from "~/utils/db";
import { generateAuthCookie, GenerateAuthToken } from "~/utils/auth";

interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GithubUserResponse {
  id: number;
  name: string;
}

export const get: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return new Response("unAuthorized", {
      status: 401,
    });
  }
  try {
    const req = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const res = (await req.json()) as GithubTokenResponse;

    const userReq = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `token ${res.access_token}`,
      },
    });

    const userRes = (await userReq.json()) as GithubUserResponse;

    const guestbookMessageCount = await prisma.guestbook.findMany({
      where: {
        userId: `twitter_${userRes.id}`,
      },
    });

    const token = GenerateAuthToken({
      id: `twitter_${userRes.id}`,
      name: userRes.name,
      gm_count: guestbookMessageCount.length,
    });

    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": generateAuthCookie(token),
        Location: "/guestbook",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};

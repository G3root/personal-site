import type { APIRoute } from "astro";
import { GITHUB_CLIENT_ID, GITHUB_AUTH_REDIRECT_URL } from "~/constants";
import { nanoid } from "nanoid";

export const get: APIRoute = async ({ request }) => {
  const githubOauthUrl = new URL("https://github.com/login/oauth/authorize");
  const params = githubOauthUrl.searchParams;
  params.append("client_id", GITHUB_CLIENT_ID);
  params.append("redirect_uri", GITHUB_AUTH_REDIRECT_URL);
  params.append("state", nanoid());
  params.append("scope", "read:user");
  return new Response(JSON.stringify({ url: githubOauthUrl.toString() }), {
    status: 200,
  });
};

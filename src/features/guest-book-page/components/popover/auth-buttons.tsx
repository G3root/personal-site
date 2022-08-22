import { FiGithub } from "solid-icons/fi";
export const AuthButtons = () => {
  return (
    <button
      onClick={async () => {
        const req = await fetch("api/auth/github", {
          method: "GET",
        });
        const res = (await req.json()) as { url: string };

        if (req.ok) {
          window.location.href = res.url;
        }
      }}
      class="mt-6 w-28 bg-slate-4 hover:bg-slate-5 p-2 font-bold flex flex-col items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-5  "
    >
      <FiGithub class="h-5 w-5" />
      Github
    </button>
  );
};

import { createStorageSignal } from "@solid-primitives/storage";
import { createEffect, on, Show } from "solid-js";
import Moon from "~icons/heroicons-outline/moon";
import Sun from "~icons/heroicons-outline/sun";

export const ThemeToggle = () => {
  const [theme, setTheme] = createStorageSignal<"dark" | "light">(
    "theme",
    "light",
    { api: localStorage }
  );

  const isDark = () => (theme() === "dark" ? true : false);

  createEffect(
    on(
      theme,
      () => {
        const root = document.documentElement;
        if (theme() === "light") {
          root.classList.remove("dark-theme");
        } else {
          root.classList.add("dark-theme");
        }
      },
      { defer: true }
    )
  );
  return (
    <button
      type="button"
      class="flex items-center p-1 rounded-md"
      onClick={() => {
        if (theme() === "light") {
          setTheme("dark");
          localStorage.setItem("theme", "dark");
        } else {
          setTheme("light");
          localStorage.setItem("theme", "light");
        }
      }}
    >
      <span aria-hidden class="dark:hidden block">
        <Moon aria-hidden />
      </span>

      <span aria-hidden class="dark:block hidden">
        <Sun aria-hidden />
      </span>

      <span class="sr-only">
        <Show when={isDark()} fallback="switch to dark mode">
          switch to light mode
        </Show>
      </span>
    </button>
  );
};

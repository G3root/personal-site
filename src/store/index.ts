import { persistentAtom } from "@nanostores/persistent";
import type { Accessor } from "solid-js";
import { MAXIMUM_THEME_INDEX } from "~/constants";

export const themeColorIndexAtom = persistentAtom<string>("theme-index", "0");
export const themeAtom = persistentAtom<"dark" | "light">("theme", "light");

export function setIndexAtom(index: Accessor<string>) {
  const currentIndex = Number(index());

  if (typeof currentIndex === "number" && currentIndex < MAXIMUM_THEME_INDEX) {
    themeColorIndexAtom.set(`${currentIndex + 1}`);
  } else {
    themeColorIndexAtom.set("0");
  }
}

export function setTheme(theme: Accessor<"dark" | "light">) {
  if (theme() === "light") {
    themeAtom.set("dark");
  } else {
    themeAtom.set("light");
  }
}

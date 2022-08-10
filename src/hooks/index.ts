import { useStore } from "@nanostores/solid";
import { createEffect, on } from "solid-js";
import { themeColorIndexAtom } from "~/store";

export const useAppTheme = () => {
  const index = useStore<any, string>(themeColorIndexAtom);

  createEffect(
    on(
      index,
      () => {
        const root = document.documentElement;
        const currentIndex = index();
        if (currentIndex) {
          root.setAttribute("data-theme-index", currentIndex);
        }
      },
      { defer: true }
    )
  );

  return { index };
};

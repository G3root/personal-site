import { useAppTheme } from "~/hooks";
import { setIndexAtom } from "~/store";

export const ThemeColorSwitch = () => {
  const { index } = useAppTheme();

  return (
    <button
      type="button"
      aria-label="toggle theme color "
      class="p-3 rounded-full theme-bg"
      onClick={() => {
        setIndexAtom(index);
      }}
    />
  );
};

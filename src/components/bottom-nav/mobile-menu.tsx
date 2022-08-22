import { NAV_LINKS } from "~/constants";

import { createSignal, For, Show } from "solid-js";

import { SolidBottomsheet } from "solid-bottomsheet";

interface MobileMenuProps {
  path: string;
}

export default function MobileMenu(props: MobileMenuProps) {
  const { path } = props;
  const [isOpen, setOpen] = createSignal(false);

  return (
    <>
      <button
        onClick={() => {
          console.log("hello");
          setOpen(true);
        }}
        class="font-bold text-slate-11"
      >
        Menu
      </button>
      <Show when={isOpen()}>
        <SolidBottomsheet
          variant="snap"
          defaultSnapPoint={({ maxHeight }) => maxHeight / 2}
          snapPoints={({ maxHeight }) => [maxHeight, maxHeight / 4]}
          onClose={() => setOpen(false)}
        >
          <div class="px-2">
            <div class="grid gap-2 py-8">
              <nav class="grid gap-3 text-2xl">
                <For each={NAV_LINKS}>
                  {(item, index) => (
                    <a
                      href={item.to}
                      classList={{ "font-bold theme-txt": path === item.to }}
                    >
                      {item.label}
                    </a>
                  )}
                </For>
              </nav>
            </div>
          </div>
        </SolidBottomsheet>
      </Show>
    </>
  );
}

import type { TokenPayload } from "~/utils/auth";
import { FiX } from "solid-icons/fi";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "solid-headless";
import { onMount, Show } from "solid-js";
import { useStore } from "@nanostores/solid";

import { setUser, user as userAtom } from "~/atoms";
import SigningForm from "./signing-popover";
import { AuthButtons } from "./auth-buttons";

interface GuestBookPopoverProps {
  data: TokenPayload | null;
}

export default function GuestBookPopover(props: GuestBookPopoverProps) {
  const { data } = props;
  const user = useStore(userAtom);

  onMount(() => {
    setUser(data);
  });
  return (
    <>
      {/* <Popover defaultOpen={false} class="relative">
        {({ isOpen, setState }) => (
          <>
            <PopoverButton class="my-4 rounded bg-slate-4 hover:bg-slate-5 px-4 py-2 font-bold">
              Sign the Guestbook
            </PopoverButton>
            <Transition
              show={isOpen()}
              enter="transition duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                unmount={false}
                class="absolute bg-slate-2 rounded-md w-64  drop-shadow mb-4 z-10"
              >
                <div class="p-3">
                  <div class="flex items-center justify-between">
                    <div class="text-lg font-bold">
                      <Show when={user()} fallback="Login with">
                        Sign a message
                      </Show>
                    </div>
                    <button
                      class="flex items-center hover:bg-slate-4 active:bg-slate-4 p-1 rounded-md"
                      aria-label="close popup"
                      onclick={() => {
                        setState(false);
                      }}
                    >
                      <FiX class="h-4 w-4" />
                    </button>
                  </div>

                  <Show when={user()} fallback={<AuthButtons />}>
                    <SigningForm user={user() as TokenPayload} />
                  </Show>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover> */}
    </>
  );
}

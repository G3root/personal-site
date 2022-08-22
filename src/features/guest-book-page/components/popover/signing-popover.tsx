import { MAX_MESSAGE } from "~/constants";
import type { TokenPayload } from "~/utils/auth";
import { increaseGmCount, setUser } from "~/atoms";
import { Show } from "solid-js";
import { revalidateMessages } from "~/utils/dom";

interface SigningFormProps {
  user: TokenPayload;
}

export default function SigningForm(props: SigningFormProps) {
  let p: DOMParser | undefined;
  let inputRef: HTMLTextAreaElement;
  const isMaximumMessageCount = () => props.user.gm_count >= MAX_MESSAGE;
  return (
    <div class="mt-6">
      <Show
        when={!isMaximumMessageCount()}
        fallback={
          <div class="bg-yellow-4 p-2 rounded-md">
            <p class="text-yellow-11 text-sm">
              only {MAX_MESSAGE} messages can be signable by a user. try
              deleting your existing messages
            </p>
          </div>
        }
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const req = await fetch("/api/message", {
              method: "POST",
              body: JSON.stringify({
                content: inputRef.value,
              }),
            });
            const res = await req.json();

            if (req.ok) {
              await revalidateMessages();

              increaseGmCount();
            }

            inputRef.value = "";
          }}
        >
          <fieldset class="flex flex-col gap-y-3">
            <textarea
              ref={inputRef!}
              class="form-textarea bg-transparent rounded-md border border-slate-7 text-sm shadow-sm focus:outline-none focus:border-slate-9 focus:ring-slate-9 "
              name="message"
              id="message"
              maxLength={100}
              required
              aria-label="Your message"
              placeholder="Your message..."
            />

            <button
              type="submit"
              class="rounded px-3 py-1 font-medium bg-green-4 text-green-11 hover:bg-green-6"
            >
              sign
            </button>
          </fieldset>
        </form>
      </Show>

      <div class="pt-2">
        <button
          onClick={async () => {
            await fetch("/api/auth/logout");
            await revalidateMessages();
            setUser(null);
          }}
          class="rounded px-3 py-1 font-medium bg-red-4 text-red-11 hover:bg-red-6 w-full"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

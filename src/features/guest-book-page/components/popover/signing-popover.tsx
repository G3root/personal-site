import { h } from "preact";
import { MAX_MESSAGE } from "~/constants";
import type { TokenPayload } from "~/utils/auth";
import { useRef } from "preact/hooks";
import { increaseGmCount, setMessages, setUser } from "~/atoms";

interface SigningFormProps {
  user: TokenPayload;
}

export default function SigningForm(props: SigningFormProps) {
  const { user } = props;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isMaximumMessageCount = user.gm_count >= MAX_MESSAGE;
  return (
    <div className="mt-6">
      {isMaximumMessageCount ? (
        <div className="bg-yellow-4 p-2 rounded-md">
          <p className="text-yellow-11 text-sm">
            only {MAX_MESSAGE} messages can be signable by a user. try deleting
            your existing messages
          </p>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const req = await fetch("/api/message", {
              method: "POST",
              body: JSON.stringify({
                content: inputRef.current?.value,
              }),
            });
            await req.json();

            if (req.ok) {
              const url = new URL(window.location.toString());

              const html = await fetch(url.toString(), {
                method: "GET",
              }).then((res) => res.text());

              const p = new DOMParser();
              const doc = p.parseFromString(html, "text/html");
              document
                .querySelector("#messages-list")!
                .replaceWith(doc.querySelector("#messages-list")!);

              increaseGmCount();
            }

            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          <fieldset
            className="flex flex-col gap-y-3"
            disabled={isMaximumMessageCount}
          >
            <textarea
              ref={inputRef}
              className="form-textarea bg-transparent rounded-md border border-slate-7 text-sm shadow-sm focus:outline-none focus:border-slate-9 focus:ring-slate-9 "
              name="message"
              id="message"
              maxLength={100}
              required
              aria-label="Your message"
              placeholder="Your message..."
            />

            <button
              type="submit"
              className="rounded px-3 py-1 font-medium bg-green-4 text-green-11 hover:bg-green-6"
            >
              sign
            </button>
          </fieldset>
        </form>
      )}

      <div className="pt-2">
        <button
          onClick={async () => {
            await fetch("/api/auth/logout");
            setUser(null);
          }}
          className="rounded px-3 py-1 font-medium bg-red-4 text-red-11 hover:bg-red-6 w-full"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

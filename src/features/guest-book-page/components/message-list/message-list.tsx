import type { TokenPayload } from "~/utils/auth";
import type { GetAllMessages } from "../../api/guestbook";
import { h } from "preact";
import {
  decreaseGmCount,
  messages as messagesAtom,
  setMessages,
  user as userAtom,
} from "~/atoms";
import { useEffect } from "preact/hooks";
import { useStore } from "@nanostores/preact";

interface MessagesListProps {
  messages: GetAllMessages;
}

interface MessageItemsProps {
  item: GetAllMessages[number];
  user: TokenPayload | null;
}

function MessageItem(props: MessageItemsProps) {
  const { user, item } = props;
  return (
    <div>
      <div class="flex min-h-[5rem] space-x-3  bg-slate3 py-3 px-3.5 text-sm  lg:rounded-lg lg:border-none lg:py-2">
        <div class="flex flex-col justify-center space-y-1">
          <div class="text-base font-medium ">{item.content}</div>
          <div class="text-slate-11 text-opacity-80 line-clamp-1 ">
            <div class="mb-2 flex items-center space-x-2">
              <p class="text-sm">
                {item.name} /{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "long",
                }).format(new Date(item.createdAt))}
              </p>
            </div>
          </div>

          <div>
            {user && user.id === item.userId ? (
              <button
                type="button"
                class="rounded px-3 py-1 font-medium bg-red4 text-red-11 hover:bg-red-5"
                onClick={async () => {
                  const req = await fetch("/api/message/delete", {
                    method: "POST",
                    body: JSON.stringify({ id: item.id }),
                  });
                  const res = await req.json();
                  if (req.ok) {
                    setMessages(res.data);
                    decreaseGmCount();
                  }
                }}
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessagesList(props: MessagesListProps) {
  const { messages } = props;
  const messagesData = useStore(messagesAtom);
  const user = useStore(userAtom);
  useEffect(() => {
    setMessages(messages);
  }, []);

  return (
    <>
      {messagesData.map((item) => (
        <MessageItem key={item.id} item={item} user={user} />
      ))}
    </>
  );
}

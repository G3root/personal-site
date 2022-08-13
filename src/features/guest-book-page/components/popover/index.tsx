import { h } from "preact";
import { FiX } from "react-icons/fi";
import {
  Popover,
  PopoverDisclosure,
  PopoverHeading,
  usePopoverState,
} from "ariakit/popover";
import type { TokenPayload } from "~/utils/auth";

interface GuestBookPopoverProps {
  data: TokenPayload | null;
}

export default function GuestBookPopover(props: GuestBookPopoverProps) {
  const { data } = props;
  const popover = usePopoverState();
  return (
    <>
      <PopoverDisclosure
        className="my-4 rounded bg-slate-4 hover:bg-slate-5 px-4 py-2 font-bold"
        state={popover}
      >
        Sign the Guestbook
      </PopoverDisclosure>
      <Popover
        state={popover}
        aria-label={
          data?.user ? "sign the guestbook popover" : "authentication popover"
        }
        className="bg-slate-2 rounded-md w-64  drop-shadow mb-4"
      >
        <div className="p-3">
          <div className="flex items-center justify-between">
            <PopoverHeading className="text-lg font-bold">
              {data?.user ? "Sign a message" : "Login with"}
            </PopoverHeading>
            <button
              className="flex items-center hover:bg-slate-4 active:bg-slate-4 p-1 rounded-md"
              aria-label="close popup"
              onClick={popover.hide}
            >
              <FiX
                aria-hidden
                /*
      // @ts-ignore */
                className="h-4 w-4"
              />
            </button>
          </div>
          {/* {data.user ? <SigningForm /> : <AuthButtons />} */}
        </div>
      </Popover>
    </>
  );
}

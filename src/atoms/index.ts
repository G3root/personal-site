import { atom } from "nanostores";
import type { GetAllMessages } from "~/features/guest-book-page/api/guestbook";
import type { TokenPayload } from "~/utils/auth";

export const messages = atom<GetAllMessages>([]);

export const user = atom<null | TokenPayload>(null);

export const setUser = (data: TokenPayload | null) => {
  user.set(data);
};
export const setMessages = (data: any) => {
  messages.set(data);
};

export const decreaseGmCount = () => {
  const user_ = user.get();
  if (user_) {
    user.set({ ...user_, gm_count: user_.gm_count - 1 });
  }
};

export const increaseGmCount = () => {
  const user_ = user.get();
  if (user_) {
    user.set({ ...user_, gm_count: user_.gm_count + 1 });
  }
};

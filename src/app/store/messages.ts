import { create } from "zustand";

const useMesageStore = create((set) => ({
  hasUnread: true,
  setHasUnread: (payload: boolean) =>
    set((state: any) => ({ hasUnread: payload })),
}));

export default useMesageStore;

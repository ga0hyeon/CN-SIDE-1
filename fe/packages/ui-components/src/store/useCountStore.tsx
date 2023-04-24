import { create } from "zustand";

const useCountStore = create((set) => ({
  count: 0,
  countUp: () =>
    set((state: { count: number }) => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 }),
}));

export default useCountStore;

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist((set, get) => ({
      Name: null,
      Room: null,
      setName: (Name) => set(() => ({ Name: Name })),
      setRoom: (Room) => set(() => ({ Room: Room })),
      unsetData: () => set(() => ({ Name: null, Room: null })),
    }), {
      name: "phone-clud-storage",
      getStorage: () => sessionStorage
    })
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  username: string;
  [key: string]: any;
}

interface UserState {
  isLogin: boolean;
  user: User | null;
  setLogin: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: null,
      setLogin: (user) => set({ isLogin: true, user }),
      logout: () => set({ isLogin: false, user: null }),
    }),
    {
      name: 'user-store', // name of item in storage
      storage: createJSONStorage(() => localStorage),
    }
  )
); 
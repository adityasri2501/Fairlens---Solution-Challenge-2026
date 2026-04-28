import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    id: '1',
    email: 'ds@demo.com',
    name: 'Data Scientist',
    role: 'DATA_SCIENTIST',
    createdAt: new Date(),
  },
  setUser: (user) => set({ user }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null }),
}));

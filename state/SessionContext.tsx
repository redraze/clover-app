import { create } from 'zustand';
import { TokenType } from '@/types/types';

export const useSessionContext = create((set) => ({
    token: undefined,
    signIn: (newToken: TokenType) => set({ token: newToken, loading: true }),
    signOut: () => set({ token: undefined, loading: true }),

    loading: true,
    setLoading: (bool: boolean) => set({ loading: bool }),
}));

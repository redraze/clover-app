import { create } from 'zustand';

type ToasterType = (msg: string) => void;

export const useToaster = create((set) => ({
    toaster: null,
    setToaster: (newToaster: ToasterType) => set({ toaster: newToaster }),
}));

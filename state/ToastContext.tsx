import { create } from 'zustand';

type ToasterType = (msg: string) => void;

export const useToaster = create((set) => ({
    toaster: () => {},
    setToaster: (newToaster: ToasterType) => set({ toaster: newToaster }),
}));

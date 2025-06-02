import { create } from 'zustand';
import { LogType } from '@/types/types';

export const useLogsContext = create((set) => ({
    logs: [],
    setLogs: (newLogs: LogType[]) => set({ logs: newLogs }),
    pushLog: (newLog: LogType) => set((state: any) => ({ logs: [ newLog, ...state.logs ] })),
}));

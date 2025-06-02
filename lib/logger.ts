import { LogType } from "@/types/types";

export const formatLogEvent = (action: string) => {
    // await callLogMutationAPI({ ... });
    const log: LogType = {
        time: JSON.stringify(new Date()),
        action,
        source_ip: 'x.x.x.x',
        session_id: 'xxx-xx-xx-xxx',
    };
    return log;
};


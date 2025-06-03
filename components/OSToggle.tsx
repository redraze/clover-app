import { useState } from "react";
import uuid from 'react-native-uuid';
import { useSessionContext } from "@/state/SessionContext";
import { useToaster } from '@/state/ToastContext';
import { useLogsContext } from "@/state/LogsContext";
import { formatLogEvent } from "@/lib/logger";

import { Text, View } from "react-native";
import Switch from "./Switch";

import { TokenType } from "@/types/types";


export default function OSToggle({ initialValue, OS, id, region, state }: any) {
    const token: TokenType = useSessionContext((state: any) => state.token);
    const toaster = useToaster((state: any) => state.toaster);
    const pushLog = useLogsContext((state: any) => state.pushLog);

    const [value, setValue] = useState(initialValue);

    const onToggle = async () => {
        console.log(OS)
        if (token.role !== 'admin') {
            toaster("Insufficient Permissions.");
            return;
        };

        // send API mutation
        // await callTowerOSAccessAPI({ token, ... });

        // update local cache
        setValue(!value);

        // update local logs cache
        const status = value ? 'disabled' : 'enabled';
        const action = `${OS} access ${status} for tower { id: ${id}, region: ${region}, state: ${state}}`
        const log = formatLogEvent(action);
        pushLog(log);
    };

    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }} key={uuid.v4()}>
            <Switch value={value} onToggle={onToggle} />
            <Text style={{ marginLeft: 10 }}>{OS}</Text>
        </View>
    )
}
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table"
import uuid from 'react-native-uuid';
import { ScrollView } from "react-native";
import { useEffect } from "react";
import { useLogsContext } from "@/state/LogsContext";
import { LogType } from "@/types/types";
import { callLogsAPI } from "@/lib/requests";

export default function LogStream() {
    const logs: LogType[] = useLogsContext((state: any) => state.logs);
    const setLogs = useLogsContext((state: any) => state.setLogs);

    useEffect(() => {
        (async () => {
            const { data } = await callLogsAPI();
            setLogs(data);
        })();
    }, []);

    return (<ScrollView horizontal={true} contentContainerStyle={{ flex: 1 }}>
        <Table className="w-full">

            { logs && 
                <TableHeader>
                    <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Source IP</TableHead>
                        <TableHead>Session ID</TableHead>
                    </TableRow>
                </TableHeader>
            }

            <TableBody>
                { logs &&
                    logs.map(({ time, action, source_ip, session_id }) => {
                        return (
                            <TableRow key={uuid.v4()}>
                                <TableData style={{ margin: 'auto' }}>{time}</TableData>
                                <TableData style={{ margin: 'auto' }}>{action}</TableData>
                                <TableData style={{ margin: 'auto' }}>{source_ip}</TableData>
                                <TableData style={{ margin: 'auto' }}>{session_id}</TableData>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </ScrollView>);
};

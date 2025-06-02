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
import { LogType } from "@/types/types";

export default function LogStream({ logs }: { logs: LogType[] }) {
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
                { 
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

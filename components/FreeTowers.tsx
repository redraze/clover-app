import { useEffect, useState } from "react";
import uuid from 'react-native-uuid';
import { useLogsContext } from "@/state/LogsContext";
import { callFreeTowersAPI } from "@/lib/requests";
import { useSessionContext } from "@/state/SessionContext";
import { formatLogEvent } from "@/lib/logger";

import { ScrollView } from "react-native";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableData,
} from "@/components/ui/table"
import ContractButton from "./ContractButton";

import { FreeTowerType } from "@/types/types";


export default function FreeTowers() {
    const token = useSessionContext((state: any) => state.token);
    const pushLog = useLogsContext((state: any) => state.pushLog);

    const [freeTowers, setFreeTowers] = useState<FreeTowerType>();
    
    useEffect(() => {
        (async () => {
            const { data } = await callFreeTowersAPI(token);
            setFreeTowers(data);
        })();
    }, []);

    const logEvent = (action: string) => {
        const log = formatLogEvent(action);
        pushLog(log);
    };

    return (<ScrollView horizontal={true} contentContainerStyle={{ flex: 1 }}>
        <Table className="w-full">

            { freeTowers && 
                <TableHeader>
                    <TableRow>
                        <TableHead>Region</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Contract Status</TableHead>
                    </TableRow>
                </TableHeader>
            }

            <TableBody>
                { freeTowers
                    ? Object.entries(freeTowers).map(([ id, { region, state } ]) => {
                        return (
                            <TableRow key={uuid.v4()}>
                                <TableData style={{ margin: 'auto' }}>{region}</TableData>
                                <TableData style={{ margin: 'auto' }}>{state}</TableData>
                                <TableData>
                                    <ContractButton id={id} region={region} state={state} logEvent={logEvent} />
                                </TableData>
                            </TableRow>
                        )
                    })
                    : <TableRow>
                        <TableData>No Free Towers</TableData>
                    </TableRow>
                }
            </TableBody>
        </Table>
    </ScrollView>);
};

import { useEffect, useState } from "react";
import uuid from 'react-native-uuid';
import { useSessionContext } from "@/state/SessionContext";
import { callContractTowersAPI } from "@/lib/requests";
import { formatLogEvent } from "@/lib/logger";
import { useLogsContext } from "@/state/LogsContext";

import { ScrollView } from "react-native";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableData,
} from "@/components/ui/table"
import OSToggle from "./OSToggle";

import { ContractedTowerType, TokenType } from "@/types/types";


export default function ContractedTowers() {
    const token: TokenType = useSessionContext((state: any) => state.token);
    const pushLog = useLogsContext((state: any) => state.pushLog);

    const [contractedTowers, setContractedTowers] = useState<ContractedTowerType>();
    
    useEffect(() => {
        (async () => {
            const { data } = await callContractTowersAPI(token);
            setContractedTowers(data)
        })();
    }, []);

    // mutate local log state
    const logEvent = (action: string) => {
        const log = formatLogEvent(action);
        pushLog(log);
    };

    const onToggle = async (OS: string, value: boolean, id: string, region: string, state: string) => {
        if (token.role !== 'admin') return;
        // await callTowerOSAccessAPI({ token, ... });

        // update local logs cache
        const status = value ? 'disabled' : 'enabled';
        logEvent(`${OS} access ${status} for tower { id: ${id}, region: ${region}, state: ${state}}`)
    };

    return (<ScrollView horizontal={true} contentContainerStyle={{ flex: 1 }}>
        <Table className="w-full">

            { contractedTowers && 
                <TableHeader>
                    <TableRow>
                        <TableHead>Region</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>OS Access</TableHead>
                    </TableRow>
                </TableHeader>
            }

            <TableBody>
                { contractedTowers
                    ? Object.entries(contractedTowers).map(([ id, { allowedOS, region, state } ]) => {
                        return (
                            <TableRow key={uuid.v4()}>
                                <TableData style={{ margin: 'auto' }}>{region}</TableData>
                                <TableData style={{ margin: 'auto' }}>{state}</TableData>
                                <TableData style={{ margin: 'auto' }}>
                                    {
                                        ['web', 'iOS', 'android'].map((OS) => {
                                            const allowed = allowedOS[OS];
                                            return (
                                                <OSToggle
                                                    key={uuid.v4()}
                                                    initialValue={allowed}
                                                    onToggle={onToggle}
                                                    OS={OS}
                                                    id={id}
                                                    region={region}
                                                    state={state}
                                                />
                                            );
                                        })
                                    }
                                </TableData>
                            </TableRow>
                        )
                    })
                    : <TableRow>
                        <TableData>No Contracted Towers</TableData>
                    </TableRow>
                }
            </TableBody>
        </Table>
    </ScrollView>);
};

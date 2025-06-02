import { FreeTowerType, TokenType } from "@/types/types";
import { useEffect, useState } from "react";
import { useSessionContext } from "@/state/SessionContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table"
import { Button, ButtonText } from "@/components/ui/button"
import uuid from 'react-native-uuid';
import { ScrollView } from "react-native";
import { formatLogEvent } from "@/lib/logger";
import { useLogsContext } from "@/state/LogsContext";
import { callFreeTowersAPI } from "@/lib/requests";

export default function FreeTowers() {
    const token = useSessionContext((state: any) => state.token);
    const pushLog = useLogsContext((state: any) => state.pushLog);

    const [freeTowers, setFreeTowers] = useState<FreeTowerType>();
    
    useEffect(() => {
        (async () => {
            const { data } = await callFreeTowersAPI(token);
            setFreeTowers(data)
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

function ContractButton({ id, region, state, logEvent }: any) {
    const token: TokenType = useSessionContext((state: any) => state.token);
    const [text, setText] = useState('Start Contract');
    const [disabled, setDisabled] = useState(false)

    const sendRequest = async () => {
        if (token.role !== 'admin') return;

        // await sendTowerContractRequestAPI(id);
        setText('Request Sent!');
        setDisabled(true);

        // update local logs cache
        logEvent(`Contract requested with tower { id: ${id}, region: ${region}, state: ${state}}`)
    };

    return (
        <Button size="md" variant={ disabled ? "solid" : "outline"} action="primary" onPress={sendRequest} disabled={disabled}>
            <ButtonText>{text}</ButtonText>
        </Button>
    );
};

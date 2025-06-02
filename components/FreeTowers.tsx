import { FreeTowerType, LogType, TokenType } from "@/types/types";
import { towers } from '@/dummyData/towers.json';
import { contracts } from '@/dummyData/contracts.json';
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

const callContractTowersApi = async (token: TokenType) => {
    const towerData: FreeTowerType = {};

    contracts.forEach(({ enterprise_id, tower_id }) => {
        if (token.enterprise_id === enterprise_id) {
            towerData[tower_id] = { 
                ...towerData[tower_id],
            };
        };
    });

    towers.forEach(({ id, region, state }) => {
        if (id !in towerData) {
            towerData[id] = {
                ...towerData[id],
                region,
                state,
            }
        }
    })

    return { data: towerData }
};

export default function FreeTowers() {
    const token = useSessionContext((state: any) => state.token);
    const pushLog = useLogsContext((state: any) => state.pushLog);

    const [freeTowers, setFreeTowers] = useState<FreeTowerType>();
    
    useEffect(() => {
        (async () => {
            const { data } = await callContractTowersApi(token);
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
    const [text, setText] = useState('Start Contract');
    const [disabled, setDisabled] = useState(false)

    const sendRequest = async () => {
        // TODO: conditionally call mutation API based on role

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

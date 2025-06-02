import { ContractedTowerType, LogType, TokenType } from "@/types/types";
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
import { Pressable, ScrollView, Text, View } from "react-native";
import Switch from "./Switch";
import uuid from 'react-native-uuid';
import { formatLogEvent } from "@/lib/logger";
import { useLogsContext } from "@/state/LogsContext";

const callContractTowersApi = async (token: TokenType) => {
    const towerData: ContractedTowerType = {};

    contracts.forEach(({ enterprise_id, tower_id, allowedOS }) => {
        if (token.enterprise_id === enterprise_id) {
            towerData[tower_id] = { 
                ...towerData[tower_id],
                allowedOS,
            };
        };
    });

    towers.forEach(({ id, region, state }) => {
        if (id in towerData) {
            towerData[id] = {
                ...towerData[id],
                region,
                state,
            }
        }
    })

    return { data: towerData }
};

export default function ContractedTowers() {
    const token = useSessionContext((state: any) => state.token);
    const pushLog = useLogsContext((state: any) => state.pushLog);

    const [contractedTowers, setContractedTowers] = useState<ContractedTowerType>();
    
    useEffect(() => {
        (async () => {
            const { data } = await callContractTowersApi(token);
            setContractedTowers(data)
        })();
    }, []);

    const logEvent = (action: string) => {
        const log = formatLogEvent(action);
        pushLog(log);
    };

    const onToggle = async (OS: string, value: boolean, id: string, region: string, state: string) => {
        // TODO: conditionally call mutation API based on role
        // await callTowerOSAccessAPI({ ... });

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

function OSToggle({ initialValue, onToggle, OS, id, region, state}: any) {
    const [value, setValue] = useState(initialValue);

    const onPress = () => {
        onToggle(OS, value, id, region, state);
        setValue(!value);
    }

    return (
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }} key={uuid.v4()}>
            <Pressable onPress={onPress}>
                <Switch defaultValue={value} />
            </Pressable>
            <Text style={{ marginLeft: 10 }}>{OS}</Text>
        </View>
    )
}
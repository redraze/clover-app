import { ContractedTowerType, TokenType } from "@/types/types";
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
import { ScrollView, Text, View } from "react-native";
import Switch from "./Switch";
import uuid from 'react-native-uuid';

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

    const [contractedTowers, setContractedTowers] = useState<ContractedTowerType>();
    
    useEffect(() => {
        (async () => {
            const { data } = await callContractTowersApi(token);
            setContractedTowers(data)
        })();
    }, []);

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
                                                <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }} key={uuid.v4()}>
                                                    <Switch 
                                                        defaultValue={!allowed}
                                                        // TODO: conditionally call mutation API based on role
                                                        // onToggle={() => {}}
                                                    />
                                                    <Text style={{ marginLeft: 10 }}>{OS}</Text>
                                                </View>
                                            )
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

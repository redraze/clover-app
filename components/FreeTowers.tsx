import { FreeTowerType, TokenType } from "@/types/types";
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

    const [freeTowers, setFreeTowers] = useState<FreeTowerType>();
    
    useEffect(() => {
        (async () => {
            const { data } = await callContractTowersApi(token);
            setFreeTowers(data)
        })();
    }, []);

    return (<>
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
                            <TableRow>
                                <TableData>{region}</TableData>
                                <TableData>{state}</TableData>
                                <TableData>
                                    <ContractButton id={id} />
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
    </>);
};

function ContractButton({ id }: any) {
    const [text, setText] = useState('Start Contract');
    const [disabled, setDisabled] = useState(false)

    const sendRequest = () => {
        // await sendTowerContractRequestAPI(id);
        setText('Request Sent!');
        setDisabled(true);
    };

    return (
        <Button size="md" variant="solid" action="primary" onPress={sendRequest} disabled={disabled}>
            <ButtonText>{text}</ButtonText>
        </Button>
    );
};

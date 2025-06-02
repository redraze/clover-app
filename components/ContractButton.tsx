import { useState } from "react";
import { useSessionContext } from "@/state/SessionContext";
import { Button, ButtonText } from "@/components/ui/button"

import { TokenType } from "@/types/types";


export default function ContractButton({ id, region, state, logEvent }: any) {
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

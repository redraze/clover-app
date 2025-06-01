import {
    Select,
    SelectTrigger,
    SelectIcon,
    SelectInput, 
    SelectPortal, 
    SelectBackdrop, 
    SelectContent, 
    SelectDragIndicator, 
    SelectDragIndicatorWrapper, 
    SelectItem 
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon"
import { Platform, View } from "react-native";

const web = Platform.OS === 'web';

export function UserDrowpdown({ setUser, formState }: any) {
    const onValueChange = (e: string) => {
        const user = JSON.parse(e);
        setUser(user);
    }

    return (
        <Select onValueChange={onValueChange} isDisabled={formState === 'signup'}>
            {
                // separated styles because of an issue with gluestackui SelectInput component
                web
                    ? <SelectTrigger variant="outline" size="xl">
                            <SelectInput placeholder="Select Login"/>
                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                    </SelectTrigger>

                    : <SelectTrigger variant="outline" size="xl" style={{ flex: 1, flexDirection: 'row', marginBottom: 10, padding: 20 }}>
                        <View style={{ height: 50 }}>
                            <SelectInput placeholder="Select Login"/>
                        </View>
                        { web ? <SelectIcon className="mr-3" as={ChevronDownIcon} /> : <></> }
                    </SelectTrigger>
            }

            <SelectPortal>
                <SelectBackdrop/>
                <SelectContent>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>

                    <SelectItem label="AT&T (admin)" value={'{"name":"at&t", "role":"admin"}'} />
                    <SelectItem label="AT&T (non-admin)" value={'{"name":"at&t", "role":"non-admin"}'} />
                    <SelectItem label="Verizon (admin)" value={'{"name":"verizon", "role":"admin"}'} />
                    <SelectItem label="T-Mobile (non-admin)" value={'{"name":"t-mobile", "role":"non-admin"}'} />
                </SelectContent>
            </SelectPortal>
        </Select>
    );
}
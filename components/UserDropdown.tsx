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
import { logins } from '@/dummyData/logins.json';
import uuid from 'react-native-uuid';

const web = Platform.OS === 'web';

export function UserDrowpdown({ setUser, formState }: any) {
    const onValueChange = (e: string) => {
        const user = JSON.parse(e);
        setUser(user);
    }

    return (
        <Select onValueChange={onValueChange} isDisabled={formState === 'signup'}>
            <View style={{ height: 50, marginBottom: 10 }}>
                <SelectTrigger variant="outline" size="xl" style={!web && { flex: 1, flexDirection: 'row' }}>
                    <SelectInput placeholder={ formState === 'login' ? "Select Login" : "username" }/>
                    { formState === 'login' && 
                        <SelectIcon className="mr-3" as={ChevronDownIcon} style={!web && { marginLeft: 'auto' }}/>
                    }
                </SelectTrigger>
            </View>

            <SelectPortal>
                <SelectBackdrop/>
                <SelectContent>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>

                    {
                        logins.map(({ name, enterprise, role }) => {
                            return (
                                <SelectItem 
                                    key={uuid.v4()}
                                    label={name} 
                                    value={`{"name":"${name}", "enterprise":"${enterprise}", "role":"${role}"}`} 
                                />
                            );
                        })
                    }
                </SelectContent>
            </SelectPortal>
        </Select>
    );
}

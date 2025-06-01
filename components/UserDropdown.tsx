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
import data from '@/dummyData/logins.json';

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
                        data.logins.map(({ user, name, role }) => {
                            return (
                                <SelectItem 
                                    label={user} 
                                    value={`{"name":"${name}", "role":"${role}"}`} 
                                />
                            );
                        })
                    }

                    {/* <SelectItem label="AT&T (admin)" value={'{"name":"at&t", "role":"admin"}'} />
                    <SelectItem label="AT&T (non-admin)" value={'{"name":"at&t", "role":"non-admin"}'} />
                    <SelectItem label="Verizon (admin)" value={'{"name":"verizon", "role":"admin"}'} />
                    <SelectItem label="T-Mobile (non-admin)" value={'{"name":"t-mobile", "role":"non-admin"}'} /> */}
                </SelectContent>
            </SelectPortal>
        </Select>
    );
}

import { useState } from "react";
import uuid from 'react-native-uuid';

import { Pressable, Text, View } from "react-native";
import Switch from "./Switch";


export default function OSToggle({ initialValue, onToggle, OS, id, region, state}: any) {
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
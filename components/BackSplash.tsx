import { Image, Text, View } from "react-native";

export default function BackSplash() {
    return (
        <View style={{ height: 250, width: '100%' }}>
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 'auto' }}>
            <View style={{ margin: 'auto' }}>
                <Image 
                    style={{ height: 80, width: 80 }}
                    source={require('@/assets/tower.png')}
                />
            </View>

            <Text style={{ fontSize: 35, marginLeft: 20, marginVertical: 'auto' }}>Tower Comm</Text>
            </View>
        </View>
    );
};

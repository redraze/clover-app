import { Text, View } from 'react-native';
import LogStream from '@/components/LogStream';


export default function LogsWidget() {
    return (
        <View style={{  margin: 15, backgroundColor: '#121212', borderRadius: 10 }}>

            {/* header */}
            <View style={{ flexDirection:'row', alignItems: 'center', margin: 15 }}>
                <Text style={{ marginLeft: 25, color: 'white', fontSize: 24 }}>Access Logs</Text>
            </View>

            <LogStream />
        </View>
    )
}
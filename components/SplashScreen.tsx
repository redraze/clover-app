import { Box } from "@/components/ui/box"
import { Skeleton } from '@/components/ui/skeleton';
import { Image, View } from "react-native";

export default function SplashScreen() {
    return (
        <Box className="gap-2" style={{ flex: 1 }} >
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, alignItems: 'center' }}>
                <Skeleton variant="rounded" style={{ backgroundColor: 'grey', flex: 1, margin: 10, height: 30, width: 30 }} />
                <Skeleton variant="rounded" style={{ backgroundColor: 'grey', flex: 1, margin: 10, height: 30, width: 30 }} />
                <View style={{ margin: 'auto' }}>
                    <Image 
                        style={{ height: 80, width: 80 }}
                        source={require('@/assets/tower.png')}
                    />
                </View>
                <Skeleton variant="rounded" style={{ backgroundColor: 'grey', flex: 1, margin: 10, height: 30, width: 30 }} />
                <Skeleton variant="rounded" style={{ backgroundColor: 'grey', flex: 1, margin: 10, height: 30, width: 30 }} />
            </View>
        </Box>
    )
}

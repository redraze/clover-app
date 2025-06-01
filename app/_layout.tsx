import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Platform } from 'react-native';
import { GluestackUIProvider as GlueNative } from '@/components/ui/gluestack-ui-provider';
import { GluestackUIProvider as GlueWeb } from '@/components/ui/gluestack-ui-provider/index.web';
import "../global.css";
import { useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import { useSessionContext } from '@/state/SessionContext';

const GlueStackUIProvider = Platform.OS === 'web' ? GlueWeb : GlueNative

export default function RootLayout() {
  const token = useSessionContext((state: any) => state.token);
  const loading = useSessionContext((state: any) => state.loading);
  const setLoading = useSessionContext((state: any) => state.setLoading);

  // spoof loading effect
  useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
    }, 1500);
  }, [loading]);
  
  if (loading) return <SplashScreen />
  return (
    <GlueStackUIProvider>
      <Stack>

        <Stack.Protected guard={!token}>
          {/* login/signup screen */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!!token}>
          {/* dashboard */}
          <Stack.Screen name="private/index" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>

      <StatusBar style="auto" />
    </GlueStackUIProvider>
  );
}

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Platform } from 'react-native';
import { GluestackUIProvider as GlueNative } from '@/components/ui/gluestack-ui-provider';
import { GluestackUIProvider as GlueWeb } from '@/components/ui/gluestack-ui-provider/index.web';
import "../global.css";

const GlueStackUIProvider = Platform.OS === 'web' ? GlueWeb : GlueNative

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // TODO get login state from local storage
  const isLoggedIn = false;

  return (
    <GlueStackUIProvider>
      <Stack>

        <Stack.Protected guard={!isLoggedIn}>
          {/* login/signup screen */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          {/* dashboard */}
          <Stack.Screen name="private/index" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>

      <StatusBar style="auto" />
    </GlueStackUIProvider>
  );
}

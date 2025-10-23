import { useFonts } from "expo-font";
import { createTamagui, PortalProvider, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";
import { useEffect } from "react";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "jomhuria-regular": require("../assets/fonts/Jomhuria-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <PortalProvider>
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
      </PortalProvider>
    </TamaguiProvider>
  );
}

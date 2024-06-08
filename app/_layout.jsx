import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function Layout() {
  const [fontLoaded] = useFonts({
    DMBOLD: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);
  if (!fontLoaded) return null;

  return <Stack onLayout={onLayoutRootView} />;
}

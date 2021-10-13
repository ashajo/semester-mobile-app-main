import "react-native-gesture-handler";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black, } from "@expo-google-fonts/inter";

import { RootNavigation } from "./src/navigation/";
import { UserProvider, WorkspaceProvider } from "./src/context";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <UserProvider>
      <WorkspaceProvider>
        <RootNavigation />
      </WorkspaceProvider>
    </UserProvider>
  );
}

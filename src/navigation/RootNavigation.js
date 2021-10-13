import "react-native-gesture-handler";
import React, { useEffect, useState, useCallback, useContext } from "react";
import * as SplashScreen from "expo-splash-screen";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { OnboardingNavigation } from "./OnboardingNavigation";
import { UserNavigation } from "./UserNavigation";
import LoginScreen from "../screens/auth/LoginScreen";

import { checkIfFirstLaunch } from "../api/actions";
import { storedAppUser } from "../api/storage";
import { UserContext } from "../context";

const RootStack = createStackNavigator();

export const RootNavigation = () => {
  const { state: user, updateUserCtx } = useContext(UserContext);

  const [isAppReady, setIsAppReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState();
  const [initialRoute, setInitialRoute] = useState("UserHome");

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // pre-load events (API calls, etc.)
        let firstLaunch = null;
        firstLaunch = await checkIfFirstLaunch();

        if (firstLaunch) {
          setIsFirstLaunch(firstLaunch);
        } else {
          let storedUser = null;
          storedUser = await storedAppUser();

          if (storedUser) {
            updateUserCtx("init", storedUser);

            if (!storedUser.signedIn) {
              setInitialRoute("Login");
            }
          }
        }
      } catch (error) {
        // handle error
      } finally {
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const onReadyRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onReadyRootView}>
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {isFirstLaunch && (
          <RootStack.Screen
            name="Onboarding"
            component={OnboardingNavigation}
          />
        )}
        <RootStack.Screen name="UserHome" component={UserNavigation} />
        <RootStack.Screen name="Login" component={LoginScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { InfoSlideshow, FindWorkspaceScreen, AddNameScreen, AddEmailScreen } from "../screens/onboarding";
import { primary } from "../styles/colors";

const OnboardingStack = createStackNavigator();

const backArrow = () => (
  <MaterialCommunityIcons
    name="chevron-left-circle"
    size={48}
    color={primary}
  />
);

const headerOptions = {
  title: "Gå tillbaka",
  headerTitleAlign: "left",
  headerBackImage: backArrow,
  headerBackTitle: " ",
  headerStyle: {
    height: 120,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontSize: 24,
  },
  cardShadowEnabled: false,
  cardOverlayEnabled: false,
};

export const OnboardingNavigation = () =>{
  return (
    <OnboardingStack.Navigator initialRouteName="Slideshow" screenOptions={headerOptions}>
      <OnboardingStack.Screen name="Slideshow" component={InfoSlideshow} options={{headerShown: false}} />
      <OnboardingStack.Screen name="FindWorkspace" component={FindWorkspaceScreen} options={{headerShown: false}} />
      <OnboardingStack.Screen name="AddName" component={AddNameScreen} />
      <OnboardingStack.Screen name="AddEmail" component={AddEmailScreen} />
    </OnboardingStack.Navigator>
  );
}

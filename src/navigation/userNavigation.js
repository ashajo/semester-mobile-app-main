import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { WorkspaceContext, UserContext, initializeWorkspace } from "../context";
import { getUserColor } from "../utils/setUserColors";
import { OverviewScreen, ProfileScreen } from "../screens/user";
import * as Colors from "../styles/colors";

const TabStack = createBottomTabNavigator();

export const UserNavigation = () => {
  const { state: user, updateUserCtx } = useContext(UserContext);
  const { state: workspace, updateWorkspaceCtx } = useContext(WorkspaceContext);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function prepare() {
      const workspaceCtx = await initializeWorkspace(user.companyId);

      if (workspaceCtx.employees.length !== 0) {
        updateWorkspaceCtx("init", workspaceCtx);
      } else {
        setError(true);
      }
      
      setIsReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    if (workspace.employees) {
      const userColor = getUserColor(workspace.employees, user.employeeId);
      updateUserCtx("color", userColor);
    }
  }, [workspace.employees]);

  if (!isReady) {
    return null;
  }

  return (
    <TabStack.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: Colors.secondary,
        activeBackgroundColor: Colors.background,
        inactiveTintColor: Colors.primary,
        style: { ...styles.tabBar },
        tabStyle: { ...styles.tab },
      }}
    >
      <TabStack.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={36}
              color={color}
            />
          ),
        }}
        initialParams={{error: error}}
      />

      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={36} color={color} />
          ),
        }}
        initialParams={{error: error}}
      />
    </TabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 62,
    borderWidth: 0,
    backgroundColor: Colors.inactiveBackground,
  },
  tab: {
    height: 58,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.textLight,
    borderStyle: "solid",
  },
});

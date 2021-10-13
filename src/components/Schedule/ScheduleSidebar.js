import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { RoundBackground } from "../RoundBackground";
import * as Colors from "../../styles/colors";
import { WorkspaceContext } from "../../context";

export function ScheduleSidebar() {
  const { state: workspace } = useContext(WorkspaceContext);

  return (
    <View style={styles.verticalHeader}>
      <FlatList
        data={workspace.employees}
        keyExtractor={employee => employee.employeeId}
        renderItem={({item: employee}) => {
          return (
            <View style={styles.icon}>
              <RoundBackground largeStyle color={employee.color}>
                {employee.firstName[0]}
                {employee.lastName[0]}
              </RoundBackground>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  verticalHeader: {
    width: 70,
    paddingTop: 106,
    height: "100%",
    position: "absolute",
    zIndex: 10,
  },
  icon: {
    height: 66,
    margin: 2,
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
});



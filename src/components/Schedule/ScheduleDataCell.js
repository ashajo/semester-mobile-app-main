import React from "react";
import { StyleSheet, View } from "react-native";

export function ScheduleDataCell({ color, content, index }) {
  let conditional = {};
  const rowColor = color;
  const fadedColor = rowColor.replace("1)", "0.3)");

  if (index % 7 === 0) {
    conditional = {
      borderStyle: "solid",
      borderLeftColor: "#eee",
      borderLeftWidth: 1,
    };
  }

  let bar = {};

  if (content) {
    switch (content) {
      case "VACATION":
      case "vacation":
        bar = {
          backgroundColor: rowColor,
        };
        break;
      case "PARENTAL":
      case "parental":
        bar = {
          backgroundColor: fadedColor,
          borderColor: rowColor,
          borderStyle: "solid",
          borderLeftWidth: 2,
        };
        break;
    }
  }

  return (
    <View style={[styles.tablerow, conditional]}>
      <View style={[bar, { height: 20, width: 5 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  tablerow: {
    justifyContent: "center",
    height: 71,
  },
});

import React from "react";
import { StyleSheet, Text, } from "react-native";

import * as Spacing from "../../styles/spacing";
import * as Colors from "../../styles/colors";

export function ScheduleHeaderWeeks({content}) {
  let conditional = {};

  if (content.id % 4 === 0) {
    conditional = {    
      borderStyle: "solid",
      borderLeftColor: "#eee",
      color: Colors.textDark,
      borderLeftWidth: 1,
    };
  }

  return (
    <Text style={[styles.tableheadingWeeks, conditional, {width: 36,}]}>{content.title}</Text>
  );
}

const styles = StyleSheet.create({
  tableheadingWeeks: {
    paddingTop: Spacing.largeSpacing,    
    color: "transparent",
  },
});
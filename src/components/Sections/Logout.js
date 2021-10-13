import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { rowFlexStart, section, subheading } from "../../styles";
import { textDark } from "../../styles/colors";
import { defaultSpacing } from "../../styles/spacing";

export const Logout = () => {
  return (
    <View style={[styles.section, styles.row]}>
      <MaterialCommunityIcons name="exit-to-app" size={36} color={textDark} />
      <Text style={[styles.heading]}>Logga ut</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    ...section,
  },
  row: {
    ...rowFlexStart,
  },
  heading: {
    ...subheading,
    marginVertical: defaultSpacing,
    marginStart: defaultSpacing,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { section, pageHeading } from "../../styles";

export const LogoHeader = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>app logo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    ...section,
  },
  heading: {
    ...pageHeading,
  },
});

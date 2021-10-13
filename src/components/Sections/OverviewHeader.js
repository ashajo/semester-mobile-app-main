import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { section, borderTop, borderBottom, pageHeading, centerAll } from "../../styles"; 
import { strong } from "../../styles/typography";

export const OverviewHeader = () => {

  return (
    <View style={[styles.section]}>
      <Text style={styles.heading}>Översikt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    ...section,
    ...borderTop,
    ...borderBottom,
    ...centerAll,
  },
  heading: {
    ...pageHeading,
  },
});

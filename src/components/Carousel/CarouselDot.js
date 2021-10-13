import React from "react";
import { View, StyleSheet } from "react-native";

import { primary, primaryInactive } from "../../styles/colors";
import { narrowSpacing } from "../../styles/spacing";

export const CarouselDot = ({ isActive }) => {
  return (
    <View
      style={[
        styles.paginationDot,
        isActive ? styles.paginationDotActive : styles.paginationDotInactive,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  paginationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: narrowSpacing,
  },
  paginationDotActive: {
    backgroundColor: primary,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  paginationDotInactive: {
    backgroundColor: primaryInactive,
  },
});

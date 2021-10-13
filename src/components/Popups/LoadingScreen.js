import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { overlayPage, strongText, textLink } from "../../styles";
import { secondary } from "../../styles/colors";
import { largeSpacing, xLargeSpacing } from "../../styles/spacing";

export const LoadingScreen = ({
  loadingMessage,
  cancelMessage,
  cancelRequest,
}) => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={secondary} />

      <Text style={styles.text}>{loadingMessage}</Text>

      <TouchableOpacity style={styles.link} onPress={cancelRequest}>
        <Text style={styles.linkText}>{cancelMessage}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...overlayPage,
  },
  text: {
    ...strongText,
  },
  link: {
    marginVertical: largeSpacing,
    padding: xLargeSpacing,
  },
  linkText: {
    ...textLink,
  },
});

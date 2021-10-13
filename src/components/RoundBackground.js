import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { borderFull, centerAll, fineprint, subheading } from "../styles";
import { primary, textDark, WHITE } from "../styles/colors";
import { defaultSpacing, narrowSpacing } from "../styles/spacing";

export function RoundBackground({ children, largeStyle, color, vacation }) {
  const [formatting, setFormatting] = useState({});

  useEffect(() => {
    if (!color) {
      color = primary;
    }

    // getting the color updated takes a second in Schedule Table,
    // even from start-up, so we'll need a loading screen to hold
    // the rendering of the RoundBackground elements, eventually.
    const fadedColor = color.replace("1)", "0.3)");

    if (largeStyle) {
      setFormatting({
        background: {
          ...styles.largeStyleBackground,
          backgroundColor: color,
        },
        text: {
          ...styles.largeStyleText,
          color: WHITE,
        },
      });
    } else {
      if (vacation) {
        setFormatting({
          background: {
            ...styles.smallStyleBackground,
            backgroundColor: color,
            borderColor: color,
          },
          text: {
            ...styles.smallStyleText,
            color: WHITE,
          }
        });
      } else {
          setFormatting({
            background: {
              ...styles.smallStyleBackground,
              backgroundColor: fadedColor,
              borderColor: color,
            },
            text: {
              ...styles.smallStyleText,
              color: textDark
            }
        })
      }
    }
  }, [color]);

  return (
    <View style={[styles.base, formatting.background, formatting.colors]}>
      <Text style={[styles.text, formatting.text]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    ...centerAll,
    marginHorizontal: narrowSpacing,
  },
  largeStyleBackground: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  smallStyleBackground: {
    ...borderFull,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
  },
  text: {
    // specify type of text, probably main text
    marginVertical: defaultSpacing,
    color: WHITE,
  },
  largeStyleText: {
    ...subheading,
  },
  smallStyleText: {
    ...fineprint,
  },
});

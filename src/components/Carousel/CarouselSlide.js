import React from "react";
import { Dimensions, View, Image, Text, StyleSheet, } from "react-native";

import { slideHeading, mainText } from "../../styles";
import { xLargeSpacing } from "../../styles/spacing";

const { width: windowWidth } = Dimensions.get("window");
const imgDimension = windowWidth * 0.9;

export const CarouselSlide = ({ data }) => {
  return (
    <View style={styles.slide}>
      <Image source={{ uri: data.imgFile }} style={styles.image}></Image>
      <View>
        <Text style={styles.slideHeading}>{data.heading}</Text>
        <Text style={styles.text}>{data.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: windowWidth,
    paddingHorizontal: xLargeSpacing,
    alignItems: "center",
  },
  slideHeading: {
    ...slideHeading,
  },
  text: {
    ...mainText,
  },
  image: {
    width: imgDimension,
    height: imgDimension,
  },
});

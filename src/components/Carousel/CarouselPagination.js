import React from "react";
import { View, StyleSheet } from "react-native";

import { CarouselDot } from "./CarouselDot";
import { rowFlexStart } from "../../styles";

export const CarouselPagination = ({ index, slideshowLength }) => {
  const getCarouselDots = () => {
    const dots = [];
    let i = 0;

    while (i < slideshowLength) {
      const active = index === i ? true : false;
      const currentDot = <CarouselDot key={i} isActive={active} />;
      dots.push(currentDot);
      i++;
    }

    return dots;
  };

  return (
    <View style={styles.pagination} pointerEvents="none">
      {getCarouselDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    ...rowFlexStart,
    width: "75%",
  },
});

import React, { useState, useRef, useCallback } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { CarouselSlide } from "./CarouselSlide";
import { CarouselPagination } from "./CarouselPagination";

import { rowSpaceBetween } from "../../styles";
import { primary } from "../../styles/colors";
import { largeSpacing, xLargeSpacing } from "../../styles/spacing";

export const Carousel = ({ slides, onChevronPress }) => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);

  indexRef.current = index;

  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle of the transition.
    // With this we have to scroll a bit more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  return (
    <>
      <FlatList
        data={slides}
        style={{ height: "70%" }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item }) => {
          return <CarouselSlide data={item} />;
        }}
      />

      <View style={styles.navigation}>
        <CarouselPagination index={index} slideshowLength={slides.length} />

        <TouchableOpacity onPress={onChevronPress}>
          <MaterialCommunityIcons
            name="chevron-right-circle"
            size={60}
            color={primary}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navigation: {
    ...rowSpaceBetween,
    paddingBottom: largeSpacing,
    paddingHorizontal: xLargeSpacing,
  },
});

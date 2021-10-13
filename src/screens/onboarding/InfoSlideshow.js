import React from "react";
import { SafeAreaView, Text, StyleSheet, } from "react-native";

import { Carousel } from "../../components";
import { pageCenter, pageHeading} from "../../styles";
import { slides } from "../../data/slides"


export const InfoSlideshow = ({ navigation }) => {
  const closeSlideshow = () => {
    navigation.navigate("FindWorkspace");
  };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.heading}>app namn</Text>
      <Carousel slides={slides} onChevronPress={closeSlideshow} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    ...pageCenter,
    paddingHorizontal: 0,
    paddingTop: 120,
  },
  heading: {
    ...pageHeading,
  },
});

import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { UserContext } from "../../context";
import { RoundBackground } from "../RoundBackground";

import {
  borderBottom,
  fineprint,
  rowFlexStart,
  section,
  subheading,
} from "../../styles";
import { textDark } from "../../styles/colors";
import { defaultSpacing, largeSpacing } from "../../styles/spacing";
import { useState } from "react";

// todo:
// 
// sort out the logout page.
export const TimeOff = ({ vacationType, calculatedDates }) => {
  const { state: user } = useContext(UserContext);

  const [heading, setHeading] = useState("");

  const [vacation, setVacation] = useState(null);
  const [weeks, setWeeks] = useState(null);
  const [dates, setDates] = useState(null);

  useEffect(() => {
    if (vacationType === "vacation") {
      setHeading("semester");
      setVacation(true);
        setWeeks(calculatedDates.vacationWeeks);
        setDates(calculatedDates.vacationDates);
      
    } else {
      setHeading("föräldraledighet");
      setVacation(false);
        setWeeks(calculatedDates.parentalWeeks);
        setDates(calculatedDates.parentalDates);

    }

  }, [calculatedDates]);

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name="calendar-check"
          size={36}
          color={textDark}
        />
        <Text style={styles.heading}>Din {heading}</Text>
      </View>

      <View style={[styles.row, styles.list]}>
        <Text style={styles.bodyText}>Veckor:</Text>
        <FlatList
          style={{ marginStart: defaultSpacing }}
          horizontal
          data={weeks}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <RoundBackground vacation={vacation} color={user.color}>
              {item}
            </RoundBackground>
          )}
        />
      </View>

      <View style={(styles.section, styles.row)}>
        <Text style={styles.bodyText}>Dagar:</Text>
        <Text style={[styles.fineprint, { color: user.color }]}>{dates}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    ...section,
    ...borderBottom,
  },
  row: {
    ...rowFlexStart,
  },
  list: {
    marginTop: largeSpacing,
  },
  heading: {
    ...subheading,
    marginStart: defaultSpacing,
  },
  bodyText: {
    ...fineprint,
    color: textDark,
    marginVertical: defaultSpacing,
    marginStart: defaultSpacing,
  },
  fineprint: {
    ...fineprint,
    marginStart: largeSpacing,
  },
});

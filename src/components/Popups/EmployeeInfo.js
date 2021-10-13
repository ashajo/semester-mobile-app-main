import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { background, textDark, textLight } from "../../styles/colors";
import { useEffect } from "react/cjs/react.development";

export const EmployeeInfo = ({ hidePopup, data }) => {
  const [fontColorV, setFontColorV] = useState();
  const [fontColorP, setFontColorP] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    
    const prepare = () => {
      if (data.parental === "") {
        setFontColorP(textLight);
      } else {
        setFontColorP(textDark);
      }

      if (data.vacation === "") {
        setFontColorV(textLight);
      } else {
        setFontColorV(textDark);
      }
      setIsReady(true)
    };

    prepare();
  }, [data]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.box}>
      <View style={styles.boxHeader}>
        <View style={[styles.bar, { backgroundColor: data.color }]}></View>
        <TouchableOpacity activeOpacity={1} onPress={hidePopup}>
          <MaterialCommunityIcons name="close" size={14} color={textDark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.nameHeader}>{data.name}</Text>
      <Text style={styles.jobTitle}>{data.jobTitle}</Text>

      <View style={styles.datesSection}>
        <Text style={[styles.datesHeader, { color: fontColorV }]}>
          Semester:
        </Text>
        <Text style={[styles.dates, { color: data.color }]}>
          {data.vacation}
        </Text>
      </View>

      <View style={styles.datesSection}>
        <Text style={[styles.datesHeader, { color: fontColorP }]}>
          Föräldraledighet:
        </Text>
        <Text style={[styles.dates, { color: data.color }]}>
          {data.parental}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: 160,
    width: 250,
    backgroundColor: background,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: textLight,
    borderStyle: "solid",
    borderRadius: 5,
    shadowColor: textLight,
    // elevation only works with Android
    elevation: 5,
    // the following only works with iOS
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  boxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bar: {
    height: 8,
    width: 150,
    borderRadius: 5,
  },
  nameHeader: { marginTop: 10, fontSize: 18, color: textDark },
  jobTitle: {
    marginVertical: 0,
    fontSize: 12,
    color: textDark,
    fontWeight: "bold",
  },
  datesSection: {
    marginTop: 10,
    flexDirection: "row",
  },
  datesHeader: {
    fontSize: 13,
  },
  dates: {
    marginLeft: 10,
    fontSize: 13,
  },
});

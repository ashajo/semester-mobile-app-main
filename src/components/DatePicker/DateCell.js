import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import {
  background,
  primary,
  secondary,
  textDark,
  textLink,
} from "../../styles/colors";
import * as Element from "../../styles";
import {
  defaultSpacing,
  largeSpacing,
  xLargeSpacing,
} from "../../styles/spacing";
import {
  Table,
  Rows,
  Row,
  TableWrapper,
  Cell,
} from "react-native-table-component";

export const DateCell = ({ cellIndex, cellData }) => {
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected((selected) => !selected);
  };

  const date = (data, index) => {
    return (
      <TouchableOpacity onPress={toggleSelected}>
        <View style={styles.dataCell}>
          <Text
            style={[
              styles.dataText,
              selected && { backgroundColor: secondary },
            ]}
          >
            {data}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Cell key={cellIndex} data={date(cellData, cellIndex)} />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
  datepicker: {
    alignItems: "center",
    height: "65%",
    width: "100%",
  },
  calendar: {
    width: "100%",
    height: "100%",
    borderColor: background,
    backgroundColor: background,
  },
  // Tabs
  tabBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginBottom: -1,
  },
  tab: {
    padding: defaultSpacing,
    width: "49.7%",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#efefef",
    borderTopColor: "lightgrey",
  },
  active: {
    backgroundColor: background,
    borderTopColor: primary,
  },
  tabText: {
    alignSelf: "center",
    ...Element.boldText,
    ...Element.fineprint,
  },
  tabTextActive: {
    color: textDark,
  },
  // calendar table
  table: {},
  head: {
    // paddingVertical: 5,
  },
  headText: {
    textAlign: "center",
    color: secondary,
    fontSize: 16,
  },
  dataCell: {
    width: "100%",
    padding: 5,
  },
  dataText: {
    padding: 6,
    textAlign: "center",
    borderRadius: 50,
    // backgroundColor: secondary,
    // textAlign: "center",
    // backgroundColor: secondary,
    // borderRadius: 50,
  },
  // buttons
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonMain: {
    ...Element.buttonPrimary,
    margin: defaultSpacing,
    width: "40%",
  },
  buttonSecondary: {
    ...Element.buttonSecondary,
    margin: defaultSpacing,
    width: "40%",
  },
  buttonTextPrimary: {
    ...Element.buttonTextPrimary,
    textAlign: "center",
    textDecorationStyle: "solid",
  },
  buttonTextSecondary: {
    ...Element.buttonTextSecondary,
    textAlign: "center",
    textDecorationStyle: "solid",
  },
});

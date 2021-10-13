import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import * as Element from "../../styles";
import { ScheduleDataCell } from "./ScheduleDataCell";

export function ScheduleRow({ togglePopup, content, index }) {
  return (
    <View style={styles.tablerow}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const dataSet = {};
          dataSet.employeeId = content.employeeId;
          dataSet.color = content.employeeColor;
          dataSet.index = index;
          togglePopup(dataSet);
        }}
      >
        <FlatList
          horizontal
          data={content.daysOff}
          initialNumToRender={10}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ScheduleDataCell
                color={content.employeeColor}
                content={item}
                index={index}
              />
            );
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tablerow: {
    ...Element.row,
    paddingStart: 71,
    height: 71,
    // workaround for {borderBottomStyle: "dashed"} not working,
    borderStyle: "dashed",
    borderRadius: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    margin: -1,
    marginBottom: 0,
  },
});

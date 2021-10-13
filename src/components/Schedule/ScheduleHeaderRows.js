import React from "react";
import { StyleSheet, View, VirtualizedList, Text } from "react-native";

import * as Element from "../../styles";
import * as Spacing from "../../styles/spacing";
import { ScheduleHeaderWeeks } from "./ScheduleHeaderWeeks";

export function ScheduleHeaderRows() {
  const DATA = [];

  const getItem = (data, index) => {
    return {
      id: index + "",
      title: `v${index}`,
    };
  };

  const getItemCount = data => {
    return 53;
  };

  return (
    <>      
      <View style={styles.tablerow}>
        <Text style={[styles.tableheadingMonths, {width: 20}]}></Text>
        <Text style={[styles.tableheadingMonths, {width: 155}]}>JAN</Text>
        <Text style={[styles.tableheadingMonths, {width: 140}]}>FEB</Text>
        <Text style={[styles.tableheadingMonths, {width: 155}]}>MAR</Text>
        <Text style={[styles.tableheadingMonths, {width: 150}]}>APR</Text>
        <Text style={[styles.tableheadingMonths, {width: 155}]}>MAJ</Text>
        <Text style={[styles.tableheadingMonths, {width: 150}]}>JUN</Text>
        <Text style={[styles.tableheadingMonths, {width: 155}]}>JUL</Text>
        <Text style={[styles.tableheadingMonths, {width: 155}]}>AUG</Text>
        <Text style={[styles.tableheadingMonths, {width: 150}]}>SEPT</Text>
        <Text style={[styles.tableheadingMonths, {width: 155}]}>OKT</Text>
        <Text style={[styles.tableheadingMonths, {width: 150}]}>NOV</Text>
        <Text style={[styles.tableheadingMonths, {width: 155}]}>DEC</Text>
        <Text style={[styles.tableheadingMonths, {width: 10}]}></Text>
      </View>
      <View style={[styles.tablerow, {paddingBottom: 0}]}>
        <VirtualizedList
          horizontal
          data={DATA}
          initialNumToRender={53}
          keyExtractor={item => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
          renderItem={({ item }) => <ScheduleHeaderWeeks content={item}/>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tablerow: {
    ...Element.row,
    paddingStart: 72,
    // workaround for {borderBottomStyle: "dashed"} not working,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    margin: -1,
    marginBottom: 0,   
  },
  tableheadingMonths: {
    ...Element.bodyText,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingVertical: Spacing.largeSpacing,
  },
});
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
import { DateCell } from "../DatePicker/DateCell";

export const Calendar = ({ saveData }) => {
  const [vacation, setVacation] = useState(true);
  const [selected, setSelected] = useState(false);

  const toggleVacation = () => {
    setVacation((vacation) => !vacation);
  };

  const toggleSelected = () => {
    setSelected((selected) => !selected);
  };

  const date = (data, index) => {
    return (
      <TouchableOpacity onPress={toggleSelected}>
        <View style={styles.dataCell}>
          <Text style={[styles.dataText, selected && {backgroundColor: secondary}]}>{data}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const tableHead = [["M", "T", "O", "T", "F", "L", "S"]];
  const tableData = [
    ["", "", "", "", "", "", 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, "", "", "", "", ""],
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.datepicker}>
        {/* "Tabs" */}
        <View style={[styles.tabBar]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.tab, vacation && styles.active]}
            onPress={toggleVacation}
          >
            <Text style={[styles.tabText, vacation && styles.tabTextActive]}>
              Semester
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={[styles.tab, !vacation && styles.active]}
            onPress={toggleVacation}
          >
            <Text style={[styles.tabText, !vacation && styles.tabTextActive]}>
              Föräldraledighet
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar block*/}
        <View style={styles.calendar}>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              paddingVertical: defaultSpacing,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>{`<`}</Text>
              <Text style={{ fontSize: 20 }}>Augusti</Text>
              <Text style={{ fontSize: 20 }}>{`>`}</Text>
            </View>

            {/* Table */}
            <Table borderStyle={{ borderWidth: 1, borderColor: "transparent" }} style={styles.table}>

            {tableHead.map((rowData, index) => (
              <TableWrapper key={index} style={{ flexDirection: "row" }}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell key={cellIndex} data={cellData} textStyle={styles.headText}/>
                ))}
              </TableWrapper>
              ))}

              {/* <Row
                data={tableHead}
                style={styles.head}
                
              /> */}

              {tableData.map((rowData, index) => (
                <TableWrapper key={index} style={{ flexDirection: "row" }}>
                  {rowData.map((cellData, cellIndex) => (
                    <DateCell key={cellIndex} cellIndex={cellIndex} cellData={cellData} />
                    // <Cell key={cellIndex} data={date(cellData, cellIndex)} />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={() => saveData(false)}
            >
              <Text style={styles.buttonTextSecondary}>Avbryt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonMain} onPress={() => saveData(true)}>
              <Text style={styles.buttonTextPrimary}>Klar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
  table: {
  },
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

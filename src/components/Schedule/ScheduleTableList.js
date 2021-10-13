import React, { useContext } from "react";
import { useState, useEffect } from "react";

import { StyleSheet, View, FlatList } from "react-native";
import { defaultSpacing } from "../../styles/spacing";

import { ScheduleHeaderRows } from "./ScheduleHeaderRows";
import { ScheduleRow } from "./ScheduleRow";
import { WorkspaceContext } from "../../context";

export function ScheduleTableList({ togglePopup }) {
  const { state: workspace } = useContext(WorkspaceContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (workspace.employees) {
      const newData = convertRowData(workspace.employees);
      setData(newData);
    }
  }, [workspace]);

  return (
    <View style={styles.table}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.employeeId}
        ListHeaderComponent={<ScheduleHeaderRows />}
        renderItem={({ item, index }) => {
          return <ScheduleRow togglePopup={togglePopup} content={item} index={index} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    overflow: "hidden",
    paddingBottom: defaultSpacing,
  },
});

// todo
// refactor these functions to better files
const convertRowData = (employees) => {
  // Find correct no. of days in current year
  const dec31 = new Date(new Date().getFullYear(), 11, 31);
  const yearLength = getDayOfYear(dec31);

  const rowData = [];
  for (const employee of employees) {
    const daysOff = new Array(yearLength);
    daysOff.fill("");

    for (const date of employee.timeOff) {
      // convert date to day of year
      // 1-convert dateString to dateArray
      const [year, monthNo, day] = date.vacationDate.split("-");

      // 2-construct new date with deconstructed array
      const formattedDate = new Date(year, monthNo - 1, day);

      // 3-get day of year for each date
      const dayOfYear = getDayOfYear(formattedDate);

      // add vacationType to daysOff array at corresponding index (day of year - 1)
      daysOff[dayOfYear - 1] = date.vacationType;
    }

    // create employee object and add to row array
    const obj = {
      employeeId: employee.employeeId,
      employeeColor: employee.color,
      daysOff: daysOff,
    };
    rowData.push(obj);
  }
  
  return rowData;
};

const getDayOfYear = (date) => {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
};

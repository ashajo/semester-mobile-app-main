import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CalendarList } from "react-native-calendars";
import { LocaleConfig } from "../../core/I18n/DateStrings";

import {
  background,
  secondary,
  textDark,
  textLight,
} from "../../styles/colors";
import {
  buttonPrimary,
  buttonSecondary,
  buttonTextPrimary,
  buttonTextSecondary,
} from "../../styles";
import { defaultSpacing } from "../../styles/spacing";
import { baseFontSize, mediumFont, smallFont } from "../../styles/typography";
import { Tab } from "./Tab";
import { CalendarContext, UserContext, WorkspaceContext } from "../../context";

export const DatePicker = ({ onSave, onCancel }) => {
  const { state: dates, updateCalendarCtx } = useContext(CalendarContext);
  const { state: workspace, updateWorkspaceCtx } = useContext(WorkspaceContext);
  const { state: user } = useContext(UserContext);
  const [vacationType, toggleVacationType] = useState("VACATION");

  const showTab = (tabIdentifier) => {
    switch (tabIdentifier) {
      case "vacation":
        toggleVacationType("VACATION");
        break;
      case "parental":
        toggleVacationType("PARENTAL");
        break;
      default:
        toggleVacationType("VACATION");
    }
  };

  const selectDate = (day) => {
    const currentDate = {};

    for (const date in dates) {
      if (date === day.dateString) {
        updateCalendarCtx("remove_date", day.dateString);
        return;
      }
    }

    currentDate[day.dateString] = {
      startingDay: true,
      endingDay: true,
      color: secondary,
    };
    updateCalendarCtx("add_date", currentDate);
  };

  const saveDates = () => {
    const employee = {};
    employee.employeeId = user.employeeId;

    const dateArray = [];

    for (const date in dates) {
      const obj = {};

      obj.vacationDate = date;
      obj.vacationType = vacationType;
      dateArray.push(obj);
    }

    employee.timeOff = dateArray;
    updateWorkspaceCtx("timeOff", employee);
    onSave();
  };

  const arrowBack = (
    <MaterialCommunityIcons name="chevron-left" size={24} color={textDark} />
  );
  const arrowForward = (
    <MaterialCommunityIcons name="chevron-right" size={24} color={textDark} />
  );

  return (
    <View style={styles.background}>
      <View style={styles.datepicker}>
        {/* TabBar */}
        <View style={[styles.tabBar]}>
          <Tab
            title="Semester"
            tabIdentifier="vacation"
            active={vacationType === "VACATION"}
            activate={showTab}
          />
          <Tab
            title="Föräldraledighet"            
            tabIdentifier="parental"
            active={vacationType === "PARENTAL"}
            activate={showTab}
          />
        </View>

        {/* Calendar block*/}
        <View style={styles.calendar}>
          <CalendarList
            horizontal
            pagingEnabled
            pastScrollRange={6}
            futureScrollRange={18}
            hideExtraDays={false}
            disableMonthChange={false}
            disableAllTouchEventsForDisabledDays={true}
            hideArrows={false}
            renderArrow={(direction) =>
              direction === "left" ? arrowBack : arrowForward
            }
            theme={{
              monthTextColor: textDark,
              textMonthFontSize: mediumFont,
              textMonthFontWeight: "bold",
              textSectionTitleColor: secondary,
              textDayHeaderFontSize: baseFontSize,
              textDayHeaderFontWeight: "bold",
              dayTextColor: textDark,
              textDayFontSize: smallFont,
              textDayFontWeight: "bold",
              todayTextColor: textDark,
              textDisabledColor: textLight,
              textDisabledFontWeight: "300",

              selectedDayBackgroundColor: secondary,
              selectedDayTextColor: textDark,
            }}
            onDayPress={(day) => selectDate(day)}
            markedDates={dates}
            markingType={"period"}
          />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={onCancel}>
          <Text style={styles.buttonTextSecondary}>Avbryt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonPrimary} onPress={saveDates}>
          <Text style={styles.buttonTextPrimary}>Klar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "flex-end",
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
  datepicker: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  tabBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginBottom: -1,
  },
  calendar: {
    width: "100%",
    borderColor: background,
    backgroundColor: background,
  },
  calendarList: {},
  buttonsRow: {
    flexDirection: "row",
    borderColor: background,
    backgroundColor: background,
    width: "100%",
    paddingVertical: 20,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  buttonPrimary: {
    ...buttonPrimary,
    margin: defaultSpacing,
    width: "40%",
  },
  buttonTextPrimary: {
    ...buttonTextPrimary,
    textAlign: "center",
    textDecorationStyle: "solid",
  },
  buttonSecondary: {
    ...buttonSecondary,
    margin: defaultSpacing,
    width: "40%",
  },
  buttonTextSecondary: {
    ...buttonTextSecondary,
    textAlign: "center",
    textDecorationStyle: "solid",
  },
});

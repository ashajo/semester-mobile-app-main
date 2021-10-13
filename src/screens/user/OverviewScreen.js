import React, { useState,useContext } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LogoHeader, Overlay, OverviewHeader } from "../../components/index";
import { ScheduleBase } from "../../components/Schedule/ScheduleBase";
import { EmployeeInfo } from "../../components/Popups/EmployeeInfo";

import { defaultSpacing, largeSpacing } from "../../styles/spacing";
import { background, primary } from "../../styles/colors";
import { UserContext, WorkspaceContext, CalendarProvider } from "../../context";
import { strongText, row, pageLeft } from "../../styles";
import { getVacationWeeks } from "../../utils/user";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { mainHeader } from "../../styles/typography";

export default function OverviewScreen({ route }) {
  const { state: workspace } = useContext(WorkspaceContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [popupData, setPopupData] = useState(null);
  

  const showPopup = (data) => {
    const employeeList = workspace.employees;

    // Fetch employee's name and department/job title.
    // We need to add department and/or job title to the employee entity and database table,
    // for now I've hardcoded a string when employee data is fetched from database (api/get.js).
    const [employee] = employeeList.filter(
      (employee) => employee.employeeId === data.employeeId
    );

    const dataSet = {};
    dataSet.color = employee.color;
    dataSet.name = `${employee.firstName} ${employee.lastName}`;
    dataSet.jobTitle = employee.jobTitle;

    // Fetch weeks numbers for vacation and parental leave.
    const vacation = getVacationWeeks(employee.timeOff, "VACATION");
    dataSet.vacation = [...vacation].join(", ");

    const parental = getVacationWeeks(employee.timeOff, "PARENTAL");
    dataSet.parental = [...parental].join(", ");

    setPopupData(dataSet);
  };

  const hidePopup = () => {
    setPopupData(null);
  };

  const onShowCalendar = () => {
    setShowDatePicker(true);
  };

  const onClose = () => {
    setShowDatePicker(false);
  };

  const saveDates = () => {
    setShowDatePicker(false);
  };

  if (route.params.error) {
    return (
      <SafeAreaView style={styles.page}>
        <LogoHeader />

        <OverviewHeader />

        <Text style={[mainHeader, { padding: 50, textAlign: "center" }]}>
          Kunde inte ansluta till servern. Försök igen senare.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <LogoHeader />

      <OverviewHeader />

      <ScheduleBase togglePopup={showPopup} />

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.row, styles.button]}
        onPress={onShowCalendar}
      >
        <MaterialCommunityIcons
          style={styles.icon}
          name="pencil"
          size={24}
          color={primary}
        />
        <Text style={styles.buttonText}>Planera</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <CalendarProvider>
          <Overlay close={onClose}>
            <DatePicker onSave={saveDates} onCancel={onClose} />
          </Overlay>
        </CalendarProvider>
      )}

      {popupData !== null && (
        <View style={styles.popup}>
          <EmployeeInfo hidePopup={hidePopup} data={popupData} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    ...pageLeft,
  },
  row: {
    ...row,
  },
  button: {
    width: 150,
    padding: largeSpacing,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: primary,
    backgroundColor: background,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    // the following works only with Android
    elevation: 5,
    // the following works only with iOS
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  icon: {
    paddingHorizontal: defaultSpacing,
  },
  buttonText: {
    ...strongText,
    alignSelf: "center",
    color: primary,
  },
  popup: {
    marginTop: 60,
    marginLeft: 10,
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

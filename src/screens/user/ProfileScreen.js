import React, { useEffect, useCallback, useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_USER } from "../../utils/constants";

import { LogoHeader, ProfileHeader, TimeOff, Logout } from "../../components";
import { pageHeading, pageLeft } from "../../styles";
import { mainHeader } from "../../styles/typography";

import { getVacationDates, getVacationWeeks } from "../../utils/user";
import { UserContext, WorkspaceContext } from "../../context";

export default function ProfileScreen({ navigation, route }) {
  const { state: workspace } = useContext(WorkspaceContext);
  const { state: user, updateUserCtx } = useContext(UserContext);

  useEffect(() => {
    const check = async () => {
      try {
        await AsyncStorage.setItem(APP_USER, JSON.stringify(user));
        navigation.navigate("Login");
      } catch {
        return [false, "Could not save user to local storage."];
      }
    };

    if (!user.signedIn) {
      check();
    }
  }, [user.signedIn]);

  const [calculatedDates, setDates] = useState({
    vacationWeeks: false,
    vacationDates: false,
    parentalWeeks: false,
    parentalDates: false,
  });

  const logOut = async () => {
    updateUserCtx("signedIn", false);
  };

  useFocusEffect(
    useCallback(() => {
      const [employee] = workspace.employees.filter(
        (employee) => employee.employeeId === user.employeeId
      );

      if (employee.timeOff.length > 0) {
        const [...vacationWeeks] = getVacationWeeks(
          employee.timeOff,
          "vacation"
        );
        const [...parentalWeeks] = getVacationWeeks(
          employee.timeOff,
          "parental"
        );

        const vacationDates = getVacationDates(employee.timeOff, "vacation");
        const parentalDates = getVacationDates(employee.timeOff, "parental");

        const dates = {};
        dates.vacationWeeks = vacationWeeks;
        dates.vacationDates = vacationDates;
        dates.parentalWeeks = parentalWeeks;
        dates.parentalDates = parentalDates;

        setDates(dates);
      }
    }, [workspace.employees])
  );

  if (route.params.error) {
    return (
      <SafeAreaView style={styles.page}>
        <LogoHeader />

        <ProfileHeader />

        <Text style={[mainHeader, { padding: 50, textAlign: "center" }]}>
          Kunde inte ansluta till servern. Försök igen senare.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <LogoHeader />

      <ProfileHeader />

      {calculatedDates.vacationDates && (
        <TimeOff vacationType="vacation" calculatedDates={calculatedDates} />
      )}

      {calculatedDates.parentalDates && (
        <TimeOff vacationType="parental" calculatedDates={calculatedDates} />
      )}

      {!calculatedDates.vacationDates && !calculatedDates.parentalDates && (
        <Text style={styles.text}>
          Du har inte registrerat din ledighet ännu
        </Text>
      )}

      <TouchableOpacity onPress={logOut}>
        <Logout />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    ...pageLeft,
  },
  text: {
    ...pageHeading,
    padding: 50,
    textAlign: "center",
  },
});

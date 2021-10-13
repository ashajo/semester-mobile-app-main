import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { section, borderTop, borderBottom, centerAll, rowFlexStart, profileHeading} from "../../styles";
import { UserContext } from "../../context";
import { RoundBackground } from "../RoundBackground";
import { defaultSpacing } from "../../styles/spacing";

export const ProfileHeader = () => {
  const { state: user, updateUserCtx } = useContext(UserContext);
  const userName = user.firstName + " " + user.lastName;
  const initials = user.firstName[0] + user.lastName[0];

  return (
    <View style={[styles.section, styles.row]}>
      <RoundBackground largeStyle color={user.color}>
        {initials}
      </RoundBackground>
      <Text style={styles.heading}>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    ...section,
    ...borderTop,
    ...borderBottom,
    ...centerAll,
  },
  row: {
    ...rowFlexStart,
  },
  heading: {
    ...profileHeading,
    marginLeft: defaultSpacing,
  },
});

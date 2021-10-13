import React from "react";
import { View, ScrollView } from "react-native";

import { ScheduleSidebar } from "./ScheduleSidebar";
import { ScheduleTableList } from "./ScheduleTableList";

export function ScheduleBase({togglePopup}) {
  return (
    <View style={{ marginBottom: 100}}>
      <ScrollView horizontal={true}>
        <View>
          <ScheduleSidebar />
          <ScheduleTableList togglePopup={togglePopup} />
        </View>
      </ScrollView>
    </View>
  );
}

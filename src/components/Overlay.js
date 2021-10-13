import React from "react";
import { Modal } from "react-native";

export const Overlay = ({ close, children }) => {
  const open = true;

  return (
    <Modal
      animationType="none"
      visible={open}
      transparent
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        close();
      }}
    >
      {children}
    </Modal>
  );
};

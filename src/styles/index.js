import * as Layout from "./layout";
import * as Spacing from "./spacing";
import * as Colors from "./colors";
import * as Typography from "./typography";

import { StyleSheet } from "react-native";


// Layout styles
export const centerAll = {
  alignItems: "center",
  justifyContent: "center",
};

// Page styles
export const basePage = { // maybe no need to export this?
  flex: 1,
  backgroundColor: Colors.background,
  paddingHorizontal: Spacing.defaultSpacing,
};

export const pageLeft = {
  ...basePage,
  alignItems: "flex-start",
};

export const pageCenter = {
  ...basePage,
  alignItems: "center",
};

export const overlayPage = {
  flex: 1,
  ...centerAll,
  backgroundColor: Colors.translucentGrey,
}

// Sections and rows
export const section = {
  width: "100%",
  paddingVertical: Spacing.largeSpacing,
};

export const row = { // maybe no need to export this?
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
};

export const rowFlexStart = {
  ...row,
  justifyContent: "flex-start",
};

export const rowSpaceBetween = {
  ...row,
  justifyContent: "space-between",
};

// Text styles
export const pageHeading = {
  ...Typography.mainHeader,
  color: Colors.textDark,
};

export const profileHeading = {
  ...Typography.secondaryHeader,
  letterSpacing: -0.5,
  color: Colors.textDark,
};

export const subheading = {
  ...Typography.subHeader,
  letterSpacing: -0.5,
};

export const slideHeading = {
  ...Typography.largeHeader,
  color: Colors.textDark,
};

export const monthsHeading = {
  ...Typography.tableHeader,
  color: Colors.textDark,
};

export const mainText = {
  ...Typography.bodyText,
  color: Colors.textDark,
};

export const strongText = {
  ...Typography.bodyText,
  ...Typography.strong,
  color: Colors.textDark,
};

export const fineprint = {
  ...Typography.smallText,
  color: Colors.textLight,
};

export const textLink = {
  ...Typography.textLink,
  color: Colors.linkColor,
};

// Border styles
const borderBase = {
  borderStyle: "solid",
  borderColor: Colors.borderColor,
};

export const borderFull = {
  ...borderBase,
  borderWidth: StyleSheet.hairlineWidth
}

export const borderTop = {
  ...borderBase,
  borderTopWidth: StyleSheet.hairlineWidth,
};

export const borderBottom = {
  ...borderBase,
  borderBottomWidth: StyleSheet.hairlineWidth,
};

export const borderLeft = {
  ...borderBase,
  borderLeftWidth: StyleSheet.hairlineWidth,
};

export const borderRight = {
  ...borderBase,
  borderRightWidth: StyleSheet.hairlineWidth,
};

// Form styles
// Input fields
export const textInput = {
  ...borderBase,
  width: "100%",
  borderWidth: 1,
  borderRadius: 5,
  padding: Spacing.defaultSpacing,
};

export const textInputError = {
  borderColor: Colors.error,
};

export const errorText = {
  color: Colors.error,
};

// Buttons
const baseButton = {
  width: "100%",
  alignItems: "center",
  borderRadius: 10,
  padding: Spacing.defaultSpacing,
};

export const buttonPrimary = {
  ...baseButton,
  backgroundColor: Colors.primary,
};

export const buttonSecondary = {
  ...baseButton,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: Colors.primary,
};

export const buttonTextPrimary = {
  ...Typography.buttonText,
  color: Colors.WHITE,
  letterSpacing: 1,
};

export const buttonTextSecondary = {
  ...Typography.buttonText,
};

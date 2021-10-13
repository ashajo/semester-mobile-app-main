export const baseFontSize = 16;
const baseLineHeight= 1.4;

export const smallFont = baseFontSize * 0.875;
export const mediumFont = baseFontSize * 1.25;
const largeFont = baseFontSize * 1.75;

  // Font-family etc.
const baseFont = {
  fontFamily: 'Inter_400Regular',
};

const headerFont ={
  fontFamily: 'Inter_300Light',
};

export const strong = {
  fontWeight: "bold",
};

export const mainHeader = {
  ...headerFont,
  ...strong,
  fontSize: mediumFont,
  lineHeight: mediumFont * baseLineHeight,
};

export const secondaryHeader = {
  fontFamily: 'Inter_500Medium',
  fontSize: mediumFont,
  lineHeight: mediumFont * baseLineHeight,
};

export const subHeader = {
  ...headerFont,
  fontSize: mediumFont,
  lineHeight: mediumFont * baseLineHeight,
};

export const largeHeader = {
  ...baseFont,
  ...strong,
  fontSize: largeFont,
  lineHeight: largeFont * baseLineHeight,
};

export const tableHeader = {
  ...baseFont,
  textAlign: "center",
  textTransform: "uppercase",
}

export const bodyText = {
  ...baseFont,
  fontSize: baseFontSize,
  lineHeight: baseFontSize * baseLineHeight,
}

export const smallText = {
  ...baseFont,
  fontSize: smallFont,
  lineHeight: smallFont * baseLineHeight,
};

export const textLink = {
  ...bodyText,
  ...strong,
  textAlign: "center",
  textDecorationStyle: "solid",
  textDecorationLine: "underline",
}

export const buttonText = {
  ...bodyText,
  ...strong,
  textAlign: "center",
  textTransform: "uppercase",
};

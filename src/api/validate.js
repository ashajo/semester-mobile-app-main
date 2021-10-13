import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl, HAS_LAUNCHED, APP_USER } from "../utils/constants";

export const checkIfFirstLaunch = async () => {
  try {
    // // remove for production - comment out to launch app as old user
    // await AsyncStorage.removeItem(HAS_LAUNCHED);
    // await AsyncStorage.removeItem(APP_USER);
    // //

    const isFirstLaunch = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (isFirstLaunch === null) {
      await AsyncStorage.setItem(HAS_LAUNCHED, "true");
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const validateWorkspace = async (workspace, cancelToken) => {
  try {
    const data = await axios
      .get(`${baseUrl}/company/workspace?workspace=${workspace}`, {
        cancelToken,
      })
      .then((response) => response.data);

    if (data.paused) {
      throw { message: "Paused" };
    } else {
      return [true, data];
    }
  } catch (thrown) {
    let status = thrown.message;

    if (axios.isCancel(thrown)) {
      status = "Request cancelled";
    } else if (thrown.message.includes("400")) {
      status = "Not found";
    }

    switch (status) {
      case "Paused":
        return [
          false,
          "Denna arbetsplats är inte tillgänglig för tillfället. Kontakta din arbetsledare för mer information.",
        ];
      case "Not found":
        return [false, "Denna arbetsplats finns inte."];
      case "Request cancelled":
        return [false, "Anslutning till servern avbruten av användaren. Försök igen senare."];
      case "Network Error":
        return [false, "Kunde inte ansluta till servern. Försök igen senare."];
      default:
        return [false, "Någonting gick fel. Försök igen senare."];
    }
  }
};

export const isEmailAvailable = async (email, cancelToken) => {
  try {
    await axios.get(`${baseUrl}/user/email?email=${email}`, {
      cancelToken,
    });

    throw { message: "Email exists" };
  } catch (thrown) {
    let status = thrown.message;

    if (axios.isCancel(thrown)) {
      status = "Request cancelled";
    } else if (thrown.message.includes("400")) {
      status = "Email available";
    }

    switch (status) {
      case "Email available":
        return [true, ""];
      case "Email exists":
        return [false, "Denna e-postadressen används redan."];
      case "Request cancelled":
        return [false, "Anslutning till servern avbruten av användaren. Försök igen senare."];
      case "Network Error":
        return [false, "Kunde inte ansluta till servern. Försök igen senare."];
      default:
        return [false, "Någonting gick fel. Försök igen senare."];
    }
  }
};
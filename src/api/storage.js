import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_USER } from "../utils/constants";

export const storedAppUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem(APP_USER);

    if (storedUser === null) {
      return null;
    } else {
      return JSON.parse(storedUser);
    }
  } catch {
    return null;
  }
};

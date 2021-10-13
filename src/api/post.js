import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl, APP_USER } from "../utils/constants";

export const registerUser = async (user) => {
  let registeredUser = {};

  const newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: 0,
  };

  try {
    const response = await axios.post(`${baseUrl}/user/`, newUser);
    registeredUser = response.data;

    user.userType = registeredUser.userType;
    user.signedIn = true;
  } catch (error) {
    return [false, "Could not create user entity in db."];
  }

  const newEmployee = {
    company: {
      id: user.companyId,
    },
    user: {
      id: registeredUser.id,
    },
  };

  try {
    const response = await axios.post(`${baseUrl}/employee/`, newEmployee);
    const registeredEmployee = response.data;
    
    user.employeeId = registeredEmployee.id;
  } catch (error) {
    return [false, "Could not create employee entity in db."];
  }

  try {
    await AsyncStorage.setItem(APP_USER, JSON.stringify(user));
  } catch {
    return [false, "Could not save user to local storage."];
  }
  
  return [true, user];
};
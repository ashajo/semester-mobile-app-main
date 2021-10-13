import axios from "axios";
import { baseUrl } from "../utils/constants";
import { getNextColor } from "../utils/setUserColors";

export const fetchEmployees = async (companyId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/employee/company/${companyId}`
    );

    const filtered = response.data.map((entry,index) => {
      return {
        employeeId: entry.id,
        firstName: entry.user.firstName,
        lastName: entry.user.lastName,
        jobTitle: "Barnavdelningen - Sjuksköterska", // temporarily hardcoded, until data is added to database
        color: getNextColor(index),
      };
    });

    return filtered;
  } catch (error) {
    return null;
    // handle error
  }
};

export const fetchAllApprovedTimeOff = async (companyId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/vacationDay/company/${companyId}`
    );

    const filtered = response.data
      .filter((entry) => entry.approved)
      .map((entry) => {
        return {
          vacationDate: entry.vacationDate,
          vacationType: entry.vacationType,
          employeeId: entry.employee.id,
        };
      });

    return filtered;
  } catch (error) {
    // handle error
  }
};

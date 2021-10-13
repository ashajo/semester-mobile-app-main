import { fetchAllApprovedTimeOff, fetchEmployees } from "../api/get";
import createDataContext from "./createDataContext";

// workspace format = {
//   companyId: int
//   timeOff: [],
//   employees: [],
// }
// No need to store all unapproved time off. Each user would only need to see their own.

const workspaceReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "companyId":
      return { ...state, companyId: action.payload };
    case "timeOff":
      for (const employee of state.employees) {
        if (employee.employeeId === action.payload.employeeId) {
          employee.timeOff = [...employee.timeOff, ...action.payload.timeOff];
        }
      }
      return {...state};
    case "employees":
      return { ...state, employees: action.payload };
    default:
      return state;
  }
};

const updateWorkspaceCtx = (dispatch) => {
  return (field, value) => {
    dispatch({ type: field, payload: value });
  };
};

export const { Context, Provider } = createDataContext(
  workspaceReducer,
  { updateWorkspaceCtx },
  {}
);

export const initializeWorkspace = async (companyId) => {
  let employees = [];
  let approvedTimeOff = [];

  try {
    employees = await fetchEmployees(companyId);
  } catch (error) {
    return null;
  }

  try {
    approvedTimeOff = await fetchAllApprovedTimeOff(companyId);
  } catch (error) {
    return null;
  }

  // separate out employees to array: 1 object(row) per employee
  for (const employee of employees) {
    employee.timeOff = [];

    for (const date of approvedTimeOff) {
      if (employee.employeeId === date.employeeId) {
        const obj = {
          vacationDate: date.vacationDate,
          vacationType: date.vacationType,
        };
        employee.timeOff.push(obj);
      }
    }
  }

  // for (const employee of rowData) {
  //
  // }
  return {
    companyId: companyId,
    employees: [...employees],
  };
};

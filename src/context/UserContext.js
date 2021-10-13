import createDataContext from "./createDataContext";

// user format = {
//   "companyId": int,
//   "workspace": string,
//   "firstName": string,
//   "lastName": string,
//   "email": string,
//   "employeeId": string,
//   "userType": enum (0=USER, 1=ADMIN),
//   "color": string,
//   "signedIn": boolean,
// }

const userReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "companyId":
      return { ...state, companyId: action.payload };
    case "workspace":
      return { ...state, workspace: action.payload };
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "employeeId":
      return { ...state, employeeId: action.payload };
    case "userType":
      return { ...state, userType: action.payload };
    case "signedIn":
      return { ...state, signedIn: action.payload };
    case "color":
      return { ...state, color: action.payload };
    default:
      return state;
  }
};

const updateUserCtx = (dispatch) => {
  return (field, value) => {
    dispatch({ type: field, payload: value });
  };
};

export const { Context, Provider } = createDataContext(
  userReducer,
  { updateUserCtx },
  {},
);
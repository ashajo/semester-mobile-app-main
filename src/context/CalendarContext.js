import createDataContext from "./createDataContext";
import { secondary } from "./../styles/colors";

const calendarReducer = (state, action) => {

  switch (action.type) {
    case "add_date":
      return {...state, ...action.payload};
    case "remove_date":
      delete state[action.payload];
      return {...state};
    default:
      return state;
  }
};

const updateCalendarCtx = (dispatch) => {
  return (field, value) => {
    dispatch({ type: field, payload: value });
  };
};

export const { Context, Provider } = createDataContext(
  calendarReducer,
  { updateCalendarCtx },
  {},
);
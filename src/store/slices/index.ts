import { combineReducers } from "redux";
import employeeReducer from "./employeeSlices";

const rootReducer = combineReducers({
  employee: employeeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

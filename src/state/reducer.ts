import { combineReducers } from "@reduxjs/toolkit";
import application from "./application/reducer";
import user from "./auth/reducer";

const reducer = combineReducers({
  application,
  user,
});

export default reducer;

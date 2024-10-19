import { createReducer } from "@reduxjs/toolkit";
import { ApplicationModal, setOpenModal } from "./action";

export interface ApplicationState {
  readonly openModal: ApplicationModal | null;
}

const initialState: ApplicationState = {
  openModal: null,
};

export default createReducer(initialState, (builder) => {
  return builder.addCase(setOpenModal, (state, action) => {
    state.openModal = action.payload;
  });
});

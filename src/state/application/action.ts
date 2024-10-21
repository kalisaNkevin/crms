import { createAction } from "@reduxjs/toolkit";

export enum ApplicationModal {
  CUSTOMER_MODAL,
}

export const setOpenModal = createAction<ApplicationModal | null>(
  "application/setOpenModal",
);

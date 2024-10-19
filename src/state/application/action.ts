import { createAction } from "@reduxjs/toolkit";

export enum ApplicationModal {
  SIGN_UP_CONFIRMATION,
  VOTING_MODAL,
  VIEW_DEAL,
  WITHDRAW,
  SCANNED_PHOTO,
  IRON_POINTS,
  APPROVE_USER,
  INVEST_MODAL,
  APPROVE_SYNDICATE,
}

export const setOpenModal = createAction<ApplicationModal | null>(
  "application/setOpenModal",
);

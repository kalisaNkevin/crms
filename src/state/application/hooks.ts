import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "..";
import { useAppSelector } from "../hooks";
import { ApplicationModal, setOpenModal } from "./action";

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state) => state.application.openModal);
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    () => dispatch(setOpenModal(open ? null : modal)),
    [dispatch, modal, open],
  );
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal]);
}

export function useToggleSignupConfirmation(): () => void {
  return useToggleModal(ApplicationModal.SIGN_UP_CONFIRMATION);
}
export function useToggleVotingModal(): () => void {
  return useToggleModal(ApplicationModal.VOTING_MODAL);
}
export function useToggleViewDealModal(): () => void {
  return useToggleModal(ApplicationModal.VIEW_DEAL);
}

export function useToggleWithdrawModal(): () => void {
  return useToggleModal(ApplicationModal.WITHDRAW);
}
export function useToggleScannedPhotoModal(): () => void {
  return useToggleModal(ApplicationModal.SCANNED_PHOTO);
}

export function useToggleIronPointsModal(): () => void {
  return useToggleModal(ApplicationModal.IRON_POINTS);
}

export function useToggleApproveUserModal(): () => void {
  return useToggleModal(ApplicationModal.APPROVE_USER);
}
export function useToggleApproveSyndicateModal(): () => void {
  return useToggleModal(ApplicationModal.APPROVE_SYNDICATE);
}

export function useToggleInvestmentModal(): () => void {
  return useToggleModal(ApplicationModal.INVEST_MODAL);
}

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

export function useToggleCustomerModal(): () => void {
  return useToggleModal(ApplicationModal.CUSTOMER_MODAL);
}

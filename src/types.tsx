export interface IMsg {
  role: string;
  message: string;
}

export interface ModalProps {
  modalActive: boolean;
  setModalActive: (active: boolean) => void;
}

import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { PopUp } from "live-chat-lib";
import Modal from "./Modal/Modal";
import { useState } from "react";

export const PublicLayout = () => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <Header modalActive={modalActive} setModalActive={setModalActive} />
      <Outlet />
      <PopUp operator_id="123" />
      <Modal modalActive={modalActive} setModalActive={setModalActive} />
    </>
  );
};

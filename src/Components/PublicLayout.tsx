import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { PopUp } from "live-chat-lib";
import AuthModal from "./AuthModal/AuthModal";
import { useState } from "react";

export const PublicLayout = () => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <Header modalActive={modalActive} setModalActive={setModalActive} />
      <Outlet />
      <PopUp operator_id="A2D97770760B483B" />
      <AuthModal modalActive={modalActive} setModalActive={setModalActive} />
    </>
  );
};

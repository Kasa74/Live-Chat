import { useState } from "react";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import PopUp from "../../Components/PopUp/PopUp";
import "./mainpage.css";

const MainPage = () => {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="MainPage">
      <Header modalActive={modalActive} setModalActive={setModalActive} />
      <main className="main__content">
        <div className="main__title">Чат-бот нового поколения</div>
        <div className="main__text">
          Платформа для связи <br />с клиентами
        </div>
        <div className="main__button">Установить</div>
      </main>
      <PopUp />
      <Modal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
};

export default MainPage;

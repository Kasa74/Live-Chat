import Header from "../../Components/Header/Header";
import PopUp from "../../Components/PopUp/PopUp";
import "./mainpage.css";

const MainPage = () => {
  return (
    <div className="MainPage">
      <Header />
      <main className="main__content">
        <div className="main__title">Чат-бот нового поколения</div>
        <div className="main__text">
          Платформа для связи <br />с клиентами
        </div>
        <div className="main__button">Установить</div>
      </main>
      <PopUp />
    </div>
  );
};

export default MainPage;

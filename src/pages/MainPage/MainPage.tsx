import "./mainpage.css";
import "../../styles/general.css";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="MainPage">
      <div className="container">
        <main className="main__content">
          <div className="main__title">Чат-бот нового поколения</div>
          <div className="main__text">
            Платформа для связи <br />с клиентами
          </div>
          <div
            className="main__button"
            onClick={() => navigate("/installation")}
          >
            Установить
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;

import "./installationpage.css";
import "../../styles/general.css";

export const InstallationPage = () => {
  return (
    <div className="installation">
      <div className="container">
        <div className="installation__content">
          <div className="installation__title">Как установить в проект:</div>
          <ol className="installation__points">
            <li className="installation__point">
              Установить в зависимости:{" "}
              <span>npm i git+https://github.com/Kasa74/live-chat-lib.git</span>
            </li>
            <li className="installation__point">
              Импортировать компонент из библиотеки:{" "}
              <span>{`import { PopUp } from "live-chat-lib"`}</span>
            </li>
            <li className="installation__point">
              Передать через пропсы ID оператора:{" "}
              <span>{`<PopUp operator_id="ID оператора">`}</span>
            </li>
            <li className="installation__point">
              Все! Можно использовать попап окошко
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

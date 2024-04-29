import "./header.css";
import { LogoSVG } from "../LogoSVG";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <LogoSVG />
            <div className="header__logo__text">Чат-бот</div>
          </div>
          <nav className="header__nav">
            <ul>
              <li>Тарифы</li>
              <li>Заказать звонок</li>
              <li>Личный кабинет</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

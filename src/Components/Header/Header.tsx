import "./header.css";
import { LogoSVG } from "../../img/LogoSVG";
import { ModalProps } from "../../types";
import { Link } from "react-router-dom";

const Header = ({ modalActive, setModalActive }: ModalProps) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to="/" className="header__logo">
            <LogoSVG />
            <div className="header__logo__text">Чат-бот</div>
          </Link>
          <nav className="header__nav">
            <div className="nav__burger-menu">
              <span className="nav__burger"></span>
            </div>
            <ul>
              <li>Установка</li>
              <li>Заказать звонок</li>
              <li onClick={() => setModalActive(true)}>Личный кабинет</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

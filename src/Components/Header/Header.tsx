import "./header.css";
import { LogoSVG } from "../../img/LogoSVG";
import { ModalProps } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import CloseButton from "../../img/CloseButtonSVG";
import { useState } from "react";

const Header = ({ modalActive, setModalActive }: ModalProps) => {
  const navigate = useNavigate();
  const [burgerActive, setBurgerActive] = useState(false);
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <Link to="/" className="header__logo">
            <LogoSVG />
            <div className="header__logo__text">Чат-бот</div>
          </Link>
          <nav className="header__nav">
            <div
              className={burgerActive ? "blur active" : "blur"}
              onClick={() => setBurgerActive(false)}
            ></div>
            <div
              className="nav__burger-menu"
              onClick={() => setBurgerActive(true)}
            >
              <span className="nav__burger"></span>
            </div>
            <ul className={burgerActive ? "nav__menu active" : "nav__menu"}>
              <div
                className="nav__burger__close"
                onClick={() => setBurgerActive(false)}
              >
                <CloseButton />
              </div>
              <li
                onClick={() => {
                  navigate("/installation");
                  setBurgerActive(false);
                }}
              >
                Установка
              </li>
              <li
                onClick={() => {
                  setBurgerActive(false);
                }}
              >
                Заказать звонок
              </li>
              <li
                onClick={() => {
                  setBurgerActive(false);
                  setModalActive(true);
                }}
              >
                Личный кабинет
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

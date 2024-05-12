import { useNavigate } from "react-router-dom";
import CloseButton from "../../img/CloseButtonSVG";
import FacebookSVG from "../../img/FacebookSVG";
import GoogleSVG from "../../img/GoogleSVG";
import { LogoSVG } from "../../img/LogoSVG";
import OkSVG from "../../img/OkSVG";
import VkSVG from "../../img/VkSVG";
import { ModalProps } from "../../types";
import "./modal.css";
import { useState } from "react";
import { login } from "../../requsts";
import { error } from "console";

const Modal = ({ modalActive, setModalActive }: ModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendFormError, setSendFormError] = useState("");
  const navigate = useNavigate();
  const sendInfo = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/account");
      } else {
        if (response.status === 404)
          setSendFormError("Неверный пароль или почта!");
        if (response.status === 500) throw new Error("500, сервер даун");
        throw new Error(String(response.status));
      }
    } catch (error) {
      console.error(error);
    }

    // const response = await login(email, password);
    // console.log(response.status);
    // if (response.status >= 200 && response.status < 300) {
    //   const data = await response.json();
    //   console.log(data);
    //   localStorage.setItem("token", data.token);
    //   navigate("/account");
    // } else if (response.status === 404) {
    //   setSendFormError("Неверный пароль или почта!");
    // }

    // if (data.message) {
    //   alert("неверный пароль или почта!");
    // } else if (data.token) {
    //   localStorage.setItem("token", data.token);
    //   navigate("/account");
    // }
  };
  return (
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={() => setModalActive(false)}
    >
      <div
        className={modalActive ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__logo">
          <LogoSVG />
        </div>
        <div className="modal__close" onClick={() => setModalActive(false)}>
          <CloseButton />
        </div>
        <form className={modalActive ? "modal__form active" : "modal__form"}>
          <h1 className="modal__title">Войти</h1>
          <div className="change__form">
            <div className="change__default__text">Новый пользователь?</div>
            <div className="change__color__text">Создать учетную запись</div>
          </div>
          <div className="login__via__social">
            <div className="social">
              <FacebookSVG />
            </div>

            <div className="social">
              <VkSVG />
            </div>

            <div className="social">
              <OkSVG />
            </div>

            <div className="social">
              <GoogleSVG />
            </div>
          </div>

          <div className="separation__block">
            <div className="separation__title">или</div>
          </div>

          <div className="form__inputs">
            <input
              value={email}
              className="form__input"
              placeholder="Почтовый адрес"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              value={password}
              className="form__input"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {sendFormError && <div className="error">{sendFormError}</div>}
          <div className="form__bottom">
            <button className="form__send" onClick={(e) => sendInfo(e)}>
              Продолжить
            </button>
            <div className="forgot__password">Забыли пароль?</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

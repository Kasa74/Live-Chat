import { useNavigate } from "react-router-dom";
import CloseButton from "../../img/CloseButtonSVG";
import FacebookSVG from "../../img/FacebookSVG";
import GoogleSVG from "../../img/GoogleSVG";
import { LogoSVG } from "../../img/LogoSVG";
import OkSVG from "../../img/OkSVG";
import VkSVG from "../../img/VkSVG";
import { ModalProps } from "../../types";
import "./authmodal.css";
import { useState } from "react";
import { login, registration } from "../../requsts";

const Modal = ({ modalActive, setModalActive }: ModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [regComplete, setRegComplete] = useState(false);
  const [sendFormError, setSendFormError] = useState("");
  const navigate = useNavigate();

  const sendInfo = async (e: any) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await login(email, password);
        if (response.ok) {
          const data = await response.json();
          // localStorage.setItem("token", data.token);
          localStorage.setItem("operator_id", data.operator_id);
          navigate("/account");
        } else {
          if (response.status === 404) {
            const data = await response.json();
            if (data.message === "user ne podtverzhden") {
              setSendFormError("Оператор не подтвержден!");
            } else {
              setSendFormError("Неверный пароль или почта!");
            }
          }

          if (response.status === 500) throw new Error("500, сервер даун");
          throw new Error(String(response.status));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await registration(email, password);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          setRegComplete(true);
        } else {
          if (response.status === 404)
            setSendFormError("Почтовый адрес уже зарегистрирован");
          if (response.status === 500) throw new Error("500, сервер даун");
          throw new Error(String(response.status));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={() => {
        setModalActive(false);
        setRegComplete(false);
      }}
    >
      <div
        className={modalActive ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__logo">
          <LogoSVG />
        </div>
        <div
          className="modal__close"
          onClick={() => {
            setModalActive(false);
            setRegComplete(false);
          }}
        >
          <CloseButton />
        </div>

        {regComplete ? (
          <div className="success">
            <div className="success__title">Вы зарегистрированы</div>
            <div className="success__text">
              Для того что бы пользоваться услугами чат-бота необходимо
              подтвердить почту{" "}
            </div>
            <div
              className="success__button"
              onClick={() => {
                setModalActive(false);
                setRegComplete(false);
              }}
            >
              Продолжить
            </div>
          </div>
        ) : (
          <form className={modalActive ? "modal__form active" : "modal__form"}>
            <h1 className="modal__title">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </h1>
            <div className="change__form">
              <div className="change__default__text">
                {isLogin ? "Новый пользователь?" : "Уже есть аккаунт?"}
              </div>
              <div>
                <div
                  className="change__color__text"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Создать учетную запись" : "Войти"}
                </div>
              </div>
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
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;

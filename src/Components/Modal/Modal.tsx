import { useNavigate } from "react-router-dom";
import CloseButton from "../../img/CloseButtonSVG";
import FacebookSVG from "../../img/FacebookSVG";
import GoogleSVG from "../../img/GoogleSVG";
import { LogoSVG } from "../../img/LogoSVG";
import OkSVG from "../../img/OkSVG";
import VkSVG from "../../img/VkSVG";
import { ModalProps } from "../../types";
import "./modal.css";

const Modal = ({ modalActive, setModalActive }: ModalProps) => {
  const navigate = useNavigate();
  const sendInfo = () => {
    navigate("/account");
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
            <input className="form__input" placeholder="Почтовый адрес"></input>
            <input className="form__input" placeholder="Пароль"></input>
          </div>

          <div className="form__bottom">
            <button className="form__send" onClick={() => sendInfo()}>
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

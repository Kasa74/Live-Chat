import { useState } from "react";
import { LogoSVG } from "../LogoSVG";
// import send_button from "../../img/send_button.png";
import "./popup.css";
import { IMsg } from "../../types";

const PopUp = () => {
  const [msg, setMsg] = useState<IMsg[]>([]);
  //   const data = [{ role: "user", message: "gsgdfgd" }];

  //   setMsg(data);

  //   console.log(msg);

  return (
    <div className="popup">
      <div className="popup__container">
        <div className="popup__header">
          <LogoSVG />
          <div className="operator__info">
            <div className="operator__info__name">Консультант</div>
            <div className="operator__info__status">Онлайн</div>
          </div>
        </div>
        {/* isActive? */}
        <div className="chat">
          <div className="chat__container">
            <div className="scrollbar">
              <div className="msg__block">
                <div className="chat__operator__msg">
                  Здравствуйте! Отдел продаж на связи. С радостью отвечу на Ваши
                  вопросы.
                </div>
                <div className="chat__user__msg">
                  Бот бесплатный? Как установить?
                </div>
              </div>
            </div>

            <div className="send__message__block">
              <input
                className="input__msg"
                placeholder="Введите сообщение"
              ></input>
              <button className="send__msg">
                <img
                  //   src={send_button}
                  alt="send__msg__button"
                  className="send__msg__img"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;

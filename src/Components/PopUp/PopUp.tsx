import { createRef, useEffect, useRef, useState } from "react";
import { LogoSVG } from "../../img/LogoSVG";

// import send_button from "../../../public/img/send_button.png";
import "./popup.css";
import { IMsg } from "../../types";
import SendButtonSVG from "../../img/SendButtonSVG";

const PopUp = () => {
  // развернуто или нет поп-ап окно
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState<IMsg[]>([]);

  const [newMsg, setNewMsg] = useState<string | undefined>("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    const new_arr = [...messages];
    new_arr.push({ role: "user", message: `${newMsg}` });
    setMessages(new_arr);
    setNewMsg("");
  };
  return (
    <div className="popup">
      <div className="popup__container">
        <div onClick={() => setActive(!active)} className="popup__header">
          <LogoSVG />
          <div className="operator__info">
            <div className="operator__info__name">Консультант</div>
            <div className="operator__info__status">Онлайн</div>
          </div>
        </div>
        <div className={active ? "chat__active" : "chat"}>
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
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.role === "user"
                        ? "chat__user__msg"
                        : "chat__operator__msg"
                    }
                  >
                    {message.message}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="send__message__block">
              <input
                value={newMsg}
                className="input__msg"
                placeholder="Введите сообщение"
                onChange={(e) => setNewMsg(e.target.value)}
              ></input>
              {newMsg && (
                <button onClick={() => sendMessage()} className="send__msg">
                  <SendButtonSVG />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;

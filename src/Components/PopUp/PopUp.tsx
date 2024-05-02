import { useEffect, useRef, useState } from "react";
import { LogoSVG } from "../../img/LogoSVG";

// import send_button from "../../../public/img/send_button.png";
import "./popup.css";
import SendButtonSVG from "../../img/SendButtonSVG";
import { useDispatch, useSelector } from "react-redux";

const PopUp = () => {
  // redux store
  // по userhex отправка запроса на бд и вывод сообщений
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.messages);

  // развернуто или нет поп-ап окно
  const [active, setActive] = useState(false);

  const [newMsg, setNewMsg] = useState<string | undefined>("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { message: newMsg, role: "user" },
    });
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
                {messages.map((message: any, index: number) => (
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

import { useEffect, useRef, useState } from "react";
import { LogoSVG } from "../../img/LogoSVG";

// import send_button from "../../../public/img/send_button.png";
import "./popup.css";
import SendButtonSVG from "../../img/SendButtonSVG";
import { useDispatch, useSelector } from "react-redux";
import { getDialogue, sendMessage } from "../../requsts";
import CloseButton from "../../img/CloseButtonSVG";

const PopUp = () => {
  // redux store
  // по userhex отправка запроса на бд и вывод сообщений
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.messages);

  // развернуто или нет поп-ап окно
  const [active, setActive] = useState(false);

  const [newMsg, setNewMsg] = useState<string>("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // создание userID, логичнее сделать в mainpage, но с учетом если переносить в либу отдельную - то так правильнее

  const generateUserId = () => {
    const hex = "0123456789ABCDEF";
    let output = "";
    if (localStorage.getItem("UserID")) {
      return;
    } else {
      for (let i = 0; i < hex.length; i++) {
        output += hex.charAt(Math.floor(Math.random() * 16));
      }
      localStorage.setItem("UserID", output);
    }
  };
  generateUserId();

  useEffect(() => {
    // подгружаем предыдущий диалог, если он есть
    getDialogue(userID)
      .then((data) => {
        dispatch({
          type: "RECEIVE_MESSAGES",
          payload: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    const subscribe = setInterval(() => {
      getDialogue(userID)
        .then((data) => {
          dispatch({
            type: "RECEIVE_MESSAGES",
            payload: data,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000);
    // subscribe();
    return () => {
      clearInterval(subscribe);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  let userID = String(localStorage.getItem("UserID"));
  // const subscribe = async () => {
  //   try {
  //     const result = await getDialogue(userID);
  //     dispatch({
  //       type: "RECEIVE_MESSAGES",
  //       payload: result,
  //     });
  //     debugger;
  //     await subscribe();
  //   } catch (e) {
  //     setTimeout(() => {
  //       subscribe();
  //     }, 10000);
  //   }
  // };

  // const result = async () => {
  //   const data = await getDialogue(userID);
  //   dispatch({
  //     type: "RECEIVE_MESSAGES",
  //     payload: data,
  //   });
  // };
  // result();
  // dispatch({
  //   type: "RECEIVE_MESSAGES",
  //   payload: result,
  // });
  // }, 10000);

  const pressOnSendButton = async () => {
    if (newMsg !== "") {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { message: newMsg, from_hex: userID },
      });
      sendMessage(userID, "123", newMsg).catch((error) => {
        console.error(error);
      });
      setNewMsg("");
    }

    // dispatch({
    //   type: "ADD_MESSAGE",
    //   payload: { message: newMsg, role: "user" },
    // });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      if (newMsg !== "") {
        dispatch({
          type: "ADD_MESSAGE",
          payload: { message: newMsg, from_hex: userID },
        });
        sendMessage(userID, "123", newMsg).catch((error) => {
          console.error(error);
        });
        setNewMsg("");
      }
    }
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
          {active && (
            <div className="popup__close__button">
              <CloseButton />
            </div>
          )}
        </div>
        <div className={active ? "chat__active" : "chat"}>
          <div className="chat__container">
            <div className="scrollbar">
              <div className="msg__block">
                <div className="chat__operator__msg">
                  Здравствуйте! Отдел продаж на связи. С радостью отвечу на Ваши
                  вопросы.
                </div>
                {messages.map((message: any, index: number) => (
                  <div
                    key={index}
                    className={
                      message.from_hex !== "123"
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
                onKeyDown={(e) => handleKeyPress(e)}
                onChange={(e) => setNewMsg(e.target.value)}
              ></input>
              {newMsg && (
                <button
                  onClick={() => pressOnSendButton()}
                  className="send__msg"
                >
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

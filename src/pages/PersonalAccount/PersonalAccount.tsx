import { useEffect, useRef, useState } from "react";
import UserIconSVG from "../../img/UserIconSVG";
import "../../styles/general.css";
import "./personalaccount.css";
import { useDispatch, useSelector } from "react-redux";
import LupaSVG from "../../img/LupaSVG";
import { LogoSVG } from "../../img/LogoSVG";
import SendButtonSVG from "../../img/SendButtonSVG";
import { getDialogue, getOperatorDialogs, sendMessage } from "../../requsts";
import MobileBackButtonSVG from "../../img/MobileBackButtonSVG";

const PersonalAccount = () => {
  // redux store
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.messages);

  const [activeCategory, setActiveCategory] = useState<number>(1);

  const [dialogues, setDialogues] = useState<Array<object>>([]);

  // если object, то при следующем обновлении диалогов слетает активный стиль
  const [activeDialogue, setActiveDialogue] = useState<any>({});

  const [newMsg, setNewMsg] = useState<string>("");

  // поиск юзера по айди
  const [searchDialogue, setSearchDialogue] = useState<string>("");

  const filteredDialogues = dialogues.filter((dialogue: any) => {
    return dialogue.message
      .toLowerCase()
      .includes(searchDialogue.toLowerCase());
  });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const operator_id = localStorage.getItem("operator_id");

  // получить список диалогов оператора
  useEffect(() => {
    getOperatorDialogs(operator_id)
      .then((data) => {
        setDialogues(data);
      })
      .catch((error) => {
        console.error(error);
      });

    const subscribe = setInterval(() => {
      getOperatorDialogs(operator_id)
        .then((data) => {
          setDialogues(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000);

    return () => {
      clearInterval(subscribe);
    };
  }, []);

  useEffect(() => {
    getDialogue(operator_id, activeDialogue.from_hex)
      .then((data) => {
        dispatch({
          type: "RECEIVE_MESSAGES",
          payload: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeDialogue, dialogues]);

  // скролл до послденего сообщения при обновлении
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // отправка сообщения с админки
  const pressOnSendButton = (e: any) => {
    if (newMsg !== "") {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { message: newMsg, from_hex: "123" },
      });
      sendMessage(operator_id, activeDialogue.from_hex, newMsg).catch(
        (error) => {
          console.error(error);
        }
      );
      setNewMsg("");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      if (newMsg !== "") {
        dispatch({
          type: "ADD_MESSAGE",
          payload: { message: newMsg, from_hex: "123" },
        });
        sendMessage(operator_id, activeDialogue.from_hex, newMsg).catch(
          (error) => {
            console.error(error);
          }
        );
        setNewMsg("");
      }
    }
  };

  return (
    <div className="account">
      <div className="container">
        <div className="account__content">
          <div
            className={
              activeDialogue.from_hex ? "left__side unactive" : "left__side"
            }
          >
            <div className="left__side__menu">
              <div className="left__side__menu__top">
                <div className="burger-menu">
                  <span className="burger"></span>
                </div>
                <input
                  className="search__dialogue"
                  value={searchDialogue}
                  placeholder="Поиск"
                  onChange={(e) => setSearchDialogue(e.target.value)}
                ></input>
              </div>
              <div className="left__side__menu__bottom">
                {/* active or no active */}
                <div
                  className={
                    activeCategory === 1
                      ? "total__dialogues active"
                      : "total__dialogues"
                  }
                  onClick={() => setActiveCategory(1)}
                >
                  <p>Все</p>
                  <span>{dialogues.length}</span>
                </div>
                <div
                  className={
                    activeCategory === 2
                      ? "pending__dialogues active"
                      : "pending__dialogues"
                  }
                  onClick={() => setActiveCategory(2)}
                >
                  <p>Ожидают</p>
                  <span>2</span>
                </div>
              </div>
            </div>
            <div className="dialogues">
              {/* active dialogues */}
              {filteredDialogues.map((dialogue: any) => (
                <div
                  className={
                    dialogue.from_hex === activeDialogue.from_hex
                      ? "dialogue active"
                      : "dialogue"
                  }
                  key={dialogue.from_hex}
                  onClick={() => setActiveDialogue(dialogue)}
                >
                  <div className="user__icon">
                    <UserIconSVG />
                  </div>
                  <div className="name__last__msg">
                    <div
                      className={
                        dialogue.from_hex === activeDialogue.from_hex
                          ? "username active"
                          : "username"
                      }
                    >
                      #{dialogue.from_hex}
                    </div>
                    <div
                      className={
                        dialogue.from_hex === activeDialogue.from_hex
                          ? "last__msg active"
                          : "last__msg"
                      }
                    >
                      {dialogue.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={
              activeDialogue.from_hex ? "right__side active" : "right__side"
            }
          >
            <div className="right__side__menu">
              <div className="category__messages active">Сообщения</div>
              <div className="category__report">Отчет</div>
              <LupaSVG />
            </div>
            <div className="chat__block">
              {activeDialogue.from_hex && (
                <div className="user__info">
                  <div
                    className="mobile__back__button"
                    onClick={() => setActiveDialogue({})}
                  >
                    <MobileBackButtonSVG />
                  </div>
                  <div className="user__icon">
                    <UserIconSVG />
                  </div>
                  <div className="name__with__status">
                    <div className="username">#{activeDialogue.from_hex}</div>
                    <div className="status">был(а) не давно</div>
                  </div>
                </div>
              )}
              <div className="operator__msg__block">
                {messages.map((message: any, index: number) => (
                  <>
                    {message.from_hex === operator_id ? (
                      <div className="operator__msg">
                        <div className="user__icon">
                          <LogoSVG />
                        </div>
                        <div>
                          <div className="username__msg">Вы</div>
                          <div className="msg">{message.message}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="user__msg">
                        <div className="user__icon">
                          <UserIconSVG />
                        </div>
                        <div>
                          <div className="username__msg">
                            #{message.from_hex}
                          </div>
                          <div className="msg">{message.message}</div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                ))}
              </div>
              <div className="right__side__bottom">
                <input
                  value={newMsg}
                  className="operator__msg__input"
                  placeholder="Сообщение..."
                  onKeyDown={(e) => handleKeyPress(e)}
                  onChange={(e) => setNewMsg(e.target.value)}
                />
                <button
                  disabled={newMsg === ""}
                  className="send__msg"
                  onClick={(e) => pressOnSendButton(e)}
                >
                  <SendButtonSVG />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccount;

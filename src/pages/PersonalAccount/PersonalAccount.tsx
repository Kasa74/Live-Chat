import { useState } from "react";
import UserIconSVG from "../../img/UserIconSVG";
import "../../styles/general.css";
import "./personalaccount.css";
import { useDispatch, useSelector } from "react-redux";
import LupaSVG from "../../img/LupaSVG";
import { LogoSVG } from "../../img/LogoSVG";
import SendButtonSVG from "../../img/SendButtonSVG";

const PersonalAccount = () => {
  // redux store
  // const dispatch = useDispatch();
  // const cash = useSelector((state: any) => state.cash);
  // console.log(cash);
  // const addCash = () => {
  //   dispatch({ type: "ADD_CASH", payload: 5 });
  // };
  // addCash();
  // console.log(cash);
  //
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.messages);

  const [activeCategory, setActiveCategory] = useState<number>(1);

  const [activeDialogue, setActiveDialogue] = useState<number>(1);

  const [newMsg, setNewMsg] = useState<string | undefined>("");

  const sendMsg = () => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { message: newMsg, role: "operator" },
    });
    setNewMsg("");
  };

  return (
    <div className="account">
      <div className="container">
        <div className="account__content">
          <div className="left__side">
            <div className="left__side__menu">
              <div className="left__side__menu__top">
                <div className="burger-menu">
                  <span className="burger"></span>
                </div>
                <input className="search__dialogue" placeholder="Поиск"></input>
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
                  <span>120</span>
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
              <div className="dialogue" onClick={() => setActiveDialogue(1)}>
                <div className="user__icon">
                  <UserIconSVG />
                </div>
                <div className="name__last__msg">
                  <div className="username">Петров Иван</div>
                  <div className="last__msg">Мне вас советовал коллега</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right__side">
            <div className="right__side__menu">
              <div className="category__messages active">Сообщения</div>
              <div className="category__report">Отчет</div>
              <LupaSVG />
            </div>
            <div className="chat__block">
              <div className="user__info">
                <div className="user__icon">
                  <UserIconSVG />
                </div>
                <div className="name__with__status">
                  <div className="username">Зуев Михаил</div>
                  <div className="status">был(а) не давно</div>
                </div>
              </div>
              <div className="operator__msg__block">
                {messages.map((message: any, index: number) => (
                  <>
                    {message.role === "operator" ? (
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
                          <div className="username__msg">Зуев Михаил</div>
                          <div className="msg">{message.message}</div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
              <div className="right__side__bottom">
                <input
                  value={newMsg}
                  className="operator__msg__input"
                  placeholder="Сообщение..."
                  onChange={(e) => setNewMsg(e.target.value)}
                />
                <button
                  disabled={newMsg === ""}
                  className="send__msg"
                  onClick={() => sendMsg()}
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

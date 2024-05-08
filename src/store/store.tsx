import { combineReducers, createStore } from "redux";
import { messageReducer } from "./MessageReducer";

// как совместить несколько редюсеров
// const rootReducer = combineReducers({
//   messages: messageReducer,
//   // имя через которое будет идти обращение к стору: редюсер
// })

export const store = createStore(messageReducer);

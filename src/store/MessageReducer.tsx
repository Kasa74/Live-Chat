interface defaultStateProps {
  messages: any[];
}

const defaultState: defaultStateProps = {
  messages: [],
};

export const messageReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };

    case "RECEIVE_MESSAGES":
      return { ...state, messages: action.payload };
    case "GET_MESSAGES":
      return { ...state };
    default:
      return state;
  }
};

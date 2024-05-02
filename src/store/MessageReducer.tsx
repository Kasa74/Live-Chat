interface defaultStateProps {
  messages: any[];
}

const defaultState: defaultStateProps = {
  messages: [
    {
      message:
        "Здравствуйте! Отдел продаж на связи. С радостью отвечу на Ваши вопросы.",
      role: "operator",
    },
  ],
};

export const messageReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "GET_MESSAGES":
      return { ...state };
    default:
      return state;
  }
};

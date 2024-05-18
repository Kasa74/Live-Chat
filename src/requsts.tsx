export const getDialogue = async (
  operator_id: string | null,
  userID: string
) => {
  const data = await fetch(
    "http://localhost:5001/api/messages/getUsersMessages",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users_hex: [operator_id, userID] }),
    }
  )
    .then((response) => response.json())
    .then((data) => data);
  return data;
};

export const sendMessage = async (
  from_hex: any,
  to_hex: string,
  message: string
) => {
  const data = await fetch(
    "http://localhost:5001/api/messages/addUserMessage",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_hex: from_hex,
        to_hex: to_hex,
        message: message,
      }),
    }
  );
  return data;
};

export const getOperatorDialogs = async (operator_id: string | null) => {
  const data = await fetch(
    "http://localhost:5001/api/messages/getUserDialogs",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_hex: operator_id }),
    }
  )
    .then((response) => response.json())
    .then((data) => data);
  return data;
};

export const login = async (email: string, password: string) => {
  const data = await fetch("http://localhost:5001/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return data;
};

export const registration = async (email: string, password: string) => {
  const data = await fetch("http://localhost:5001/api/user/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return data;
};

export const confirmOperator = async (operator_id: string | undefined) => {
  const data = await fetch("http://localhost:5001/api/user/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ operator_id }),
  });
  return data;
};

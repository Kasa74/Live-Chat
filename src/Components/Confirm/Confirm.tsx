import { useParams } from "react-router-dom";
import { confirmOperator } from "../../requsts";
import { useEffect, useState } from "react";
import "./confirm.css";
import "../../styles/general.css";
export const Confirm = () => {
  const params = useParams();
  const [operatotExist, setOperatorExist] = useState(false);

  useEffect(() => {
    confirmOperator(params.id)
      .then((response) => {
        if (response.ok) {
          setOperatorExist(true);
        } else {
          throw new Error("Ошибка, грусть беда");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="confirm">
      <div className="container">
        <div className="confirm__content">
          <div className="confirm__title">
            {operatotExist
              ? "Email успешно подтвержден!"
              : "Оператор не найден"}
          </div>
          <div className="confirm__text">
            {operatotExist
              ? "Теперь вы можете зайти в личный кабинет оператора"
              : "Зарегистрируйте оператора через личный кабинет"}
          </div>
          <div className="confirm__operator">
            {operatotExist ? (
              <>
                Ваш operator_id: <span>{params.id}</span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

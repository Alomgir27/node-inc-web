import React from "react";
import { useSelectContext } from "./selectContext";

const Option = ({ children, value }) => {
  const { changeSelectedOption } = useSelectContext();

  return (
    <li className="select-option" onClick={() => changeSelectedOption(value)}>
      {children}
    </li>
  );
};

export default Option;

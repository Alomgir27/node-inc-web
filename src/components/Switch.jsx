import React from "react";

const Switch = ({ onChange,...rest  }) => {
  return (
    <label className="switch">
      <input type="checkbox" {...rest} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;

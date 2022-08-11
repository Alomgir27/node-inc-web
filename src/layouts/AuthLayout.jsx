import React from "react";

const AuthLayout = ({ children, rootClass, rightImg }) => {
  return (
    <>
      <div id="auth" className={rootClass}>
        <div className="left">
          <div className="main">{children}</div>
        </div>
        {/* <div className="right d-flex justify-content-center align-center">
          <img src={rightImg} alt="vector" className="w-75" />
        </div> */}
      </div>
    </>
  );
};

export default AuthLayout;

import React from "react";
import clsx from "clsx";

const SettingsUserImg = ({ img, withoutCamera, placeholder }) => {
  return (
    <div className="user-img-container">
      {!withoutCamera && <img src="./assets/vectors/camera.svg" alt="camera" />}
      <div className={clsx("img", { "ms-0": withoutCamera })}>
        {placeholder ? (
          <div className="placeholder"></div>
        ) : (
          <img src={img || `./assets/img/settings-user.png`} alt="user" />
        )}
      </div>
      <img src="./assets/vectors/bin-2.svg" alt="bin" />
    </div>
  );
};

export default SettingsUserImg;

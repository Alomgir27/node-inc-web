import React, { useState } from "react";
import { Link } from "react-router-dom";

import ModalScan from "../../modals/ModalScan";

const TopNav = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <>
      <ModalScan
        isOpen={isModalActive}
        modalCloseHandler={() => setIsModalActive(false)}
      />
      <div className="nav">
        <div className="dark-menu" onClick={() => setIsModalActive(true)}>
          <img src="./assets/vectors/dark-bg-menu.svg" alt="menu" />
        </div>
        <Link to="/settings" className="settings">
          {/* < to="/settings"> */}
          <img src="./assets/vectors/settings.svg" alt="settings" />
          {/* </> */}
        </Link>
        <div className="notifications">
          <img src="./assets/vectors/notifications.svg" alt="notifications" />
        </div>
        <div className="user d-flex align-items-center">
          <div className="fs-11 fw-600 mx-4">Stephan</div>
          <img src="./assets/vectors/nav-user.svg" alt="user" />
        </div>
      </div>
    </>
  );
};

export default TopNav;

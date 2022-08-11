import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import clsx from "clsx";
import Tabs from "../components/Tabs";

import $ from "jquery";
import SearchInput from "../components/SearchInput";
import ModalScan from "../modals/ModalScan";
import { useDebounce } from "../hooks/useDebounce";
import { AuthContext } from "../store/auth-context";
import { BASEURL, sendNetworkRequest } from "../http/http-request";

const navItems = [
  {
    link: "/360",
    title: "360",
    vector: "../assets/vectors/360.svg",
    animFile: "../animations/animation_kybu5p0h.json",
  },
  {
    link: "/conversations",
    title: "desk",
    vector: "../assets/vectors/desk.svg",
    animFile: "../animations/animation_kyc2cdig.json",
  },
  {
    link: "/way",
    title: "way",
    vector: "../assets/vectors/way.svg",
    animFile: "../animations/animation_kyc25zsj.json",
  },
  {
    link: "/finances-overview",
    title: "wallet",
    vector: "../assets/vectors/wallet.svg",
    animFile: "../animations/animation_kyc27m1g.json",
  },
  {
    link: "/inventory",
    title: "inventory",
    vector: "../assets/vectors/inventory.svg",
    animFile: "../animations/animation_kyc28kpf.json",
  },
  {
    link: "/workshop-realtime",
    title: "workshop",
    vector: "../assets/vectors/workshop.svg",
    animFile: "../animations/animation_kyc29iw0.json",
  },
];

const MainLayout = ({
  tabData,
  activeLink,
  contentClassName,
  children,
  title,
  minimalNavRight,
}) => {
  const itemsRef = useRef([]);
  const itemContainersRef = useRef([]);
  const [scanModalOpenState, setScanModalOpenState] = useState(false);
  const { tokens, setTokens, user } = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");
  const [clients, setClients] = useState([]);
  const [options, setOptions] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useDebounce(filterClients, 600, [keyword]);

  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };

  useEffect(() => {
    itemContainersRef.current = itemContainersRef.current.slice(
      0,
      navItems.length
    );
    itemsRef.current = itemsRef.current.slice(0, navItems.length);

    const lottieOptions = {
      renderer: "svg",
      loop: false,
      autoplay: false,
    };

    const anim1 = lottie.loadAnimation({
      ...lottieOptions,
      container: itemsRef.current[0],
      animationData: require("../animations/animation_kybu5p0h.json"),
    });
    const anim2 = lottie.loadAnimation({
      ...lottieOptions,
      container: itemsRef.current[1],
      animationData: require("../animations/animation_kyc2cdig.json"),
    });
    const anim3 = lottie.loadAnimation({
      ...lottieOptions,
      container: itemsRef.current[2],
      animationData: require("../animations/animation_kyc25zsj.json"),
    });
    const anim4 = lottie.loadAnimation({
      ...lottieOptions,
      container: itemsRef.current[3],
      animationData: require("../animations/animation_kyc27m1g.json"),
    });
    const anim5 = lottie.loadAnimation({
      ...lottieOptions,
      container: itemsRef.current[4],
      animationData: require("../animations/animation_kyc28kpf.json"),
    });
    const anim6 = lottie.loadAnimation({
      ...lottieOptions,
      container: itemsRef.current[5],
      animationData: require("../animations/animation_kyc29iw0.json"),
    });

    const anims = [anim1, anim2, anim3, anim4, anim5, anim6];

    const animLastFrame = 200;

    anim1.goToAndStop(animLastFrame, true);
    anim3.goToAndStop(animLastFrame, true);

    itemContainersRef.current.forEach((el, idx) => {
      el.addEventListener("mouseenter", (e) => {
        anims[idx].goToAndStop(0, true);
        anims[idx].setDirection(1);
        anims[idx].play();
      });
      el.addEventListener("mouseleave", (e) => {
        let frame = 0;
        if (idx === 0 || idx === 2) {
          frame = animLastFrame;
        }
        anims[idx].goToAndStop(frame, true);
      });
    });
    loadClients();
  }, []);

  const toggleSideNav = () => {
    $("#sidenav").toggleClass("active");
    $(".dark-overlay.overlay-sidenav").toggleClass("active");
  };

  const toggleTopMenu = () => {
    $(".sidemenu").toggleClass("active");
  };

  const navigate = useNavigate();
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await fetch(
        "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/signout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokens.accessToken}`,
            idToken: tokens.idToken,
            refresh_token: tokens.refreshToken,
          },
        }
      );
      localStorage.removeItem("tokens");
      setTokens(null);
      console.log("FIRSING");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  async function loadClients() {
    const response = await fetch(
      "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/core/clients",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokens.accessToken}`,
          idToken: tokens.idToken,
          refresh_token: tokens.refreshToken,
        },
      }
    );

    const _clients = await response.json();
    setClients(_clients);
    console.log(_clients);
  }

  function filterClients() {
    if (keyword === "") {
      return setOptions([]);
    }
    setOptions(
      clients
        .filter((client) => {
          if (
            client.human_identity_id.first_name.indexOf(keyword) !== -1 ||
            client.human_identity_id.last_name.indexOf(keyword) !== -1
          ) {
            return true;
          }
          return false;
        })
        .slice(0, 3)
    );
  }

  useEffect(() => {
    const fetechData = async () => {
      const data = await sendNetworkRequest(`${BASEURL}/users/me`);
      setLoggedUser(data.data.user);
    };
    fetechData();
  }, [tokens]);

  return (
    <div id="main" className="overflow-hidden">
      <ModalScan
        isOpen={scanModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setScanModalOpenState)}
      />
      <div
        className="dark-overlay overlay-sidenav"
        onClick={toggleSideNav}
      ></div>
      <div id="sidenav">
        <div className={`desc${minimalNavRight ? " minimal" : ""}`}>
          <div className="main">
            <Link to="/360">
              <img
                className="logo"
                src="../assets/vectors/logo-new.svg"
                alt="logo"
              />
            </Link>
            <div className="mt-2 text-center fw-500">{title}</div>
            <img
              className="hamburger d-1300-none"
              src="./assets/vectors/hamburger.svg"
              alt="hamburger"
              onClick={toggleSideNav}
            />

            <div className="nav">
              {[
                {
                  vector: "../assets/vectors/nav-elevate.svg",
                  vectorActive: "../assets/vectors/nav-elevate-active.svg",
                  to: "/business-360",
                  thisActiveLink: "elevate",
                  text: "Boards",
                },
                {
                  vector: "../assets/vectors/nav-connect.svg",
                  vectorActive: "../assets/vectors/nav-connect-active.svg",
                  to: "/way",
                  thisActiveLink: "connect",
                  text: "Connections",
                },
                {
                  vector: "../assets/vectors/nav-desk.svg",
                  vectorActive: "../assets/vectors/nav-desk-active.svg",
                  to: "/conversations",
                  thisActiveLink: "desk",
                  text: "Desk",
                },
                {
                  vector: "../assets/vectors/nav-inventory.svg",
                  vectorActive: "../assets/vectors/nav-inventory-active.svg",
                  to: "/inventory",
                  thisActiveLink: "inventory",
                  text: "Inventory",
                },
                {
                  vector: "../assets/vectors/nav-manner.svg",
                  vectorActive: "../assets/vectors/nav-manner-active.svg",
                  to: "/form-cards",
                  thisActiveLink: "manner",
                  text: "Tools",
                },
                {
                  vector: "../assets/vectors/nav-treasury.svg",
                  vectorActive: "../assets/vectors/nav-treasury-active.svg",
                  to: "/finances-income",
                  thisActiveLink: "treasury",
                  text: "Finances",
                },
                {
                  vector: "../assets/vectors/nav-workshop.svg",
                  vectorActive: "../assets/vectors/nav-workshop-active.svg",
                  to: "/workshop-realtime",
                  thisActiveLink: "workshop",
                  text: "Workshop",
                },
                {
                  vector: "../assets/vectors/nav-workshop.svg",
                  vectorActive: "../assets/vectors/nav-workshop-active.svg",
                  to: "/courses-live",
                  thisActiveLink: "courses",
                  text: "Courses & Activities",
                },
              ].map((el, idx) => {
                const { to, thisActiveLink, vector, vectorActive, text } = el;

                return (
                  <Link
                    className={clsx({ active: activeLink === thisActiveLink })}
                    to={to}
                    key={"nav-item-" + idx}
                  >
                    <div className="vector-cnntainer">
                      <img src={vector} alt={text} />
                      <img className="active" src={vectorActive} alt={text} />
                    </div>
                    {text}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="bottom py-5">
            <Link to="#0">
              <img src="../assets/vectors/side-bottom-usage.svg" alt="" />{" "}
              Collaborate
            </Link>
            <a href="/signin" onClick={handleLogout}>
              <img src="../assets/vectors/side-bottom-logout.svg" alt="" />{" "}
              Logout
            </a>
          </div>
        </div>
      </div>
      <div id="content" className={contentClassName ? contentClassName : ""}>
        <div className="page-container">
          <div className="head">
            <div className="sidemenu">
              <h3 className="d-none d-sm-flex">
                <img
                  src="../assets/vectors/menu-outline.svg"
                  className="me-3"
                  alt="menu"
                />
                menu
              </h3>
              <div className="sidemenu-nav">
                {navItems.map((el, idx) => {
                  const { link, title } = el;
                  return (
                    <Link
                      ref={(el) => {
                        itemContainersRef.current[idx] = el;
                      }}
                      key={"nav-item" + idx}
                      to={link}
                      className="item"
                    >
                      <div
                        className="img"
                        ref={(el) => (itemsRef.current[idx] = el)}
                      >
                        {/* <img src={vector} alt={title} /> */}
                      </div>
                      <div className="text">{title}</div>
                    </Link>
                  );
                })}
              </div>
              <div className="options">
                <div className="d-flex flex-column justify-content-center me-2 me-sm-4">
                  <Link to="/settings" className="text">
                    Logout
                  </Link>
                  <Link to="/settings" className="text">
                    Settings
                  </Link>
                </div>
                <button
                  className="btn d-flex align-items-center"
                  onClick={toggleTopMenu}
                >
                  <img src="../assets/vectors/sidemenu-close.svg" alt="close" />
                </button>
              </div>
            </div>
            <div className="page-heading">
              <img
                className="me-lg-5 me-4 hamburger d-1300-none"
                src="../assets/vectors/hamburger.svg"
                alt="hamburger"
                onClick={toggleSideNav}
              />

              {tabData && (
                <Tabs
                  tabGroupName={tabData.groupName}
                  data={tabData.tabs}
                  img={tabData.img}
                  {...tabData}
                />
              )}
            </div>
            <div className="info">
              <SearchInput
                onQrClick={() => modalOpenHandler(setScanModalOpenState)}
                placeholder="Search Clients or Things "
                onChange={({ target: { value } }) => {
                  setKeyword(value);
                }}
                onClickSuggestion={(client) => {
                  setOptions([]);
                  navigate("/way", { replace: true, state: { client } });
                }}
                options={options}
                // icon="./assets/vectors/qr.svg"
              />
              <div className="nav">
                <div
                  className="dark-menu"
                  onClick={() => modalOpenHandler(setScanModalOpenState)}
                >
                  <img src="../assets/vectors/dark-bg-menu.svg" alt="menu" />
                </div>
                <Link to="/settings" className="settings">
                  {/* < to="/settings"> */}
                  <img src="../assets/vectors/settings.svg" alt="settings" />
                  {/* </> */}
                </Link>
                <div className="notifications">
                  <img
                    src="../assets/vectors/notifications.svg"
                    alt="notifications"
                  />
                </div>
                <div className="user d-flex align-items-center">
                  <div className="fs-11 fw-600 mx-4">
                    {loggedUser && loggedUser.human_identity_id.first_name}
                  </div>
                  <img src="../assets/img/user-default.png" alt="user" />
                </div>
              </div>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
        <div className="copyright">
          © Node Technologies 2022 | All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

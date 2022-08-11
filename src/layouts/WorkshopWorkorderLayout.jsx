import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import clsx from "clsx";
import Tabs from "../components/Tabs";

import FancyInput from "../components/FancyInput";
import $ from "jquery";
import SearchInput from "../components/SearchInput";
import ModalScan from "../modals/ModalScan";
import ModalNode from "../modals/ModalNode";
import ModalRequests from "../modals/Modalrequests";
import ModalStorage from "../modals/ModalStorage";
import ModalAdditionalDAta from "../modals/ModalAdittionalData";
import ModalConnectors from "../modals/ModalConnectors";
import nodeAxios from "../utils/nodeAxios";
import moment from "moment-timezone";
import ModalMaintanance from "../modals/ModalMaintanance";
import ModalEmployee from "../modals/ModalEmployee";

const navItems = [
  {
    link: "/360",
    title: "360",
    vector: "./assets/vectors/360.svg",
    animFile: "../animations/animation_kybu5p0h.json",
  },
  {
    link: "/conversations",
    title: "desk",
    vector: "./assets/vectors/desk.svg",
    animFile: "../animations/animation_kyc2cdig.json",
  },
  {
    link: "/way",
    title: "way",
    vector: "./assets/vectors/way.svg",
    animFile: "../animations/animation_kyc25zsj.json",
  },
  {
    link: "/finances-overview",
    title: "wallet",
    vector: "./assets/vectors/wallet.svg",
    animFile: "../animations/animation_kyc27m1g.json",
  },
  {
    link: "/inventory",
    title: "inventory",
    vector: "./assets/vectors/inventory.svg",
    animFile: "../animations/animation_kyc28kpf.json",
  },
  {
    link: "/workshop-realtime",
    title: "workshop",
    vector: "./assets/vectors/workshop.svg",
    animFile: "../animations/animation_kyc29iw0.json",
  },
];

const tabData = {
  img: true,
  groupName: "workshop-articles-tabs",
  tabs: [
    {
      icon: "./assets/vectors/workshop-articles.svg",
      iconActive: "./assets/vectors/workshop-articles-active.svg",
      target: "forms",
      active: true,
    },
    {
      icon: "./assets/vectors/workshop-services.svg",
      iconActive: "./assets/vectors/workshop-services-active.svg",
      target: "articles",
    },
    // {
    //   icon: "./assets/vectors/workshop-partner.svg",
    //   iconActive: "./assets/vectors/workshop-partner-active.svg",
    //   target: "partners",
    // },
    {
      icon: "./assets/vectors/breaker.svg",
      iconActive: "./assets/vectors/breaker-active.svg",
      target: "brakeService",
    },
  ],
};

const WorkshopWorkorderLayout = ({
  activeLink = "workshop",
  contentClassName,
  children,
  title,
  invoice_id,
  percentage = 0,
  summary: { services, subTotal },
  setOdometer,
  setTime,
  loadSummary,
}) => {
  const itemsRef = useRef([]);
  const itemContainersRef = useRef([]);
  const [employeeModalOpenState, setEmployeeModalOpenState] = useState(false);
  const [scanModalOpenState, setScanModalOpenState] = useState(false);
  const [nodeModalOpenState, setNodeModalOpenState] = useState(false);
  const [nodeOpenState, setNodeOpenState] = useState(false);
  const [circles, setCircles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [orderModalOpenState, setOrderModalOpenState] = useState(false);
  const [maintananceModalOpenState, setMaintananceModalOpenState] =
    useState(false);
  const [storageModalOpenState, setStorageModalOpenState] = useState(false);
  const [additionalDataModalOpenState, setAdditionalDataOpenState] =
    useState(false);
  const [connectorModalOpenState, setConnectorOpenState] = useState(false);

  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };
  const navigate = useNavigate();

  const toggleSideNav = () => {
    $("#sidenav").toggleClass("active");
    $(".dark-overlay.overlay-sidenav").toggleClass("active");
  };

  const getClickCoords = (event) => {
    // from: https://stackoverflow.com/a/29296049/14198287
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };
  const addCircle = (event) => {
    // get click coordinates
    let [x, y] = getClickCoords(event);
    // make new svg circle element
    // more info here: https://www.w3schools.com/graphics/svg_circle.asp
    let newCircle = (
      <div
        className="carcircle"
        style={{ top: `${y - 20}px`, left: `${x - 20}px` }}
      >
        {circles.length + 1}
      </div>
    );
    let newAppointment = (
      <div className="d-flex align-items-start car-appointment">
        <div className="item mb-3">
          {circles.length + 1}. Check for{" "}
          <strong>
            {" "}
            <select
              name="problems"
              id="problems"
              className="landmark-select p-0 border-0"
            >
              <option value="volvo">Noise</option>
              <option value="saab">noise</option>
              <option value="mercedes">Noise</option>
              <option value="audi">Noise</option>
            </select>{" "}
          </strong>{" "}
          located
          <strong>
            {" "}
            <select
              name="problems"
              id="problems"
              className="landmark-select p-0 border-0"
            >
              <option value="volvo">Right</option>
              <option value="saab">Noise</option>
              <option value="mercedes">Noise</option>
              <option value="audi">Noise</option>
            </select>{" "}
          </strong>{" "}
          on
          <strong>
            {" "}
            <select
              name="problems"
              id="problems"
              className="landmark-select p-0 border-0"
            >
              <option value="volvo">Left</option>
              <option value="saab">Noise</option>
              <option value="mercedes">Noise</option>
              <option value="audi">Noise</option>
            </select>{" "}
          </strong>
          Side, when{" "}
          <strong>
            <select
              name="problems"
              id="problems"
              className="landmark-select p-0 border-0"
            >
              <option value="volvo">He drives fast</option>
              <option value="saab">Noise</option>
              <option value="mercedes">Noise</option>
              <option value="audi">Noise</option>
            </select>
          </strong>
        </div>
        <img
          id={circles.length + 1}
          src="./assets/vectors/delete.svg"
          alt="delete"
          onClick={deleteAppointment}
          className="hover"
        />
      </div>
    );

    let allCircles = [...circles, newCircle];
    let allAppointment = [...appointments, newAppointment];

    // update 'circles'
    setCircles(allCircles);
    setAppointments(allAppointment);
  };
  const deleteAppointment = (e) => {
    appointments.splice(e.target.id, 1);
    circles.splice(e.target.id, 1);
    setAppointments(appointments);
    setCircles(circles);
  };
  /*--------===> Rupok's Codes <===---------- */
  const [invoice, setInvoice] = useState({});
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [color, setColor] = useState("");
  const [assign, setAssign] = useState("");

  const loadInvoice = useCallback(async () => {
    /*=== Invoice Details === */
    const Invoice = await nodeAxios("GET", `invoice/${invoice_id}`);

    /*  if (Invoice.metadata?.landmarks) {
      const { items } = await nodeAxios("GET", `invoice/items/${invoice_id}`);
      const services = items.filter((item) => item.metadata.is_service);
      Invoice.metadata.landmarks.forEach(async (landmark) => {
        if (
          !services.find(
            (service) => service.metadata.landmark === landmark.id
          )
        ) {
          await nodeAxios("POST", "service/invoice", {
            invoice_id: invoice_id,
            service_id: landmark.id,
          });
          await nodeAxios("POST", "invoice/items", {
            invoice_id: Invoice.id,
            name: landmark.problem,
            base_price: landmark.price || 0,
            description: "No description available",
            metadata: {
              name: landmark.problem || "No title found",
              is_service: true,
              is_article: false,
              price: landmark.price || 0,
              landmark: landmark.id,
            },
          });
          loadSummary();
        }
      });
    } */
    if (Invoice.metadata.assign) {
      const assign = await nodeAxios(
        "GET",
        `users/entity/${Invoice.metadata.assign}`
      );
      setAssign(
        `${assign.human_identity_id?.first_name} ${assign.human_identity_id?.last_name}`
      );
    }
    /* Set timer value that needed in the workshop articles component*/
    setTime(Invoice.metadata.timer);
    /* Select color according to the current status of the invoice */
    if (Invoice.metadata?.status === 0) {
      setColor("#eca0a0");
    } else if (Invoice.metadata?.status === 1) {
      setColor("#2bbfc7");
    } else if (Invoice.metadata?.status === 2) {
      setColor("#1e55a9");
    }

    setInvoice(Invoice);
    localStorage.setItem(
      "invoice_target_entity_id",
      Invoice.target_entity_id.id
    );
  }, [invoice_id, setTime]);
  useEffect(() => {
    loadInvoice();
  }, [loadInvoice]);

  useEffect(() => {
    if (invoice.id) {
      (async () => {
        /* ===User Details=== */
        const user = await nodeAxios(
          "GET",
          `users/entity/${invoice.target_entity_id.id}`
        );
        localStorage.setItem("user_details", JSON.stringify(user));
        setUser(user);
      })();
    }
  }, [invoice]);

  useEffect(() => {
    (async () => {
      if (invoice.id) {
        /* ===Profile Details=== */
        const profile = await nodeAxios(
          "GET",
          `profile/obj/${invoice.principal_profile_id.id}`
        );
        localStorage.setItem("profile_id", profile.id);
        console.log(profile.id);
        setProfile(profile.data);
        const profileDetails = profile.data.name
          ? profile.data
          : JSON.parse(profile.data);
        setProfile(profileDetails);
        /* Set odometer value that needed in the workshop articles component*/
        setOdometer(profileDetails.odometer);
      }
    })();
  }, [invoice, setOdometer]);
  const handleSelectChange = async (event) => {
    const value = event.target.value;
    console.log(event.target.value);
    if (value === "convert") {
      await nodeAxios("PATCH", `invoice/${invoice_id}`, { is_invoiced: true });
    } else if (value === "move") {
      const updatedSdate = new Date(
        new Date(invoice.metadata.sdate).getTime() + 60 * 60 * 24 * 1000
      ).toISOString();
      const updatedEdate = new Date(
        new Date(invoice.metadata.edate).getTime() + 60 * 60 * 24 * 1000
      ).toISOString();

      const response = await nodeAxios("PATCH", `invoice/${invoice_id}`, {
        metadata: { sdate: updatedSdate, edate: updatedEdate },
      });
      setInvoice(response.invoice);
    } else if (value === "delete") {
      await nodeAxios("DELETE", `invoice/${invoice_id}`);
      navigate("/workshop-realtime");
    } else if (value === "change") {
      setEmployeeModalOpenState(true);
    }
  };
  return (
    <div id="workshop-workorder-layout">
      <ModalEmployee
        isOpen={employeeModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setEmployeeModalOpenState)}
        loadInvoice={loadInvoice}
      />
      <ModalScan
        isOpen={scanModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setScanModalOpenState)}
      />
      <ModalNode
        isOpen={nodeModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setNodeModalOpenState)}
      />
      <ModalRequests
        isOpen={orderModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setOrderModalOpenState)}
      />
      <ModalMaintanance
        isOpen={maintananceModalOpenState}
        modalCloseHandler={() =>
          modalCloseHandler(setMaintananceModalOpenState)
        }
      />
      <ModalStorage
        invoice={invoice}
        isOpen={storageModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setStorageModalOpenState)}
      />
      <ModalAdditionalDAta
        isOpen={additionalDataModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setAdditionalDataOpenState)}
      />
      <ModalConnectors
        isOpen={connectorModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setConnectorOpenState)}
        profile={invoice.principal_profile_id}
        invoice={invoice}
      />
      <div className="head">
        <div className="sidemenu">
          <h3 className="d-none d-sm-flex">
            <img
              src="./assets/vectors/menu-outline.svg"
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
                  <div className="text">Card #{invoice.auto_id}</div>
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
              // onClick={toggleTopMenu}
            >
              <img src="./assets/vectors/sidemenu-close.svg" alt="close" />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-start">
          <div className="d-flex flex-column align-items-center pt-2">
            <Link to="/360">
              <img
                className="logo"
                src="./assets/vectors/logo-new.svg"
                alt="logo"
              />
            </Link>
            <div className="mt-2 text-center fw-600">
              Card #{invoice.auto_id}
            </div>
          </div>
          <div className="page-heading d-flex">
            <img
              className="me-lg-5 me-4 hamburger d-1300-none"
              src="./assets/vectors/hamburger.svg"
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
        </div>
        <div className="d-flex info">
          <div className="text-neumorphic-section col-lg-10 mb-3">
            {invoice.metadata?.name}
          </div>

          <div className="col-sm-6">
            <FancyInput
              select
              placeholder="Select action the menu"
              options={[
                {
                  text: "Delete Card",
                  value: "delete",
                  selected: false,
                },
                {
                  text: "Change assigned",
                  value: "change",
                  selected: false,
                },
                {
                  text: "Move Card for Tomorrow",
                  value: "move",
                  selected: false,
                },
                {
                  text: "Convert to Invoice",
                  value: "convert",
                  selected: false,
                },
                {
                  text: "Select action the menu...",
                  selected: true,
                },
              ]}
              name="Action"
              inputClassName="custom-select"
              onChange={handleSelectChange}
            />
          </div>
          <div className="nav">
            <Link to="/settings" className="settings">
              {/* < to="/settings"> */}
              <img src="./assets/vectors/settings.svg" alt="settings" />
              {/* </> */}
            </Link>
            <div className="notifications">
              <img
                src="./assets/vectors/notifications.svg"
                alt="notifications"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="content" className={contentClassName ? contentClassName : ""}>
        <div id="sidenav">
          <div className={`desc`}>
            <div className="workshop-workorder-layout">
              <div className="nav">
                {[
                  {
                    vector: "./assets/vectors/nav-elevate.svg",
                    vectorActive: "./assets/vectors/nav-elevate-active.svg",
                    to: "/business-360",
                    thisActiveLink: "elevate",
                  },
                  {
                    vector: "./assets/vectors/nav-connect.svg",
                    vectorActive: "./assets/vectors/nav-connect-active.svg",
                    to: "/conversations",
                    thisActiveLink: "connect",
                  },
                  {
                    vector: "./assets/vectors/nav-desk.svg",
                    vectorActive: "./assets/vectors/nav-desk-active.svg",
                    to: "#0",
                    thisActiveLink: "desk",
                  },
                  {
                    vector: "./assets/vectors/nav-inventory.svg",
                    vectorActive: "./assets/vectors/nav-inventory-active.svg",
                    to: "/inventory",
                    thisActiveLink: "inventory",
                  },
                  {
                    vector: "./assets/vectors/nav-manner.svg",
                    vectorActive: "./assets/vectors/nav-manner-active.svg",
                    to: "/form-cards",
                    thisActiveLink: "manner",
                  },
                  {
                    vector: "./assets/vectors/nav-treasury.svg",
                    vectorActive: "./assets/vectors/nav-treasury-active.svg",
                    to: "/finances-income",
                    thisActiveLink: "treasury",
                  },
                  {
                    vector: "./assets/vectors/nav-workshop.svg",
                    vectorActive: "./assets/vectors/nav-workshop-active.svg",
                    to: "/workshop-realtime",
                    thisActiveLink: "workshop",
                    active: true,
                  },
                ].map((el, idx) => {
                  const { to, thisActiveLink, vector, vectorActive, text } = el;

                  return (
                    <Link
                      className={clsx({
                        active: activeLink === thisActiveLink,
                      })}
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
                <img src="./assets/vectors/side-bottom-usage.svg" alt="" />{" "}
              </Link>
              <Link to="#0">
                <img src="./assets/vectors/side-bottom-logout.svg" alt="" />{" "}
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="page-container"> */}
        <div className="body flex-grow-1">
          <div id="workshop-forms-main-content">
            <div className="container-fluid">
              <div className="row gy-3">
                <div className="col-xxl">
                  <div className="car-main d-flex flex-column align-items-center mt-4 py-2">
                    <div className="d-flex justify-content-evenly mb-3">
                      <img
                        className="workshop-car-logo rounded mr-3"
                        src={profile.image?.url}
                        alt={profile.name}
                        width="25%"
                      />
                      <div className="d-flex flex-column">
                        <div className="fs-18 fw-700">
                          <p>
                            {profile.label} {profile.name}
                          </p>
                          {profile.year} {profile.make} {profile.model}
                        </div>
                        <div className="fs-18 fw-400 lh-1 mt-2">
                          {profile.engine}
                        </div>
                        <div className="fs-14 fw-300">{profile.serial}</div>
                      </div>
                    </div>

                    <div
                      className={`car-info car-info-${invoice.metadata?.status}`}
                    >
                      <div className="date-time">
                        <div
                          className="d-flex align-items-center w-80"
                          style={{ width: 142 }}
                        >
                          <div
                            style={{ background: color }}
                            className="circle round-box"
                          ></div>
                          <div className="fs-16 fw-bold" style={{ color }}>
                            {invoice?.metadata?.sdate &&
                              new Intl.DateTimeFormat("fr-CA", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(invoice?.metadata?.sdate))}
                          </div>
                        </div>
                        <div className="fs-16" style={{ paddingLeft: "13px" }}>
                          {invoice?.metadata?.sdate &&
                            moment(invoice?.metadata?.sdate).format(
                              "HH:mm"
                            )}{" "}
                          -{" "}
                          {invoice?.metadata?.edate &&
                            moment(invoice?.metadata?.edate).format(
                              "HH:mm"
                            )}{" "}
                        </div>
                      </div>

                      <div className="location d-flex">
                        <div className="fw-bold d-flex w-80">
                          <div className="location">
                            <div className="fw-bold">{assign}</div>
                          </div>

                          {invoice.metadata?.landmarks?.map((el, i) => (
                            <img
                              src={`./assets/vectors/${el.problem
                                ?.replace(/\s/g, "")
                                .toLowerCase()}.svg`}
                              alt="delete"
                              className="hover"
                              width="20%"
                            />
                          ))}

                          {/*  <img
                            src="./assets/vectors/lmcel.svg"
                            alt="delete"
                            className="hover"
                            width="20%"
                          />
                          <img
                            src="./assets/vectors/lmti.svg"
                            alt="delete"
                            className="hover"
                            width="20%"
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="w-100 progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${percentage}%`, background: color }}
                          aria-valuenow={percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div className="w-75 my-5">
                      <div className="d-flex align-items-center mb-3  workshop-articals-headings"></div>
                      {/* <div className="d-flex align-items-start car-appointment">
                        <div className="item mb-3">
                          1. Check for{" "}
                          <strong>
                            {" "}
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">Noise</option>
                              <option value="saab">noise</option>
                              <option value="mercedes">Noise</option>
                              <option value="audi">Noise</option>
                            </select>{" "}
                          </strong>{" "}
                          <strong>
                            {" "}
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">
                                {invoice.metadata?.landmarks?.side}
                              </option>
                            </select>{" "}
                          </strong>{" "}
                          on
                          <strong>
                            {" "}
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">Left</option>
                              <option value="saab">Noise</option>
                              <option value="mercedes">Noise</option>
                              <option value="audi">Noise</option>
                            </select>{" "}
                          </strong>
                          Side, when{" "}
                          <strong>
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">He drives fast</option>
                              <option value="saab">Noise</option>
                              <option value="mercedes">Noise</option>
                              <option value="audi">Noise</option>
                            </select>
                          </strong>
                        </div>
                        <img
                          id={circles.length + 1}
                          src="./assets/vectors/delete.svg"
                          alt="delete"
                          onClick={deleteAppointment}
                          className="hover"
                        />
                      </div> */}
                      {invoice.metadata?.landmarks?.map((el, i) => {
                        const [firstSide, secondSide] =
                          el.side?.split(" ") || [];
                        return (
                          <div className="d-flex align-items-start car-appointment">
                            <div className="item mb-3">
                              {i + 1}. Check for <strong> {el.problem}</strong>{" "}
                              located <strong>{firstSide}</strong> on{" "}
                              <strong>{secondSide}</strong> Side, when{" "}
                              <strong>{el.when}</strong>
                            </div>
                          </div>
                        );
                      })}
                      {/* <div className="d-flex align-items-start car-appointment">
                        <div className="item mb-3">
                          2. Check for{" "}
                          <strong>
                            {" "}
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">Noise</option>
                              <option value="saab">noise</option>
                              <option value="mercedes">Noise</option>
                              <option value="audi">Noise</option>
                            </select>{" "}
                          </strong>{" "}
                          located
                          <strong>
                            {" "}
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">Right</option>
                              <option value="saab">Noise</option>
                              <option value="mercedes">Noise</option>
                              <option value="audi">Noise</option>
                            </select>{" "}
                          </strong>{" "}
                          on
                          <strong>
                            {" "}
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">Left</option>
                              <option value="saab">Noise</option>
                              <option value="mercedes">Noise</option>
                              <option value="audi">Noise</option>
                            </select>{" "}
                          </strong>
                          Side, when{" "}
                          <strong>
                            <select
                              name="problems"
                              id="problems"
                              className="landmark-select p-0 border-0"
                            >
                              <option value="volvo">He drives fast</option>
                              <option value="saab">Noise</option>
                              <option value="mercedes">Noise</option>
                              <option value="audi">Noise</option>
                            </select>
                          </strong>
                        </div>
                        <img
                          id={circles.length + 1}
                          src="./assets/vectors/delete.svg"
                          alt="delete"
                          onClick={deleteAppointment}
                          className="hover"
                        />
                      </div> */}
                    </div>

                    <div className="w-75">
                      <div className="d-flex align-items-center mb-3  workshop-articals-headings"></div>
                      <div className="d-flex align-items-start justify-content-between flex-column car-appointment">
                        <button
                          className="utilties-btn emboss-white"
                          onClick={() =>
                            modalOpenHandler(setConnectorOpenState)
                          }
                        >
                          <img
                            src="./assets/vectors/connector.svg"
                            alt="delete"
                            className="hover"
                          />
                          Connectors
                        </button>
                        <button
                          className="utilties-btn emboss-white"
                          onClick={() =>
                            modalOpenHandler(setAdditionalDataOpenState)
                          }
                        >
                          <img
                            src="./assets/vectors/np_fix.svg"
                            alt="delete"
                            onClick={deleteAppointment}
                            className="hover"
                          />
                          Additional data
                        </button>
                        <button
                          className="utilties-btn emboss-white"
                          onClick={() =>
                            modalOpenHandler(setStorageModalOpenState)
                          }
                        >
                          <img
                            src="./assets/vectors/np_box.svg"
                            alt="delete"
                            onClick={deleteAppointment}
                            className="hover"
                          />
                          Manage Storage
                        </button>
                        <button
                          className="utilties-btn emboss-white"
                          onClick={() =>
                            modalOpenHandler(setOrderModalOpenState)
                          }
                        >
                          <img
                            src="./assets/vectors/Vector-1.svg"
                            alt="delete"
                            onClick={deleteAppointment}
                            className="hover"
                          />
                          New Request
                        </button>
                        <button
                          className="utilties-btn emboss-white"
                          onClick={() =>
                            modalOpenHandler(setMaintananceModalOpenState)
                          }
                        >
                          <img
                            src="./assets/vectors/darkeye.svg"
                            alt="delete"
                            onClick={deleteAppointment}
                            className="hover"
                            width="6%"
                          />
                          Maintenance
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-5 col-lg-7">
                  <div className="wrap">{children}</div>
                </div>
                <div className="col-xxl col-lg-3 d-xxl-none"></div>
                <div className="col-xxl col-lg-5">
                  <div className="card">
                    <div className="mb-5 d-flex">
                      <div className="d-flex">
                        <Link to="/way-client">
                          <img
                            className="mt-2 col-10"
                            src={
                              // user.entityLinks[0]?.url ||
                              "./assets/img/table-user-2.png"
                            }
                            alt="client"
                          />
                        </Link>
                        <div>
                          <h3 className="section-title">
                            {user.human_identity_id?.first_name}{" "}
                            {user.human_identity_id?.middle_name}{" "}
                            {user.human_identity_id?.last_name}
                          </h3>
                          <p>{user.phone?.phone_number_id.number}</p>
                          <p>
                            {user.email?.email_address_id.contact}
                            {user.email?.email_address_id.domain}
                          </p>
                        </div>
                      </div>
                    </div>

                    {services.length > 0 ? (
                      <section>
                        <div className="details-main">
                          {/* <div className="item">
                            <div
                              className="c-pointer img"
                              onClick={() =>
                                modalOpenHandler(setNodeModalOpenState)
                              }
                            >
                              <img
                                src="./assets/vectors/details-img.svg"
                                alt="img"
                              />
                            </div>
                            <div className="text">
                              <div className="line">
                                <div className="fw-600">Front Brake Change</div>
                                <h4 className="sub-title">87.00$</h4>
                              </div>
                              <div className="line">
                                <div className="sub-title text-light-5 fs-12">
                                  Front Brake Change
                                </div>
                                <div className="fw-600 text-blue">x1</div>
                              </div>
                              <h5 className="mt-3 sub-title fw-500 text-blue mb-1">
                                Front brake change with original parts
                              </h5>
                              <div className="line">
                                <div className="radio-container">
                                  <label className="custom-radio">
                                    Front Pad X2
                                    <input
                                      defaultChecked={true}
                                      type="checkbox"
                                      name="gender"
                                      defaultValue={"checked"}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                                <h5 className="sub-title">40.00$</h5>
                              </div>
                              <div className="line">
                                <div className="radio-container">
                                  <label className="custom-radio">
                                    Labor X1
                                    <input
                                      defaultChecked={true}
                                      type="checkbox"
                                      name="gender"
                                      defaultValue={"checked"}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                                <h5 className="sub-title">47.00$</h5>
                              </div>
                            </div>
                          </div> */}
                          {services.map((service) => (
                            <div className="single_service">
                              <div className="service_heading d-flex justify-content-between mb-4">
                                <h3>{service.metadata.name}</h3>
                                <p>${service.metadata.price * 95.5}</p>
                              </div>
                              {service.metadata.articles.map((article) => {
                                return (
                                  <div className="item">
                                    <div
                                      className="c-pointer img"
                                      onClick={() =>
                                        modalOpenHandler(setNodeModalOpenState)
                                      }
                                    >
                                      <img
                                        src="./assets/vectors/details-img.svg"
                                        alt="img"
                                      />
                                    </div>
                                    <div className="text">
                                      <div className="line">
                                        <div className="fw-600">
                                          {article.metadata?.name}
                                        </div>
                                        <h4 className="sub-title">
                                          {article.metadata.price}$
                                        </h4>
                                      </div>
                                      <div className="line">
                                        <div className="sub-title text-light-5 fs-12">
                                          {article.metadata?.sku}
                                        </div>
                                        <div className="fw-600 text-blue">
                                          x{article.metadata?.quantity || 1}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>

                        <div className="details-foot">
                          <div className="col-12">
                            <div className="row px-3 pt-4">
                              <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-12">
                                Subtotal
                              </div>
                              <div className="col-6 pb-3 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                                {subTotal}$
                              </div>
                              <div className="col-6 text-dark-4 text-manrope fw-800 fs-12">
                                TPS
                              </div>
                              <div className="col-6 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                                {(subTotal * 0.05).toFixed(2)}$
                              </div>
                              <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-12">
                                TVQ
                              </div>
                              <div className="col-6 pb-3 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                                {(subTotal * 0.09975).toFixed(2)}$
                              </div>
                              <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-14">
                                Total
                              </div>
                              <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-14 d-flex justify-content-end">
                                {(
                                  subTotal +
                                  subTotal * 0.05 +
                                  subTotal * 0.09975
                                ).toFixed(2)}
                                $
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    ) : (
                      <p>No items found! 🤨</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="copyright">
        © Node Technologies 2022 | All Rights Reserved
      </div>
    </div>
  );
};

export default WorkshopWorkorderLayout;

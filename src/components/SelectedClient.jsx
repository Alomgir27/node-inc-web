import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import TabContents from "./TabContents";
import TabContentItem from "./TabContentItem";
import AddBtn from "./AddBtn";
import ModalProfile from "../modals/ModalProfile";
import ModalOrder from "../modals/ModalOrder";
import ModalAppointment from "../modals/ModalAppointment";
import { genderResolver } from "../utils/genderResolver";
import { AuthContext } from "../store/auth-context";
import axios from "axios";

export default function SelectedClient({ client }) {
  const {
    tokens,
    user: { user },
  } = useContext(AuthContext);
  const [serviceSheets, setServiceSheets] = useState(null);
  const [invoices, setInvoices] = useState(null);
  const [userProfiles, setUserProfiles] = useState(null);
  const [profileModalOpenState, setProfileModalOpenState] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [orderModalOpenState, setOrderModalOpenState] = useState(false);
  const [appointmentModalOpenState, setAppointmentModalOpenState] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/all/specific-entity/service/${client.entityId}`,
        });
        setServiceSheets(
          res.data.invoices.length > 0 ? res.data.invoices : null
        );
        const resInvoice = await axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/all/specific-entity/invoice/${client.entityId}`,
        });
        console.log(
          `Invoices: ${JSON.stringify(resInvoice.data.invoices, null, 2)}`
        );
        setInvoices(
          resInvoice.data.invoices.length > 0 ? resInvoice.data.invoices : null
        );

        const resProfiles = await axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/single-user/profile/all/${client.entityId}`,
        });
        // console.log(JSON.parse(resProfiles.data[0].object_id.data));
        setUserProfiles(resProfiles.data);
        handleActiveProfile(resProfiles.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (client) fetchData();
  }, [client]);

  const modalOpenHandler = (func) => func(true);
  const modalCloseHandler = (func) => func(false);
  const handleActiveProfile = (el) => {
    console.log(el.id);
    // console.log(JSON.stringify(el, null, 2));
    el.object_id.parsedData = JSON.parse(el.object_id.data);
    setActiveProfile(el);
  };
  return (
    <>
      <ModalOrder
        isOpen={orderModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setOrderModalOpenState)}
      />
      <div id="client-overview-main-content" className="mt-4 mt-sm-0">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-md-9 col-sm-7 d-flex flex-column user-jumbotron-container">
              <div className="user-jumbotron-wrap flex-grow-1">
                <div className="user-jumbotron h-100">
                  <div className="top d-flex align-items-start"></div>
                  <div className="profile-info">
                    <div className="left">
                      <div className="img">
                        <img
                          src={
                            // singleClient.human_identity_id.gender &&
                            // singleClient.human_identity_id.gender === 0
                            "./assets/img/boyDefault.png"
                            // : "./assests/img/girlDefault.png"
                          }
                          // src={singleClient.profilePic?.file_id?.link}
                          alt="client-img"
                          width="100%"
                        />
                        {client.connection.connection_id.is_active && (
                          <div className="badge">Noded</div>
                        )}
                      </div>
                      <div className="social">
                        <button className="btn">
                          <img
                            className="social_icons"
                            src="./assets/vectors/np_phone.svg"
                            alt="profile"
                          />
                        </button>
                        <button className="btn">
                          <img
                            className="social_icons"
                            src="./assets/vectors/np_email.svg"
                            alt="profile"
                          />
                        </button>
                        <button className="btn">
                          <img
                            className="social_icons"
                            src="./assets/vectors/np_map.svg"
                            alt="profile"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="right">
                      <div className="d-flex justify-content-start align-items-start flex-md-row flex-column justify-content-md-between">
                        <div>
                          <div className="user-name d-flex align-items-center">
                            <h4 className="evidence-word gradient-text">
                              {client.human_identity_id.middle_name === null
                                ? `${client.human_identity_id.first_name} ${client.human_identity_id.last_name}`
                                : `${client.human_identity_id.first_name} ${client.human_identity_id.middle_name} ${client.human_identity_id.last_name}`}
                            </h4>
                          </div>
                          <div className="location">
                            <div className="text fw-400">
                              {client.address_id === null
                                ? `Do as the mice do, grind to get everything 🐭`
                                : `${client.address_id.address_line_1} ${client.address_id.address_line_2}`}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container-fluid px-0 mt-4 pt-2">
                        <div className="row gx-0 gy-4">
                          <div className="col-md-8">
                            <div className="text-bold">
                              {`${client.email_id.contact}@${client.email_id.domain}`}
                            </div>
                            <h5 className="sub-title text-light-2">
                              Email address
                            </h5>
                          </div>
                          <div className="col-md-4">
                            <div className="text-bold">
                              {" "}
                              {client.phone === null
                                ? `There is no phone 🤯`
                                : client.phone?.phone_number_id?.number}
                            </div>
                            <h5 className="sub-title text-light-2">Phone</h5>
                          </div>
                          <div className="col-md-8">
                            <div className="row gy-4">
                              <div className="col-md-6">
                                <div className="text fw-400">
                                  {client.human_identity_id.DOB
                                    ? `${new Date(
                                        client.human_identity_id.DOB
                                      ).getMonth()}/${new Date(
                                        client.human_identity_id.DOB
                                      ).getDate()}/${new Date(
                                        client.human_identity_id.DOB
                                      ).getFullYear()}`
                                    : "Avoid tricking 🙈"}
                                </div>
                                <h5 className="sub-title text-light-2">
                                  Date of Birth
                                </h5>
                              </div>
                              <div className="col-md-6">
                                <div className="text fw-400">
                                  Nothing to say
                                </div>
                                <h5 className="sub-title text-light-2">
                                  About me
                                </h5>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="text fw-400">Male / Female</div>
                            <h5 className="sub-title text-light-2">
                              {client.human_identity_id.gender
                                ? genderResolver[
                                    client.human_identity_id.gender
                                  ]
                                : "Sexe"}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-5 garage-specs-container">
              <div className="card garage-card">
                <img src="./assets/vectors/garage.svg" alt="garage" />
                <h3 className="section-title mt-2">Worshop Specs</h3>
                <div className="text-x-small mt-2 mb-3 desc-p">
                  Based on customer responses and Node's artificial intelligence
                </div>

                <div className="section">
                  <div className="text-x-bold">Top 50</div>
                  <div className="text-x-small">Best users</div>
                </div>
                <div className="section">
                  <div className="text-x-bold">21</div>
                  <div className="text-x-small">Number of cards</div>
                </div>
                <div className="section">
                  <div className="text-x-bold">Yes, 4 boxes</div>
                  <div className="text-x-small">Internal storage</div>
                </div>
                <div className="section">
                  <div className="text-x-bold">724 km</div>
                  <div className="text-x-small">Odometer between visits</div>
                </div>
              </div>
            </div>
            <div className="col-12"></div>
            <div className="col-12">
              <TabContents tabGroupName="client-overview-tabs mt-5">
                <TabContentItem target="profile">
                  <div className="container-fluid px-0">
                    <div className="row gx-lg-5 gy-5">
                      <div className="col-lg-4">
                        <div className="last-work-orders">
                          <div className="d-flex justify-content-between title-container">
                            <div className="title">
                              <h3 className="text-neumorphic-section">Cards</h3>
                            </div>
                            <ModalAppointment
                              isOpen={appointmentModalOpenState}
                              modalCloseHandler={() =>
                                modalCloseHandler(setAppointmentModalOpenState)
                              }
                            />
                          </div>
                          <div className="emboss-white br-16 mt-2 ">
                            <div className="listing-container short-vertical-scrollbar">
                              <div className="listing mt-3">
                                {serviceSheets ? (
                                  serviceSheets.map((invoice) => (
                                    <div key={invoice.id} className="list-item">
                                      <div className="order-num d-flex align-items-center">
                                        <div
                                          className="round-box"
                                          style={{
                                            backgroundColor: "#7E8876",
                                          }}
                                        ></div>
                                        <div className="text-dark-2">
                                          {invoice.id}
                                        </div>
                                      </div>
                                      <div className="order-date">
                                        <div className="text-light-4">
                                          {`${new Date(
                                            invoice.invoice_date
                                          ).getFullYear()}-${
                                            new Date(
                                              invoice.invoice_date
                                            ).getMonth() + 1
                                          }-${new Date(
                                            invoice.invoice_date
                                          ).getDate()}`}
                                        </div>
                                      </div>
                                      <div className="order-price">
                                        <div className="">
                                          {invoice.subtotal}$
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div
                                    className="text-center"
                                    style={{ padding: "10px" }}
                                  >
                                    <p className="text-light-2">
                                      No card found for this user
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 profiles-container">
                        <div className="d-flex justify-content-between title-container">
                          <div className="title ps-4">
                            <h3 className="text-neumorphic-section">
                              Profiles
                            </h3>
                          </div>
                          <ModalProfile
                            isOpen={profileModalOpenState}
                            modalCloseHandler={() =>
                              modalCloseHandler(setProfileModalOpenState)
                            }
                            user={user}
                            setUserProfiles={setUserProfiles}
                            currentUser={user}
                          />
                          <AddBtn
                            title="NEW"
                            pale
                            onClick={() =>
                              modalOpenHandler(setProfileModalOpenState)
                            }
                          />
                        </div>

                        <div className="profiles-main  mt-2">
                          <div className="left">
                            {userProfiles &&
                              userProfiles.map((el) => {
                                const data = JSON.parse(el.object_id.data);

                                return (
                                  <div
                                    className="items mb-3"
                                    onClick={() => handleActiveProfile(el)}
                                  >
                                    <div
                                      key={"prod-list" + el.id}
                                      className={clsx(
                                        "item br-10 d-flex align-items-center",
                                        {
                                          active: activeProfile?.id === el.id,
                                        },
                                        {
                                          "emboss-md-inner":
                                            el.id === activeProfile?.id
                                              ? true
                                              : false,
                                        }
                                      )}
                                    >
                                      <div
                                        className="img"
                                        // style={{ backgroundColor: "" }}
                                      >
                                        <img
                                          src={
                                            "/assets/vectors/toyota-prius-prime.svg"
                                          }
                                          alt={data.name}
                                        />
                                      </div>
                                      <div className="text">
                                        <div className="text-dark-3 fw-600">
                                          {data.name}
                                        </div>
                                        <h5 className="sub-title fs-12">
                                          {data.serial}
                                        </h5>
                                        <div className="text-dark-3 fw-400 fs-10 text-montserrat d-flex align-items-center">
                                          {el.is_active && "Validated"}
                                          {el.is_active && (
                                            <img
                                              className="ms-2"
                                              src="./assets/vectors/validated.svg"
                                              alt="validated"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="right emboss-white  br-16 p-4">
                            {activeProfile && (
                              <>
                                <div className="head">
                                  <div className="d-flex justify-content-between">
                                    <div className="fs-20 fw-600 mb-6 margin-tip-section">
                                      Internal Label :{" "}
                                      {activeProfile.object_id.parsedData.name}
                                    </div>
                                    <div
                                      className="d-flex align-items-start text-blue text-montserrat fw-400 fs-12 me-sm-4"
                                      style={{ maxWidth: "100px" }}
                                    >
                                      <img
                                        className="img-profile"
                                        src={
                                          activeProfile.object_id.parsedData
                                            .image?.url
                                        }
                                        alt="No img found"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="container-fluid px-0">
                                  <div className="row">
                                    <div className="section mb-2">
                                      <div className="text-dark-3 fw-600">
                                        {
                                          activeProfile.object_id.parsedData
                                            .serial
                                        }
                                      </div>
                                      <div className="text-light-5 text-montserrat fs-11">
                                        Serial Number (VIN)
                                      </div>
                                    </div>
                                    <div className="section mb-2">
                                      <div className="text-dark-3 fw-600">
                                        {
                                          activeProfile.object_id.parsedData
                                            .name
                                        }
                                      </div>
                                      <div className="text-light-5 text-montserrat fs-11">
                                        Vehicle Name
                                      </div>
                                    </div>
                                    <div className="section mb-2">
                                      <div className="text-dark-3 fw-600">
                                        {
                                          activeProfile.object_id.parsedData
                                            .engine
                                        }
                                      </div>
                                      <div className="text-light-5 text-montserrat fs-11">
                                        Engine
                                      </div>
                                    </div>
                                    <div className="container-fluid px-3">
                                      <div className="row">
                                        <div className="col-sm-4 col-6">
                                          <div className="section">
                                            <div className="text-dark-3 fw-600">
                                              {
                                                activeProfile.object_id
                                                  .parsedData.odometer
                                              }{" "}
                                              km
                                              {/* {activeProfile.object_id
                                                  .parsedData.transmission ===
                                                ""
                                                  ? "Cannot find transmission data"
                                                  : activeProfile.object_id
                                                      .parsedData.transmission} */}
                                            </div>
                                            {/* <div className="text-light-5 text-montserrat">
                                                Transmission
                                              </div>
                                              <div className="text-dark-3 fw-600">
                                                {activeProfile.object_id
                                                  .parsedData.transmission ===
                                                ""
                                                  ? "Cannot find transmission data"
                                                  : activeProfile.object_id
                                                      .parsedData.transmission}
                                              </div> */}
                                          </div>
                                          <div className="text-light-5 text-montserrat fs-11">
                                            Odometer
                                          </div>
                                        </div>
                                        <div className="col-sm-4 col-6">
                                          <div className="section">
                                            <div className="text-dark-3 fw-600">
                                              {
                                                activeProfile.object_id
                                                  .parsedData.tire
                                              }
                                            </div>
                                            <div className="text-light-5 text-montserrat fs-11">
                                              Tires
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-4 col-6">
                                          <div className="section">
                                            <div className="text-dark-3 fw-600">
                                              {
                                                activeProfile.object_id
                                                  .parsedData.plate
                                              }
                                            </div>
                                            <div className="text-light-5 text-montserrat fs-11">
                                              Car Plate
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="btns d-flex flex-wrap flex-column flex-sm-row mt-3">
                                    <button className="bottom-btns-profile btn m-2 btn-emboss">
                                      <img
                                        id="1"
                                        src="./assets/vectors/scan.svg"
                                        alt="dollar"
                                        // onClick={HandelProfileBottomBtns}
                                        width="40%"
                                      />
                                    </button>
                                    <ModalAppointment
                                      isOpen={appointmentModalOpenState}
                                      modalCloseHandler={() =>
                                        modalCloseHandler(
                                          setAppointmentModalOpenState
                                        )
                                      }
                                    />
                                    <button
                                      className="bottom-btns-profile btn m-2 btn-emboss"
                                      onClick={() =>
                                        modalOpenHandler(
                                          setProfileModalOpenState
                                        )
                                      }
                                    >
                                      <img
                                        id="2"
                                        src="./assets/vectors/editblue.svg"
                                        alt="dollar"
                                        width="40%"
                                      />
                                    </button>
                                    <button className="bottom-btns-profile btn m-2 btn-emboss">
                                      <img
                                        id="3"
                                        src="./assets/vectors/userlink.svg"
                                        alt="dollar"
                                        width="40%"
                                        // onClick={HandelProfileBottomBtns}
                                      />
                                    </button>
                                    <button className="bottom-btns-profile btn m-2 btn-emboss">
                                      <img
                                        src="./assets/vectors/clock.svg"
                                        alt="dollar"
                                        width="40%"
                                        // onClick={HandelProfileBottomBtns}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabContentItem>
                <TabContentItem target="invoices">
                  <div className="container-fluid p-0">
                    <div className="row gx-sm-5 gy-5">
                      <div className="col-lg-6 invoices-wrapper">
                        <div className="invoices-main">
                          <div className="d-flex justify-content-between title-container align-items-start">
                            <div className="title ps-3">
                              <h3 className="text-neumorphic-section">
                                Invoices
                              </h3>
                            </div>
                          </div>
                          <div className="emboss-white br-16">
                            <div className="listing-container">
                              <div className="listing">
                                {invoices ? (
                                  invoices.map((invoice) => (
                                    <div className="list-item" key={invoice.id}>
                                      <div className="order-num d-flex align-items-center">
                                        <div
                                          className="round-box"
                                          style={{
                                            backgroundColor: "#7E8876",
                                          }}
                                        ></div>
                                        <div className="text-dark-2">
                                          {invoice.id}
                                        </div>
                                      </div>
                                      <div className="order-date">
                                        <div className="text-light-4">
                                          {`${new Date(
                                            invoice.invoice_date
                                          ).getFullYear()}-${
                                            new Date(
                                              invoice.invoice_date
                                            ).getMonth() + 1
                                          }-${new Date(
                                            invoice.invoice_date
                                          ).getDate()}`}
                                        </div>
                                      </div>
                                      <div className="order-price price-1">
                                        <div className="">
                                          {invoice.subtotal}$
                                        </div>
                                      </div>
                                      <div className="order-price">
                                        {/* <div className="price-text">
                                            {price2}$ */}
                                        {/* <div className="price-sign">
                                            <img
                                              src="./assets/vectors/dollar-sign.svg"
                                              alt="dollar"
                                            />
                                          </div> */}
                                        {/* </div> */}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div
                                    className="text-center"
                                    style={{ padding: "10px" }}
                                  >
                                    <h3 className="text-light-2">
                                      No invoice yet!
                                    </h3>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="forms-main">
                          <div className="d-flex justify-content-between title-container">
                            <div className="title ps-3">
                              <h3 className="text-neumorphic-section">Files</h3>
                            </div>
                            <AddBtn pale />
                          </div>
                          <div className="emboss-white br-16">
                            <div className="listing-container short-vertical-scrollbar">
                              <div className="listing">
                                {/* {[
                                    {
                                      label: "Inspection",
                                      name: "WO #893788784",
                                      date: "2021-10-22",
                                    },
                                    {
                                      label: "Note",
                                      name: "WO #893788784",
                                      date: "2021-10-22",
                                    },
                                    {
                                      label: "Brake Photo",
                                      name: "photo-brake.jpg",
                                      date: "2021-10-22",
                                    },
                                    {
                                      label: "Inspection",
                                      name: "WO #893788784",
                                      date: "2021-10-22",
                                    },
                                    {
                                      label: "Scratch",
                                      name: "WO #893788784",
                                      date: "2021-10-22",
                                    },
                                    {
                                      label: "Outside verification",
                                      name: "WO #893788784",
                                      date: "2021-10-22",
                                    },
                                    {
                                      label: "Note",
                                      name: "WO #893788784",
                                      date: "2021-10-22",
                                    },
                                  ].map((el, idx) => {
                                    const { label, name, date } = el; */}

                                {invoices &&
                                  invoices.map(
                                    (invoice) =>
                                      invoice.invoice_file_id && (
                                        <>
                                          <div
                                            className="list-item"
                                            key={"ins" + invoice.id}
                                          >
                                            <div className="label">
                                              <div className="text-dark-2">
                                                {invoice.metadata.name}
                                              </div>
                                            </div>
                                            <div className="name text-light-4">
                                              {invoice.invoice_file_id.id}
                                            </div>
                                            <div className="date">
                                              <div className="font-montserrat text-end">
                                                {`${new Date(
                                                  invoice.invoice_date
                                                ).getFullYear()}-${
                                                  new Date(
                                                    invoice.invoice_date
                                                  ).getMonth() + 1
                                                }-${new Date(
                                                  invoice.invoice_date
                                                ).getDate()}`}
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabContentItem>
                <TabContentItem target="requests">
                  <div className="container-fluid px-0 ">
                    <div className="row">
                      <div className="col-lg-7 requests-container">
                        <div className="d-flex justify-content-between title-container">
                          <div className="title">
                            <h3 className="text-neumorphic-section">
                              Requests
                            </h3>
                          </div>
                        </div>
                        <div className="emboss-white br-16 ps-4 pe-4">
                          <div className="requests-list-container short-vertical-scrollbar">
                            <div className="requests-list mt-4">
                              {[
                                {
                                  incoming: true,
                                  titleText: "Appointment 12/01/2022",
                                  boxClr: "#5165F7",
                                  category: 3,
                                  date: "Due in 2 days",
                                },
                                {
                                  incoming: false,
                                  titleText: "Call To FLW UP",
                                  boxClr: "#5197F8",
                                  category: 3,
                                  date: "Due in 7 days",
                                },
                                {
                                  incoming: true,
                                  titleText: "Appointment 02/12/2021",
                                  boxClr: "#FA8036",
                                  category: 3,
                                  date: "Done 7 days ago",
                                },
                              ].map((el, idx) => {
                                const { titleText, date, category, incoming } =
                                  el;

                                return (
                                  <div
                                    className="requests-list-item c-pointer"
                                    key={"req-list" + idx}
                                    onClick={() => {
                                      modalOpenHandler(setOrderModalOpenState);
                                    }}
                                  >
                                    <div className="mini-info">
                                      <img
                                        src={
                                          incoming
                                            ? "./assets/vectors/incoming-request.svg"
                                            : "./assets/vectors/outgoing-request.svg"
                                        }
                                        className="me-3"
                                        alt="request-accept"
                                      />
                                      <div className="text-dark-2">
                                        {titleText}
                                      </div>
                                    </div>
                                    <div className="more-info">
                                      <div className="todo d-flex align-items-center">
                                        <div
                                          className="round-box me-2"
                                          style={{
                                            backgroundColor: "#C26666",
                                          }}
                                        ></div>
                                        <div className="caption">To do</div>
                                      </div>
                                      <div className="prod-name">
                                        <h5 className="sub-title">
                                          Category {category}
                                        </h5>
                                      </div>
                                      <div className="date">
                                        <h5 className="sub-title">{date}</h5>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 interactions-container mt-lg-0 mt-5">
                        <div className="d-flex justify-content-between title-container">
                          <div className="title">
                            <h3 className="text-neumorphic-section">
                              Interactions
                            </h3>
                          </div>
                        </div>
                        <div className="emboss-white br-16">
                          <div className="listing-container interactions-container short-vertical-scrollbar">
                            <div className="listing mt-0">
                              {[
                                {
                                  titleText: "Email",
                                  date: "21 Sep 2021",
                                },
                                {
                                  titleText: "Phone",
                                  time: "00:01:32",
                                  date: "21 Sep 2021",
                                },
                              ].map((el, idx) => {
                                const { titleText, date, time } = el;

                                return (
                                  <div
                                    className="list-item"
                                    key={"req-list" + idx}
                                  >
                                    <div className="text-dark-2">
                                      {titleText}
                                    </div>
                                    <div className="time">
                                      <h5 className="sub-title">{time}</h5>
                                    </div>
                                    <div className="date">
                                      <h5 className="sub-title">{date}</h5>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabContentItem>
              </TabContents>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

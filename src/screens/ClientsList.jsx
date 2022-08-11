import React, { useEffect, useState } from "react";
import clsx from "clsx";

import MainLayout from "../layouts/MainLayout";
import TabContents from "../components/TabContents";
import TabContentItem from "../components/TabContentItem";
import AddBtn from "../components/AddBtn";
import ModalLifeActivity from "../modals/ModalLifeActivity";
import ModalOrder from "../modals/ModalOrder";
import ModalProfile from "../modals/ModalProfile";
import ModalAppointment from "../modals/ModalAppointment";
// import ModalForm from "../modals/ModalForm";
import ModalQRCode from "../modals/ModalQRCode";
import ModalClinte from "../modals/ModalClient";
import axios from "axios";
import { genderResolver } from "../utils/genderResolver";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const ClientsList = () => {
  const { state } = useLocation();
  const [activityOpenState, setActivityOpenState] = useState(false);
  const [orderModalOpenState, setOrderModalOpenState] = useState(false);
  const [clinteModalOpenState, setClinteModalOpenState] = useState(false);
  const [clientSelected, setClientSelected] = useState(false);
  const [profileModalOpenState, setProfileModalOpenState] = useState(false);
  const [appointmentModalOpenState, setAppointmentModalOpenState] =
    useState(false);
  const [qrModalOpenState, setQRModalOpenState] = useState(false);

  const [signedInUser, setSignedInUser] = useState(null);

  const [singleClient, setSingleClient] = useState(null);
  const [userConnections, setUserConnections] = useState([]);
  const [serviceSheets, setServiceSheets] = useState(null);
  const [invoices, setInvoices] = useState(null);
  const [userProfiles, setUserProfiles] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [activeProfileType, setActiveProfileType] = useState(null);
  const [newClient, setNewClient] = useState(false);
  const [edit, setEdit] = useState(false);

  const modalOpenHandler = (func) => func(true);
  const modalCloseHandler = (func) => func(false);

  const handleActiveProfile = (el) => {
    el.object_id.parsedData = JSON.parse(el.object_id.data);
    setActiveProfile(el);
    setActiveProfileType(el.object_id.type);
  };
  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const loadConnections = async () => {
      const res = await axios({
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/me`,
      });

      setSignedInUser(res.data.user);

      try {
        if (signedInUser.id) {
          const response = await fetch(
            `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/connections/${signedInUser?.id}/0`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokens.accessToken}`,
                idToken: tokens.idToken,
                refresh_token: tokens.refreshToken,
              },
            }
          );

          const connectionsData = await response.json();
          setUserConnections(connectionsData.connections);
          console.log(connectionsData.connections);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadConnections();
  }, [signedInUser?.id, newClient]);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const fetchData = async () => {
      console.log(`entity: ${singleClient.entityId}`);
      try {
        const res = await axios({
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/all/specific-entity/service/${singleClient.entityId}`,
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
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/all/specific-entity/invoice/${singleClient.entityId}`,
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
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/single-user/profile/all/${singleClient.entityId}`,
        });
        // console.log(JSON.parse(resProfiles.data[0].object_id.data));
        setUserProfiles(resProfiles.data);
        handleActiveProfile(resProfiles.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (singleClient) fetchData();
  }, [singleClient]);

  useEffect(() => {
    if (state?.client) {
      loadClientData(state.client);
    }
  }, [state]);

  const loadClientData = async (client) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    try {
      const data = await axios({
        method: "GET",
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/entity/${client.entity_id.id}`,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      });

      try {
        const profilePicture = await axios({
          method: "GET",
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/profile/picture/${data.data.id}`,
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
        });

        setSingleClient({
          ...client,
          entityId: client.entity_id.id,
          connection: { connection_id: { is_active: false } },
          profilePic: profilePicture.data,
        });
        setClientSelected(true);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeProfile) console.log(JSON.stringify(activeProfile, null, 2));
  }, [activeProfile]);

  return (
    <MainLayout
      headVector="./assets/vectors/way-connect.svg"
      title="Users"
      lightBorder
      activeLink="connect"
      tabData={
        clientSelected && {
          img: true,
          tabGroupName: "client-overview-tabs",
          data: [
            {
              icon: "./assets/vectors/np_user_active.svg",
              iconActive: "./assets/vectors/np_user.svg",
              target: "profile",
              active: true,
            },
            {
              icon: "./assets/vectors/profile.svg",
              iconActive: "./assets/vectors/profile-active.svg",
              target: "invoices",
            },
            {
              icon: "./assets/vectors/requests.svg",
              iconActive: "./assets/vectors/requests-active.svg",
              target: "requests",
            },
          ],
        }
      }
    >
      <ModalLifeActivity
        isOpen={activityOpenState}
        modalCloseHandler={() => modalCloseHandler(setActivityOpenState)}
      />
      <ModalOrder
        isOpen={orderModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setOrderModalOpenState)}
      />
      <ModalQRCode
        isOpen={qrModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setQRModalOpenState)}
      />
      <ModalClinte
        isOpen={clinteModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setClinteModalOpenState)}
        headClassName="clintemodal-head"
        setNewClient={setNewClient}
      />
      {clientSelected ? (
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
                          {singleClient.connection?.connection_id.is_active && (
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
                                {singleClient.human_identity_id.middle_name ===
                                null
                                  ? `${singleClient.human_identity_id.first_name} ${singleClient.human_identity_id.last_name}`
                                  : `${singleClient.human_identity_id.first_name} ${singleClient.human_identity_id.middle_name} ${singleClient.human_identity_id.last_name}`}
                              </h4>
                            </div>
                            <div className="location">
                              <div className="text fw-400">
                                {singleClient.address_id === null
                                  ? `Unable to find the right road 🧭`
                                  : `${singleClient.address_id.address_line_1} ${singleClient.address_id.address_line_2}`}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="container-fluid px-0 mt-4 pt-2">
                          <div className="row gx-0 gy-4">
                            <div className="col-md-8">
                              <div className="text-bold">
                                {`${singleClient.email_id.contact}@${singleClient.email_id.domain}`}
                              </div>
                              <h5 className="text fw-400 fs-10">
                                Email address
                              </h5>
                            </div>
                            <div className="col-md-4">
                              <div className="text-bold">
                                {" "}
                                {singleClient.phone === null
                                  ? `There is no phone 🤯`
                                  : singleClient.phone.phone_number_id.number}
                              </div>
                              <h5 className="text fw-400 fs-10">Phone</h5>
                            </div>
                            <div className="col-md-8">
                              <div className="row gy-4">
                                <div className="col-md-6">
                                  <div className="text fw-400">
                                    {singleClient.human_identity_id.DOB
                                      ? `${new Date(
                                          singleClient.human_identity_id.DOB
                                        ).getMonth()}/${new Date(
                                          singleClient.human_identity_id.DOB
                                        ).getDate()}/${new Date(
                                          singleClient.human_identity_id.DOB
                                        ).getFullYear()}`
                                      : "Avoid tricking 🙈"}
                                  </div>
                                  <h5 className="text fw-400 fs-10">
                                    Date of Birth
                                  </h5>
                                </div>
                                <div className="col-md-6">
                                  <div className="text fw-400">
                                    Nothing to say
                                  </div>
                                  <h5 className="text fw-400 fs-10">
                                    About me
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text fw-400">Male / Female</div>
                              <h5 className="text fw-400 fs-10">
                                {singleClient.human_identity_id.gender
                                  ? genderResolver[
                                      singleClient.human_identity_id.gender
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
                    Based on customer responses and Node's artificial
                    intelligence
                  </div>

                  <div className="section">
                    <div className="text-x-bold">Top 50</div>
                    <div className="text-x-small">Best users</div>
                  </div>
                  <div className="section">
                    <div className="text-x-bold">21</div>
                    <div className="text-x-small">Internal Credit</div>
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
                                <h3 className="text-neumorphic-section">
                                  Cards
                                </h3>
                              </div>
                              <ModalAppointment
                                isOpen={appointmentModalOpenState}
                                modalCloseHandler={() =>
                                  modalCloseHandler(
                                    setAppointmentModalOpenState
                                  )
                                }
                              />
                            </div>
                            <div className="emboss-white br-16 mt-2 ">
                              <div className="listing-container short-vertical-scrollbar">
                                <div className="listing mt-3">
                                  {serviceSheets ? (
                                    serviceSheets.map((invoice) => (
                                      <div
                                        key={invoice.id}
                                        className="list-item"
                                      >
                                        <div className="order-num d-flex align-items-center">
                                          <div
                                            className="round-box"
                                            style={{
                                              backgroundColor: "#7E8876",
                                            }}
                                          ></div>
                                          <div className="text-dark-2">
                                            Card #{invoice.auto_id}
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
                              user={signedInUser}
                              setUserProfiles={setUserProfiles}
                              currentUser={singleClient}
                              activeProfile={activeProfile}
                              edit={edit}
                            />
                            <AddBtn
                              title="NEW"
                              pale
                              onClick={() => {
                                modalOpenHandler(setProfileModalOpenState);
                                setEdit(false);
                              }}
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
                                          <div className="text fw-600">
                                            {data.name}
                                          </div>
                                          <h5 className="text fw-500 fs-12">
                                            {data.serial}
                                          </h5>
                                          <div className="text fw-400 fs-10">
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
                              {activeProfile &&
                                (activeProfile.object_id.type === "vehicle" ? (
                                  <>
                                    {" "}
                                    <div className="head">
                                      <div className="d-flex justify-content-between">
                                        <div className="fs-20 fw-600 mb-6 mt-1">
                                          Label:
                                          {
                                            activeProfile.object_id.parsedData
                                              .label
                                          }
                                        </div>
                                        <div
                                          className="d-flex align-items-start text-blue text-montserrat fw-400 fs-12 mt-2"
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
                                          <div className="text fw-400 fs-10 mb-3">
                                            Serial Number (VIN)
                                          </div>
                                        </div>
                                        <div className="section mb-2">
                                          <div className="text-dark-3 fw-600">
                                            {`${activeProfile.object_id.parsedData.year} ${activeProfile.object_id.parsedData.make} ${activeProfile.object_id.parsedData.model}`}
                                          </div>
                                          <div className="text fw-400 fs-10 mb-3">
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
                                          <div className="text fw-400 fs-10 mb-3">
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
                                              <div className="text fw-400 fs-10 mb-3">
                                                Odometer
                                              </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  {
                                                    activeProfile.object_id
                                                      .parsedData.tires
                                                  }
                                                </div>
                                                <div className="text fw-400 fs-10 mb-3">
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
                                                <div className="text fw-400 fs-10 mb-3">
                                                  Car Plate
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="btns d-flex flex-wrap flex-column flex-sm-row mt-3">
                                        <button
                                          className="bottom-btns-profile btn m-2 btn-emboss"
                                          onClick={() => {
                                            modalOpenHandler(
                                              setQRModalOpenState
                                            );
                                          }}
                                        >
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
                                          onClick={() => {
                                            modalOpenHandler(
                                              setProfileModalOpenState
                                            );
                                            setEdit(true);
                                          }}
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
                                ) : activeProfile.object_id.type ===
                                  "ONROADCAR" ? (
                                  <>
                                    {" "}
                                    <div className="head">
                                      <div className="d-flex justify-content-between">
                                        <div className="fs-20 fw-600 mb-6 margin-tip-section">
                                          Node Client :
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
                                            VIN here
                                          </div>
                                          <div className="text-light-5 text-montserrat fs-11">
                                            Serial Number (VIN)
                                          </div>
                                        </div>
                                        <div className="section mb-2">
                                          <div className="text-dark-3 fw-600">
                                            odometer value here
                                          </div>
                                          <div className="text-light-5 text-montserrat fs-11">
                                            Odometer
                                          </div>
                                        </div>
                                        <div className="section mb-2">
                                          <div className="text-dark-3 fw-600">
                                            Plate value here
                                          </div>
                                          <div className="text-light-5 text-montserrat fs-11">
                                            Plate
                                          </div>
                                        </div>
                                        <div className="container-fluid px-3">
                                          <div className="row">
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Modal here
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
                                                Modal
                                              </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Year here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Year
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Make here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Make
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="btns d-flex flex-wrap flex-column flex-sm-row mt-3">
                                        <button
                                          className="bottom-btns-profile btn m-2 btn-emboss"
                                          onClick={() => {
                                            modalOpenHandler(
                                              setQRModalOpenState
                                            );
                                          }}
                                        >
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
                                          onClick={() => {
                                            modalOpenHandler(
                                              setProfileModalOpenState
                                            );
                                            setEdit(true);
                                          }}
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
                                ) : activeProfile.object_id.type ===
                                  "NODYME" ? (
                                  <>
                                    {" "}
                                    <div className="head">
                                      <div className="d-flex justify-content-between">
                                        <div className="fs-20 fw-600 mb-6 margin-tip-section">
                                          Name:{" "}
                                          {
                                            activeProfile?.object_id?.parsedData
                                              ?.firstName
                                          }{" "}
                                          {
                                            activeProfile?.object_id?.parsedData
                                              ?.lastName
                                          }
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
                                        <div className="container-fluid px-3 mt-5">
                                          <div className="row">
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Email here
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
                                                Email
                                              </div>
                                            </div>
                                            <div className="col-sm-6 col-9">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Phone here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Phone
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Year here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Year
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Month here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Month
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Day here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Day
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="btns d-flex flex-wrap flex-column flex-sm-row mt-3">
                                        <button
                                          className="bottom-btns-profile btn m-2 btn-emboss"
                                          onClick={() => {
                                            modalOpenHandler(
                                              setQRModalOpenState
                                            );
                                          }}
                                        >
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
                                          onClick={() => {
                                            modalOpenHandler(
                                              setProfileModalOpenState
                                            );
                                            setEdit(true);
                                          }}
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
                                ) : activeProfile.object_id.type ==
                                  "NODYCONTACT" ? (
                                  <>
                                    {" "}
                                    <div className="head">
                                      <div className="d-flex justify-content-between">
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
                                        <div className="container-fluid px-3 mt-5">
                                          <div className="row">
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Phone here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Phone
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  email here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Email
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="btns d-flex flex-wrap flex-column flex-sm-row mt-3">
                                        <button
                                          className="bottom-btns-profile btn m-2 btn-emboss"
                                          onClick={() => {
                                            modalOpenHandler(
                                              setQRModalOpenState
                                            );
                                          }}
                                        >
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
                                          onClick={() => {
                                            modalOpenHandler(
                                              setProfileModalOpenState
                                            );
                                            setEdit(true);
                                          }}
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
                                ) : activeProfile.object_id.type == "ATHOME" ? (
                                  <>
                                    {" "}
                                    <div className="head">
                                      <div className="d-flex justify-content-between">
                                        <div
                                          className="d-flex align-items-start text-blue text-montserrat fw-400 fs-12 me-sm-4"
                                          style={{ maxWidth: "100px" }}
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="container-fluid px-0">
                                      <div className="row">
                                        <div className="container-fluid px-3 mt-5">
                                          <div className="row">
                                            <div className="col-sm-4 col-6">
                                              <div className="section">
                                                <div className="text-dark-3 fw-600">
                                                  Address here
                                                </div>
                                                <div className="text-light-5 text-montserrat fs-11">
                                                  Address
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="btns d-flex flex-wrap flex-column flex-sm-row mt-3">
                                        <button
                                          className="bottom-btns-profile btn m-2 btn-emboss"
                                          onClick={() => {
                                            modalOpenHandler(
                                              setQRModalOpenState
                                            );
                                          }}
                                        >
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
                                          onClick={() => {
                                            modalOpenHandler(
                                              setProfileModalOpenState
                                            );
                                            setEdit(true);
                                          }}
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
                                ) : (
                                  ""
                                ))}
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
                                      <div
                                        className="list-item"
                                        key={invoice.id}
                                      >
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
                                <h3 className="text-neumorphic-section">
                                  Files
                                </h3>
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
                                  const {
                                    titleText,
                                    date,
                                    category,
                                    incoming,
                                  } = el;

                                  return (
                                    <div
                                      className="requests-list-item c-pointer"
                                      key={"req-list" + idx}
                                      onClick={() =>
                                        modalOpenHandler(setOrderModalOpenState)
                                      }
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
      ) : (
        <div id="client-list-main-content">
          <div className="container-fluid mt-3">
            <div className="w-100 d-flex justify-content-end">
              <AddBtn
                pale
                title="New"
                onClick={() => modalOpenHandler(setClinteModalOpenState)}
              />
            </div>
            <div className="row g-5 mt-3">
              {userConnections?.length > 0 ? (
                userConnections?.map((el, idx) => {
                  return (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 col-12"
                      key={"client-list" + idx}
                    >
                      <ClientCard
                        setClientSelected={setClientSelected}
                        entityId={
                          el.connection_id.target_entity_id.id ===
                          signedInUser.entity_id.id
                            ? el.entity_id.id
                            : el.connection_id.target_entity_id.id
                        }
                        setSingleClient={setSingleClient}
                        connection={el}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="col-12 w-100 h-100 d-flex justify-content-center align-items-center loader-container">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ClientsList;

const ClientCard = ({
  entityId,
  setClientSelected,
  setSingleClient,
  connection,
}) => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const fetchData = async () => {
      try {
        const data = await axios({
          method: "GET",
          url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/entity/${entityId}`,
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
        });

        try {
          const profilePicture = await axios({
            method: "GET",
            url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/profile/picture/${data.data.id}`,
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
              refresh_token: tokens.refreshToken,
              idToken: tokens.idToken,
            },
          });
          console.log(profilePicture.data);
          setProfilePic(profilePicture.data.picture);
        } catch (error) {
          console.log(error);
        }

        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [entityId]);

  const handleClientClick = () => {
    setClientSelected(true);
    setSingleClient({ ...user, entityId, connection, profilePic });
  };
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/way-client") {
      if (localStorage.getItem("user_details")) {
        const user = JSON.parse(localStorage.getItem("user_details"));
        setClientSelected(true);
        setSingleClient(user);
      } else {
        navigate("/way");
      }
      localStorage.removeItem("user_details");
    }
  }, [location.pathname, navigate, setClientSelected, setSingleClient]);
  return user ? (
    <div className="client-card emboss-md" onClick={() => handleClientClick()}>
      <div className="head">
        <div className="img" style={{ background: "#CAD4E3" }}>
          {/* {profilePic && (
            <img src={profilePic?.file_id?.link} alt={"Profile"} />
          )} */}
          <img
            src={
              // user.human_identity_id.gender &&
              // user.human_identity_id.gender === 0
              "./assets/img/boyDefault.png"
              // : "./assests/img/girlDefault.png"
            }
            alt={"Profile"}
          />
        </div>
        <div className="text">
          <h3 className="section-title">{user.human_identity_id.first_name}</h3>
          <div className="ts-16">{user.human_identity_id.last_name}</div>
        </div>
      </div>
      <div className="body">
        <div className="section">
          <div className="text-dark-4 fw-400">{`${user.email_id.contact}@${user.email_id.domain}`}</div>
          <div className="text-small">Email</div>
        </div>
        <div className="section">
          <div className="text-dark-4 fw-400">
            {user.phone === null
              ? "Oh no! There is none 🤯"
              : user.phone.phone_number_id.number}
            <div className="text-small">Phone</div>
          </div>
        </div>
        <div className="section noded">
          {/* {noded && <button className="btn btn-vert">Noded</button>} */}
        </div>
      </div>
    </div>
  ) : (
    <p>...</p>
  );
};

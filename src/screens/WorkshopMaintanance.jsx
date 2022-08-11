import React, { useEffect, useState } from "react";
import clsx from "clsx";

import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import WorkshopLayout from "../layouts/WorkshopLayout";
import FancyInput from "../components/FancyInput";
import ModalAppointment from "../modals/ModalAppointment";
import { BASEURL, sendNetworkRequest } from "../http/http-request";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

const WorkshopMaintanance = () => {
  const [activeMaintenance, setActiveMaintenance] = useState();
  const [activeProfile, setActiveProfile] = useState("");
  const [appointmentModalOpenState, setAppointmentModalOpenState] =
    useState(false);
  const [profiles, setProfiles] = useState([]);
  const [data, setData] = useState([]);
  const [tag, setTag] = useState([]);
  const [data1, setData1] = useState([]);
  const [dateForFetchData, setDateForFetchData] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [storageData, setStorageData] = useState([]);
  const [itemprofile, setItemProfile] = useState([]);
  const [cardData, setCardData] = useState([]);

  const onChangeDate = (e) => {
    setDateForFetchData(e.target.value);
    setItemProfile([]);
    setCardData([]);
  }

  const previousDate = () => {
    setDateForFetchData(moment(dateForFetchData).subtract(1, "day").format("YYYY-MM-DD"));
    setItemProfile([]);
    setCardData([]);
  };

  const nextDate = () => {
    setDateForFetchData(moment(dateForFetchData).add(1, "days").format("YYYY-MM-DD"));
    setItemProfile([]);
    setCardData([]);
  };

  const handelActiveMaintenance = (e) => {
    setActiveMaintenance(e.target.id);

    profiles.map((el, idx) => {
      if (idx == e.target.id) {
        setActiveProfile(el);

        let item = [];
        el?.tags.map((e) => {
          item.push(JSON.parse(e));
        });
        setTag(item);
        setData(JSON.parse(el?.profile_id?.data));
      }
    });
  };

  const dataFetch = async () => {
    try {
      const res = await sendNetworkRequest(
        `${BASEURL}/forecast/entity/maintenance/0`
      );
      console.log(res);
      setProfiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };
  const deleteActive = async (id) => {
    // console.log(id);
    const tokens = localStorage.getItem("tokens");
    const myToken = JSON.parse(tokens);
    const options = {
      method: "DELETE",
      url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/forecast/maintenance/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken.accessToken}`,
        idToken: myToken.idToken,
        refresh_token: myToken.refreshToken,
      },
    };
    await axios(options)
      .then((res) => {
        console.log(res);
        alert("Successful");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Fail");
      });
  };

  const getInvoiceItem = async (invoice_id, sdate, name, client_name) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: 'GET',
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/items/${invoice_id}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokens.accessToken}`,
          idToken: tokens.idToken,
          refresh_token: tokens.refreshToken,
        }
      };
      await axios(options).then((res) => {
        console.log(res);
        res.data.items.map((item) => {
          if(item?.metadata?.is_article === true){
          let value = {
            id: invoice_id,
            client_name: client_name,
            circleColor: "#4ACBD3",
            name: item?.metadata?.name,
            quantity: item?.metadata?.quantity,
            verifed: true,
            serialNumber: item?.metadata?.sku,
            date: sdate,
            modal: name,
          }
          setCardData(oldvalue => [...oldvalue, value]);
        }
        })
        console.log(cardData)
      })
    } catch(err){
      console.log(err);
    }
  }

  const getStorageItem = async (id) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: 'GET',
        url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/profile/${id}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokens.accessToken}`,
          idToken: tokens.idToken,
          refresh_token: tokens.refreshToken,
        }
      };
      await axios(options).then((res) => {
        // console.log(res);
        res.data.profile.map((e) => {
          setItemProfile(oldvalue => [...oldvalue, e]);
        })
      })
    } catch(err){
      console.log(err);
    }
  }


  const Fetchdata1 = async (DATE) => {
    try {
      const res = await sendNetworkRequest(
        `${BASEURL}/invoice/date/${moment(DATE).format(
          "MM-DD-YYYY"
        )}/service/owner`
      );
      console.log(res);
      setData1(res.data.invoices)
     } catch(err) {
       console.log(err);
     }
  }

  useEffect(() => {
    setStorageData(itemprofile);
    // console.log(itemprofile);
  },[itemprofile]);

  useEffect(() => {
    if(data1){
      data1.map((item) => {
        // console.log(JSON.parse(item.principal_profile_id.data))
        const value = JSON.parse(item?.principal_profile_id?.data);
        // console.log(item);
        getStorageItem(item?.principal_profile_id?.id);
        getInvoiceItem(item?.id, item?.metadata?.sdate, value.name, item?.metadata?.client_name);
      })
    }
  }, [data1]);

  useEffect(() => {
    Fetchdata1(dateForFetchData);
  }, [dateForFetchData]);

  useEffect(() => {
    dataFetch();
  }, []);

  // const dummyData = [
  //   {
  //     circleColor: "#ECA0A0",
  //     name: "Brake Pad",

  //     paidDate: "15/APR/2020",
  //     verifed: false,
  //     serialNumber: "982934872986",
  //     date: "14:30",
  //     modal: "2016 Honda Accord",
  //   },
  //   {
  //     circleColor: "#4ACBD3",
  //     name: "Brake disc",
  //     paidDate: "15/APR/2020",
  //     verifed: true,
  //     serialNumber: "982934872986",
  //     date: "16:30",
  //     modal: "2019 Honda Accord",
  //   },
  //   {
  //     circleColor: "#4ACBD3",
  //     name: "oil 5W30",

  //     paidDate: "",
  //     verifed: true,
  //     serialNumber: "982934872986",
  //     date: "16:30",
  //     modal: "2017 Honda Accord",
  //   },
  // ];
  // const dummyData2 = [
  //   {
  //     location: "Location A",
  //     box: "Box 234",
  //   },
  //   {
  //     location: "Location B",
  //     box: "Box 67",
  //   },
  // ];
  return (
    <WorkshopLayout title="Forecast">
      <ModalAppointment
        isOpen={appointmentModalOpenState}
        modalCloseHandler={() =>
          modalCloseHandler(setAppointmentModalOpenState)
        }
      />
      <div className="discounts-container">
        <div className="container-fluid px-2 row justify-content-between">
          <div className="col-9 ">
            <div className=" d-flex justify-content-between">
              <div className="mx-3 d-flex justify-content-center align-items-center gap-2">
              <button
                  className="bottom-btns-profile btn m-2 btn-emboss"
                  onClick={() => previousDate()}
                >
                  <img
                    src="./assets/vectors/arrow-left-blue.svg"
                    alt="arrow-up"
                  />
                </button>
                <FancyInput
                  id="date"
                  type="date"
                  name="date"
                  placeholder="start time"
                  inputClassName="dateInput"
                  onChange={onChangeDate}
                  value={dateForFetchData}
                />
                 <button
                    className="bottom-btns-profile btn m-2 btn-emboss"
                    onClick={() => nextDate()}
                  >
                    <img
                      src="./assets/vectors/arrow-right-blue.svg"
                      alt="arrow-left"
                    />
                  </button>
              </div>
              <div className="w-50 d-flex justify-content-between">
                <div className="d-flex flex-column align-items-center w-50 me-3">
                  <div className="d-flex align-items-end">
                    <img class="active" src="./assets/vectors/np_list.svg" />
                    <h1 className="px-3 gradient-text">{cardData.length}</h1>
                    <h2 className="gradient-text pb-2">articles</h2>
                  </div>
                  <div className="progress-bar w-100 in-progress mt-2">
                    <div className="progress" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center w-50">
                  <div className="d-flex align-items-end justify-content-around">
                    <img class="active" src="./assets/vectors/np_issue.svg" />
                    <h1 className="px-3 nextup-gradient-text">2</h1>
                    <h2 className="nextup-gradient-text pb-2">issues</h2>
                  </div>
                  <div className="progress-bar w-100 nextup-progress mt-2">
                    <div className="progress" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5">
              <div className="table-wrapper px-3 short-vertical-scrollbar">
                <div className="table">
                  {cardData && (
                    cardData.map((data, idx) => {
                      return (
                       <Link 
                       to="/workshop-articles"
                      onClick={() => {
                        localStorage.setItem("invoiceId", data.id);
                        localStorage.setItem("invoiceClient", data.client_name);
                      }}
                       >
                         <div
                          key={"li" + idx}
                          className="row align-items-center mb-4 py-2 px-4 emboss-row dummy-data"
                        >
                          <div className="col-3 d-flex flex-column gap-1">
                            <div className="name">{data.name}</div>
                          </div>
                          <div className="col-1 d-flex flex-column gap-1">
                            <div>
                              <div className="chip-circle"></div>
                              <div className="chip-text">{data?.quantity ? data.quantity : 0}x</div>
                            </div>
                          </div>
                          <div className="col-3 d-flex flex-column gap-1">
                            <div
                              className={`${
                                data.verifed == true
                                  ? "gradient-text"
                                  : "nextup-gradient-text"
                              } fw-500 d-flex w-75 justify-content-evenly align-items-center`}
                            >
                              <div
                                className={`chip-circle ${
                                  data.verifed == true
                                    ? "chip-circle-varifed"
                                    : "chip-circle-unvarified"
                                }`}
                              ></div>
                              <div>
                                {data.verifed == true
                                  ? "Everythings fine"
                                  : "Must be Verifed"}
                              </div>
                            </div>
                          </div>
                          <div className="col-1 d-flex flex-column gap-1">
                            <div>
                              <div className="chip-text">{moment(data.date).format('hh:mm')}</div>
                            </div>
                          </div>
                          <div className="col-2 d-flex flex-column gap-1 pe-2 ">
                            <div className="amount fw-400">{data.modal}</div>
                          </div>
                          <div className="col-2 d-flex justify-content-center align-items-center gap-3 pe-2 more-menu">
                            {data.serialNumber}
                          </div>
                        </div>
                       </Link>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div>
              <div className="w-100 d-flex justify-content-end">
                <div className="d-flex flex-column align-items-center w-100 me-3">
                  <div className="d-flex align-items-end">
                    <img class="active" src="./assets/vectors/tire-1.svg" />
                    <h1 className="px-3 done-gradient-text">{storageData.length}</h1>
                    <h2 className="done-gradient-text pb-2">tires</h2>
                  </div>
                  <div className="progress-bar w-100 done-progress mt-2">
                    <div className="progress" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5">
              {storageData && (
                storageData.map((data) => {
                  return (
                    <div className="emboss-row p-2 fw-600 text-center mb-3">
                      {data?.storageType} - {data?.box}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <div className="row gy-5">
            <div className="col-lg-5">
              <div className=" br-16 px-3 py-4 h-100">
                <div className="funcs my-4 px-2 d-flex justify-content-between">
                  <SearchInput
                    rootClassName="w-100"
                    placeholder="Type a Client Name or Maintenance"
                  />
                  {/* <AddBtn title="NEW" /> */}
                </div>

                <div className="left-items px-2">
                  {profiles.map((el, idx) => {
                    const { active, name, client, date } = el;

                    return (
                      <div
                        id={idx}
                        className={clsx(
                          `item p-3 hover  rounded mt-4 w-75 ${
                            activeMaintenance == idx ? "emboss-row" : ""
                          }`
                        )}
                        onClick={handelActiveMaintenance}
                      >
                        <div
                          id={idx}
                          className="d-flex justify-content-between"
                        >
                          <div id={idx} className="fw-600">
                            {name}
                          </div>
                          <h5 id={idx} className="text-light-5 sub-title">
                            {moment(el?.reco_date).format("DD-MM-YYYY")}
                          </h5>
                        </div>
                        <h5 id={idx} className=" text-light-5 sub-title m-0">
                          {client}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-lg-7 ps-lg-5">
              <div className="d-flex mt-4 justify-content-start mb-5"></div>
              <div className="row mt-5 emboss-inner p-5 rounded-3">
                <div className="col-12 d-flex">
                  <div className="w-50">
                    <h1 className="fs-20">{activeProfile.client}</h1>
                    <p className="fs-14 text-muted mt-1 mb-4">{data?.name}</p>
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{ width: "35%" }}
                  >
                    <button
                      className="rounded-circle p-4 border-0 emboss-inner "
                      onClick={() =>
                        modalOpenHandler(setAppointmentModalOpenState)
                      }
                    >
                      <img
                        class="active "
                        src="./assets/vectors/appointment-dark.svg"
                      />
                    </button>
                    <button className="rounded-circle p-4 border-0 emboss-inner">
                      <img
                        class="active "
                        src="./assets/vectors/requests-dark.svg"
                        width="25px"
                      />
                    </button>
                    <button
                      className="rounded-circle p-4 border-0 emboss-inner"
                      onClick={() => deleteActive(activeProfile.id)}
                    >
                      <img
                        class="active "
                        src="./assets/vectors/close.png"
                        width="20px"
                      />
                    </button>
                  </div>
                </div>
                {activeMaintenance ? (
                  <div className="row">
                    <div className="col-6 my-4">
                      <h2 className="mb-2">{activeProfile.name}</h2>
                      <p className="text-muted">Maintenance Name</p>
                    </div>
                    <div className="col-6 my-4">
                      <h2 className="mb-2">
                        {moment(activeProfile.reco_date).format("DD-MM-YYYY")}
                      </h2>
                      <p className="text-muted">Next Date Recomended</p>
                    </div>
                    <div className="col-12 my-4">
                      <h2 className="mb-2 flex">
                        {tag && tag.map((e) => e.label + " ")}
                      </h2>
                      <p className="text-muted">Next KM Recomended</p>
                    </div>
                    <div className="col-12 my-4">
                      <h2 className="mb-2">
                        {moment(activeProfile.created_at).format(
                          "DD-MM-YYYYY HH:MM A"
                        )}
                      </h2>
                      <p className="text-muted">Created on</p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkshopLayout>
  );
};

export default WorkshopMaintanance;

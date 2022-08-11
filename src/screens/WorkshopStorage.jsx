import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import WorkshopLayout from "../layouts/WorkshopLayout";
import ModalStorage from "../modals/ModalStorage";
import axios from "axios";

const WorkshopStorage = () => {
  const [profileList, setProfileList] = useState([]);
  const [appointmentModalOpenState, setAppointmentModalOpenState] =
    useState(false);
  const [storageModalOpenState, setStorageModalOpenState] = useState(false);
  const [user, setUser] = useState([]);
  const [locations, setLocation] = useState([]);
  const [getStorageItem, setGetStorageItem] = useState("");
  const [value, setValue] = useState([]);
  const modalOpenHandler = (func) => {
    func(true);
  };
  const modalCloseHandler = (func) => {
    func(false);
  };

  const onChangeStorage = (e) => {
    console.log(e.target.value);
    setGetStorageItem(e.target.value);
  };

  const getUser = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: "GET",
        url: "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/me",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      };
      await axios(options).then((res) => {
        // console.log(res);
        setUser(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllLoaction = async (id) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: "GET",
        url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/location/all/${id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      };
      await axios(options).then((res) => {
        // console.log(res);
        setLocation(res.data.locations);
        if (res.data.locations.length > 0) {
          setGetStorageItem(res.data.locations[0].locationId);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const StorageItem = async (id) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: "GET",
        url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/location/${id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      };
      await axios(options).then((res) => {
        console.log(res);
        setValue(res?.data?.storageItems);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (user?.user?.entity_id) {
      getAllLoaction(user.user.entity_id.id);
    }
  }, [user]);

  useEffect(() => {
    if (getStorageItem) {
      StorageItem(getStorageItem);
    }
  }, [getStorageItem]);

  return (
    <WorkshopLayout>
      <ModalStorage
        isOpen={storageModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setStorageModalOpenState)}
      />
      <div className="location-container">
        <div className="container-fluid mt-4">
          <div className="row gy-4 gx-lg-5">
            <div className="col-lg-4">
              <div className="emboss-white h-100 br-10 p-5">
                <SearchInput placeholder="Search in Storage Base" />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="d-flex justify-content-between title-container">
                <div className="title hover">
                  <select
                    className="Custom-Section-heading-select hover"
                    name="headingSelect"
                    id="headingSelect"
                    onChange={onChangeStorage}
                  >
                    {locations &&
                      locations.map((item) => (
                        <option value={item.locationId}>{item.name}</option>
                      ))}
                  </select>
                </div>
                <div className="d-flex align-items-center">
                  <ModalStorage
                    isOpen={appointmentModalOpenState}
                    profileList={profileList}
                    modalCloseHandler={() =>
                      modalCloseHandler(setAppointmentModalOpenState)
                    }
                  />
                </div>
              </div>

              <div className="container-fluid mt-4 px-0">
                <div className="row">
                  {value.length > 0 &&
                    value.map((item) => {
                      console.log(item);
                      return (
                        <div className="col-sm-4">
                          <div
                            to="/workshop-articles"
                            className="hover location-card"
                            onClick={() =>
                              modalOpenHandler(setStorageModalOpenState)
                            }
                          >
                            <div className="qr-container">
                              <img
                                src="./assets/vectors/location-qr.svg"
                                alt="qr"
                              />
                            </div>
                            <h3 className="section-title mt-4">
                              {item?.storageItemId?.storageType}
                            </h3>
                            <div className="my-1">
                              <span className="text-lato fs-16 fw-400">
                                {item?.storageItemId?.metadata?.name?.label}
                              </span>
                            </div>
                            <div className="my-1">
                              {(item?.storageItemId?.metadata?.frontLeft?.box ||
                                item?.storageItemId?.metadata?.frontLeft
                                  ?.wear) && (
                                <>
                                  <span className="text-lato fs-16 fw-700">
                                    D &nbsp;
                                  </span>
                                  <span className="text-lato fs-16 fw-400">
                                    /{" "}
                                    {(item?.storageItemId?.metadata?.frontLeft
                                      ?.wear
                                      ? "W: " +
                                        item?.storageItemId?.metadata?.frontLeft
                                          ?.wear
                                      : "") +
                                      " " +
                                      (item?.storageItemId?.metadata?.frontLeft
                                        ?.box
                                        ? "B: " +
                                          item?.storageItemId?.metadata
                                            ?.frontLeft?.box
                                        : "")}
                                  </span>
                                </>
                              )}
                              {(item?.storageItemId?.metadata?.backLeft?.box ||
                                item?.storageItemId?.metadata?.backLeft
                                  ?.wear) && (
                                <>
                                  <span className="text-lato fs-16 fw-700">
                                    D &nbsp;
                                  </span>
                                  <span className="text-lato fs-16 fw-400">
                                    /{" "}
                                    {(item?.storageItemId?.metadata?.backLeft
                                      ?.wear
                                      ? "W: " +
                                        item?.storageItemId?.metadata?.backLeft
                                          ?.wear
                                      : "") +
                                      " " +
                                      (item?.storageItemId?.metadata?.backLeft
                                        ?.box
                                        ? "B: " +
                                          item?.storageItemId?.metadata
                                            ?.backLeft?.box
                                        : "")}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="fw-600 text-blue">
                              {item?.storageItemId?.profileId}
                            </div>
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
    </WorkshopLayout>
  );
};

export default WorkshopStorage;

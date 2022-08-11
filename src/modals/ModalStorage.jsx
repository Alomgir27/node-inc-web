import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import Slider from "../components/Slider";
import Select from "react-select";
import axios from "axios";

const ModalStorage = (props) => {
  const [check, setcheck] = useState(false);
  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const [check3, setcheck3] = useState(false);

  const [options, setOptions] = useState([]);
  const initialOptions = [
    {
      label: "Summer",
      value: "summer",
    },
    {
      label: "Winter",
      value: "winter",
    },
    {
      label: "4 seasons",
      value: "4seasons",
    },
  ];

  // STATE
  const [profileData, setProfileData] = useState();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [storages, setStorages] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(options[0]);

  const [frontLeft, setFrontLeft] = useState("");
  const [frontRight, setFrontRight] = useState("");
  const [rearLeft, setRearLeft] = useState("");
  const [rearRight, setRearRight] = useState("");

  const [sliderFrontLeft, setSliderFrontLeft] = useState("");
  const [sliderFrontRight, setSliderFrontRight] = useState("");
  const [sliderRearLeft, setSliderRearLeft] = useState("");
  const [sliderRearRight, setSliderRearRight] = useState("");

  const [currentProfileStorage, setCurrentProfileStorage] = useState(null);

  const handleFrontLeftSliderChange = (values) => {
    if (values.length > 0) setSliderFrontLeft(values[0]);
    console.log(values, "Front Left");
  };
  const handleBackLeftSliderChange = (values) => {
    if (values.length > 0) setSliderFrontRight(values[0]);
    console.log(values, "Back Left");
  };
  const handleFrontRightSliderChange = (values) => {
    if (values.length > 0) setSliderRearLeft(values[0]);
    console.log(values, "Front Right");
  };
  const handleBackRightSliderChange = (values) => {
    if (values.length > 0) setSliderRearRight(values[0]);
    console.log(values, "Back Right");
  };

  useEffect(() => {
    if (props.invoice && props.invoice.principal_profile_id) {
      console.log(props.invoice);
      const data = JSON.parse(props.invoice.principal_profile_id.data);
      console.log(data);
      setProfileData(data);
    }
  }, [props.invoice]);

  // Fetch Locations
  useEffect(() => {
    const fetchData = async () => {
      const tokens = await JSON.parse(localStorage.getItem("tokens"));
      try {
        const locations = await axios({
          method: "get",
          url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/location/all/${props.invoice?.origin_invoicing_profile.owner_entity_id.id}`,
          headers: {
            authorization: "Bearer " + tokens.accessToken,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
        });
        const locs = locations.data.locations.map((loc) => {
          return {
            text: loc.name,
            loc,
            selected: true,
            disable: false,
          };
        });
        setLocations(locs);
      } catch (error) {
        console.log(error);
      }
    };
    if (props.invoice && props.invoice.origin_invoicing_profile) fetchData();
  }, [props.invoice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokens = await JSON.parse(localStorage.getItem("tokens"));

    let metadata = {
      name: selectedStorage,
    };

    if (check) {
      const frontLeftDetails = {
        wear: `${sliderFrontLeft}/32`,
        box: frontLeft,
      };
      metadata = { ...metadata, frontLeft: frontLeftDetails };
    }
    if (check1) {
      const frontRightDetails = {
        wear: `${sliderFrontRight}/32`,
        box: frontRight,
      };
      metadata = { ...metadata, frontRight: frontRightDetails };
    }
    if (check2) {
      const rearLeftDetails = {
        wear: `${sliderRearLeft}/32`,
        box: rearLeft,
      };
      metadata = { ...metadata, rearLeft: rearLeftDetails };
    }
    if (check3) {
      const rearRightDetails = {
        wear: `${sliderRearRight}/32`,
        box: rearRight,
      };
      metadata = { ...metadata, rearRight: rearRightDetails };
    }

    try {
      const findStorage = storages.find((storage) => {
        return storage.name === selectedStorage;
      });

      if (currentProfileStorage) {
        const data = await axios({
          method: "PUT",
          url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/profile/${currentProfileStorage.storageItemId.storageItemId}`,
          headers: {
            authorization: "Bearer " + tokens.accessToken,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          data: {
            profileId: props.invoice.principal_profile_id.id,
            locationId: currentProfileStorage.storageItemId.locationId,
            storageType: `Tire-${profileData.tires}`,
            subLocation: null,
            metadata,
          },
        });
        console.log(data.data);
        alert("Storage Updated");
        return;
      }

      if (findStorage) {
        const data = await axios({
          method: "post",
          url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/profile`,
          headers: {
            authorization: "Bearer " + tokens.accessToken,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          data: {
            profileId: props.invoice.principal_profile_id.id,
            locationId: findStorage.loc.locationId,
            storageType: `Tire-${profileData.tires}`,
            subLocation: null,
            metadata,
          },
        });

        console.log(data.data);
        alert("Storage Added");
        return;
      }

      const location = locations.find((loc) => loc.text === selectedLocation);
      console.log(location, "location");
      console.log(location.loc.locationId);

      console.log("selectedStorage", selectedStorage);
      const data = await axios({
        method: "post",
        url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/profile`,
        headers: {
          authorization: "Bearer " + tokens.accessToken,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        data: {
          profileId: props.invoice.principal_profile_id.id,
          locationId: location.loc.locationId,
          storageType: `Tire-${profileData.tires}`,
          subLocation: "",
          metadata,
        },
      });

      console.log(data.data);
      alert("Storage Added");
      return;
    } catch (error) {
      console.log(error.response);
      alert("Error");
    }
  };

  // Storages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const select = locations.find((loc) => loc.text === selectedLocation);
        console.log(select);
        const tokens = await JSON.parse(localStorage.getItem("tokens"));
        const storages = await axios({
          method: "get",
          url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/storage/location/${select.loc.locationId}`,
          headers: {
            authorization: "Bearer " + tokens.accessToken,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
        });
        console.log("storages", storages.data);
        if (storages.data?.storageItems?.length > 0) {
          const stor = storages.data.storageItems.map((storage) => {
            // if (storage.profileId === props.invoice.principal_profile_id.id)
            //   setCurrentProfileStorage(storage);

            return {
              text: storage.name,
              storage,
              selected: true,
              disable: false,
            };
          });

          const sto = storages.data.storageItems.find(
            (storage) =>
              storage.profileId === props.invoice.principal_profile_id.id &&
              selectedStorage &&
              storage?.storageItemId?.metadata?.name?.value ===
                selectedStorage.value
          );
          console.log("stor", sto);
          setCurrentProfileStorage(sto);

          setStorages(stor);
        } else {
          setCurrentProfileStorage(null);
          setStorages([]);
        }

        // setStorages(storages.data.storageItems);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedLocation && props.invoice) fetchData();
  }, [selectedLocation, locations, props.invoice, selectedStorage]);

  useEffect(() => {
    console.log(props.invoice, "INVOICE");
  }, [props.invoice]);

  useEffect(() => {
    console.log("currentProfileStorage", currentProfileStorage);
    const setState = () => {
      currentProfileStorage?.storageItemId?.metadata?.frontLeft &&
        setcheck(true);
      currentProfileStorage?.storageItemId?.metadata?.frontRight &&
        setcheck1(true);
      currentProfileStorage?.storageItemId?.metadata?.rearLeft &&
        setcheck2(true);
      currentProfileStorage?.storageItemId?.metadata?.rearRight &&
        setcheck3(true);
      setSliderFrontLeft(
        currentProfileStorage?.storageItemId?.metadata?.frontLeft?.wear.split(
          "/"
        )[0]
      );
      setSliderFrontRight(
        currentProfileStorage?.storageItemId?.metadata?.frontRight?.wear.split(
          "/"
        )[0]
      );
      setSliderRearLeft(
        currentProfileStorage?.storageItemId?.metadata?.rearLeft?.wear.split(
          "/"
        )[0]
      );
      setSliderRearRight(
        currentProfileStorage?.storageItemId?.metadata?.rearRight?.wear.split(
          "/"
        )[0]
      );
      setFrontLeft(
        currentProfileStorage?.storageItemId?.metadata?.frontLeft?.box
      );
      setFrontRight(
        currentProfileStorage?.storageItemId?.metadata?.frontRight?.box
      );
      setRearLeft(
        currentProfileStorage?.storageItemId?.metadata?.rearLeft?.box
      );
      setRearRight(
        currentProfileStorage?.storageItemId?.metadata?.rearRight?.box
      );
    };
    const resetState = () => {
      console.log("here");
      setcheck(false);
      // setcheck1(false);
      // setcheck2(false);
      // setcheck3(false);
      setSliderFrontLeft(0);
      // setSliderFrontRight(0);
      // setSliderRearLeft(0);
      // setSliderRearRight(0);
      setFrontLeft("");
      // setFrontRight("");
      // setRearLeft("");
      // setRearRight("");
    };
    currentProfileStorage ? setState() : resetState();
  }, [currentProfileStorage]);

  useEffect(() => {
    console.log("selectedStorage", selectedStorage);
  }, [selectedStorage]);

  return (
    <form action="" onSubmit={(e) => handleSubmit(e)}>
      <div>
        <Modal className="modal-appointment" buttonText="Save" {...props}>
          <div className="client-modal-body position-relative">
            <div className="container-fluid">
              <div className="row gy-4">
                <div className="col-lg-12">
                  <div className="row">
                    <h1 className="mt-2">Storage</h1>

                    <div className="col-sm-3">
                      <p className="mt-2">Select stored element</p>
                      {/* <FancyInput
                          select
                          options={storages}
                          id="assignedTo"
                          name="profile"
                          // onChange={}
                          placeholder="Start Typing"
                          rootClassName="appointment-select"
                          inputClassName="custom-select"
                        /> */}
                      {/* <Select
                        options={storages}
                        // onInputChange={(e) =>
                        //   setSelectedStorage(e.target.value)
                        // }
                        onChange={(e) => setSelectedStorage(e.target.value)}
                        value={selectedStorage}
                      /> */}
                      <Select
                        options={initialOptions}
                        defaultValue={selectedStorage?.label}
                        // onValueChange={(value) => setSelectedStorage(value)}
                        onChange={(e) => setSelectedStorage(e)}
                      />
                    </div>
                    <div className="col-sm-3">
                      <p className="mt-2">Profile</p>
                      <FancyInput
                        // select
                        // options={[]}
                        id="assignedTo"
                        name="profile"
                        // onChange={}
                        // placeholder="Start Typing"
                        value={
                          profileData
                            ? `${profileData.make} ${profileData.year} ${profileData.model}`
                            : ""
                        }
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                      />
                    </div>
                    <div className="col-sm-3">
                      <p className="mt-2">Type</p>
                      <FancyInput
                        // select
                        // options={["tires only", "Tires w/ mag"]}
                        id="assignedTo"
                        name="type"
                        // onChange={}
                        placeholder="Tires"
                        value={
                          profileData
                            ? `${profileData.tires}-${profileData.size}`
                            : ""
                        }
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                      />
                    </div>
                    <div className="col-sm-3">
                      <p className="mt-2">Location</p>
                      <FancyInput
                        select
                        options={locations}
                        id="assignedTo"
                        name="location"
                        onChange={(e) => {
                          setSelectedLocation(e.target.value);
                        }}
                        value={selectedLocation}
                        placeholder="Select in the menu"
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h2 className="fs-3">Tires wear</h2>
                  <div className="middleCar">
                    <div className="text-center slider-div justify-content-between justify-content-lg-around align-items-center mb-5">
                      <div className="box">
                        <p>Front Left</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="slider-horizontal">
                            <Slider
                              textAlign={"start"}
                              onValueChange={(values) =>
                                handleFrontLeftSliderChange(values)
                              }
                            />
                          </div>
                          <div
                            className="hover custom-stroagemodel-check emboss-inner rounded-3 mx-2"
                            onClick={(e) => setcheck(!check)}
                          >
                            {check === true ? (
                              <img
                                src="./assets/vectors/tick.svg"
                                width="100%"
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {check === true ? (
                          <FancyInput
                            name="box"
                            onChange={(e) => setFrontLeft(e.target.value)}
                            placeholder="Box"
                            rootClassName="appointment-select"
                            inputClassName="custom-select"
                            value={frontLeft}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="box">
                        <p>Front right</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="hover custom-stroagemodel-check emboss-inner rounded-3 mx-2"
                            onClick={(e) => setcheck1(!check1)}
                          >
                            {check1 === true ? (
                              <img
                                src="./assets/vectors/tick.svg"
                                width="100%"
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="slider-horizontal">
                            <Slider
                              rtl={true}
                              textAlign={"right"}
                              onValueChange={(values) =>
                                handleFrontRightSliderChange(values)
                              }
                            />
                          </div>
                          <div></div>
                        </div>
                        {check1 === true ? (
                          <FancyInput
                            name="box"
                            onChange={(e) => setFrontRight(e.target.value)}
                            placeholder="Box"
                            rootClassName="appointment-select"
                            inputClassName="custom-select"
                            value={frontRight}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="text-center slider-div justify-content-between justify-content-lg-around align-items-center mb-5">
                      <div className="box">
                        <p>Back Left</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="slider-horizontal">
                            <Slider
                              textAlign={"start"}
                              onValueChange={(values) =>
                                handleBackLeftSliderChange(values)
                              }
                            />
                          </div>
                          <div
                            className="hover custom-stroagemodel-check emboss-inner rounded-3 mx-2"
                            onClick={(e) => setcheck2(!check2)}
                          >
                            {check2 === true ? (
                              <img
                                src="./assets/vectors/tick.svg"
                                width="100%"
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {check2 === true ? (
                          <FancyInput
                            name="box"
                            onChange={(e) => setRearLeft(e.target.value)}
                            placeholder="Box"
                            rootClassName="appointment-select"
                            inputClassName="custom-select"
                            value={rearLeft}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="box">
                        <p>Back right</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            className="hover custom-stroagemodel-check emboss-inner rounded-3 mx-2"
                            onClick={(e) => setcheck3(!check3)}
                          >
                            {check3 === true ? (
                              <img
                                src="./assets/vectors/tick.svg"
                                width="100%"
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="slider-horizontal">
                            <Slider
                              textAlign={"right"}
                              onValueChange={(values) =>
                                handleBackRightSliderChange(values)
                              }
                            />
                          </div>
                        </div>
                        {check3 === true ? (
                          <FancyInput
                            name="box"
                            onChange={(e) => setRearRight(e.target.value)}
                            placeholder=""
                            rootClassName="appointment-select"
                            inputClassName="custom-select"
                            value={rearRight}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn">
            <button
              className="position-absolute btn btn-add btn-gradient"
              style={{ right: "13%", bottom: "2.4%" }}
              gradient
            >
              Print
            </button>
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default ModalStorage;

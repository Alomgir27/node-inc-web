import { useState } from "react";
import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import axios from "axios";
import { BASEURL, sendNetworkRequest } from "../http/http-request";

const ModalProfile = (props) => {
  const [serial, setSerial] = useState();
  const [odometer, setOdometer] = useState();
  const [tire, setTire] = useState();
  const [plate, setPlate] = useState();
  const [label, setLabel] = useState();
  // const [onRoadProfile, setOnRoadProfile] = useState(false);
  // const [nodyMeProfile, setNodyMeProfile] = useState(false);
  // const [nodyContactProfile, setNodyContactProfile] = useState(false);
  // const [atHomeProfile, setAtHomeProfile] = useState(false);
  // const [vehicle, setVehicleProfile] = useState(true);
  const [activeProfile, setActiveProfile] = useState("VEHICLE");

  console.log(activeProfile, "activeProfile");

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const submitCarProfile = async () => {
    try {
      const tokens = await JSON.parse(localStorage.getItem("tokens"));

      const carData = await axios({
        method: "GET",
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/car/${serial}`,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      });

      console.log(`CARDATA: ${JSON.stringify(carData.data, null, 2)}`);

      const { data } = carData;

      const car = {
        serial,
        odometer,
        tire,
        plate,
        label,
        ...data,
      };

      const createdCar = await axios({
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile`,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        method: "POST",
        data: {
          data: car,
          action_metadata: { test: "test" },
          certification_status: 0,
          xQuantity: 1,
          object_model_revision_id: null,
          parent_object_id: null,
          is_subprofile: false,
          type: "vehicle",
        },
      });

      console.log(`CREATED CAR: ${JSON.stringify(createdCar.data, null, 2)}`);
      console.log(`CURRENT_USER ${JSON.stringify(props.currentUser, null, 2)}`);

      const userWallet = await axios({
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/wallet/${props.currentUser.entityId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      });

      console.log(`USER WALLET: ${JSON.stringify(userWallet.data, null, 2)}`);
      console.log(
        `USER WALLET: ${JSON.stringify(userWallet.data.wallet.id, null, 2)}`
      );

      const owner = await axios({
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/owner`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        data: {
          action_metadata: { test: "test" },
          object_id: createdCar.data.ids[0].id,
          is_active: true,
          is_full_owner: true,
          user_id: props.currentUser.id,
          digital_wallet_id: userWallet.data.wallet.id,
        },
      });

      props.setUserProfiles((profiles) => [...profiles, owner.data]);

      console.log(JSON.stringify(owner.data, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  const submitMeProfile = async () => {
    try {
      const tokens = await JSON.parse(localStorage.getItem("tokens"));

      const profileData = await axios({
        method: "POST",
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/`,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        data: {
          data: { firstName, lastName },
          action_metadata: { test: "test" },
          certification_status: 0,
          xQuantity: 1,
          object_model_revision_id: null,
          parent_object_id: null,
          type: "NODYME",
        },
      }).catch((error) => console.log(error));

      console.log(
        `PROFILE: ${JSON.stringify(profileData.data.ids[0].id, null, 2)}`
      );

      const userWallet = await axios({
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/wallet/${props.currentUser.entityId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      });

      const owner = await axios({
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/owner`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        data: {
          action_metadata: { test: "test" },
          object_id: profileData.data.ids[0].id,
          is_active: true,
          is_full_owner: true,
          user_id: props.currentUser.id,
          digital_wallet_id: userWallet.data.wallet.id,
        },
      });

      props.setUserProfiles((profiles) => [...profiles, owner.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCarProfile = async () => {
    const tokens = await JSON.parse(localStorage.getItem("tokens"));

    let data = {};

    if (odometer) data = { odometer: odometer };
    if (plate) data = { ...data, plate: plate };
    if (tire) data = { ...data, tires: tire };
    if (label) data = { ...data, label: label };

    let car = null;

    if (serial) {
      const data = await sendNetworkRequest(`${BASEURL}/car/${serial}`);
      car = data.data;
    }

    if (car) data = { ...data, ...car };
    console.log(data);

    console.log(props.activeProfile);

    const carData = await axios({
      method: "PATCH",
      url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/profile/${props.activeProfile.object_id.id}`,
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        refresh_token: tokens.refreshToken,
        idToken: tokens.idToken,
      },
      data: {
        data: data,
      },
    });

    console.log(`UPDATED CAR: ${JSON.stringify(carData.data, null, 2)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (props.edit) {
      updateCarProfile();
    } else {
      if (activeProfile === "On Road-Car") {
      } else if (activeProfile === "NODYME") {
        submitMeProfile();
      } else if (activeProfile === "Nody-Contact") {
        setActiveProfile("NODYCONTACT");
      } else if (activeProfile === "At home-Location") {
        setActiveProfile("ATHOME");
      } else if (activeProfile === "VEHICLE") {
        submitCarProfile();
      }
    }
  };

  const handelChangeProfile = (e) => {
    console.log(e.target.value);
    if (e.target.value === "On Road-Car") {
      setActiveProfile("ONROADCAR");
    } else if (e.target.value === "Nody-Me") {
      setActiveProfile("NODYME");
    } else if (e.target.value === "Nody-Contact") {
      setActiveProfile("NODYCONTACT");
    } else if (e.target.value === "At home-Location") {
      setActiveProfile("ATHOME");
    } else if (e.target.value === "Vehicle") {
      setActiveProfile("VEHICLE");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal
          titleVector="./assets/vectors/modal-profile.svg"
          title="Profile"
          className="profile-modal"
          buttonText="Save"
          headInput={{
            prominant: true,
            select: true,
            id: "type",
            name: "type",
            label: "Profile type",
            options: [
              { text: "Vehicle" },
              { text: "On Road-Car" },
              { text: "Nody-Me" },
              { text: "Nody-Contact" },
              { text: "At home-Location" },
            ],
          }}
          {...props}
          onChange={handelChangeProfile}
        >
          <div className="profile-modal-body">
            <div className="container-fluid px-0">
              {activeProfile === "ONROADCAR" ? (
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mt-2">Vin</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="vin"
                      name="vin"
                      placeholder="Start typing..."
                      onChange={(e) => setSerial(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Node Client</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="client"
                      name="client"
                      placeholder="Start typing..."
                      onChange={(e) => setOdometer(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    <p className="mt-2">YEAR</p>
                    <FancyInput
                      select
                      options={[
                        {
                          text: "Select the menu",
                          disable: true,
                          selected: true,
                        },
                      ]}
                      id="year"
                      name="year"
                      placeholder="select in the menu"
                      inputClassName="custom-select"
                    />
                  </div>
                  <div className="col-sm-4">
                    <p className="mt-2">MAKE</p>
                    <FancyInput
                      select
                      options={[
                        {
                          text: "Select the menu",
                          disable: true,
                          selected: true,
                        },
                      ]}
                      id="year"
                      name="year"
                      placeholder="select in the menu"
                      inputClassName="custom-select"
                    />
                  </div>
                  <div className="col-sm-4">
                    <p className="mt-2">MODEL</p>
                    <FancyInput
                      select
                      options={[
                        {
                          text: "Select the menu",
                          disable: true,
                          selected: true,
                        },
                      ]}
                      id="year"
                      name="year"
                      placeholder="select in the menu"
                      inputClassName="custom-select"
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Odometer</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="vin"
                      name="vin"
                      placeholder="Start typing..."
                      onChange={(e) => setTire(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Plate</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="client"
                      name="client"
                      placeholder="Start typing..."
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </div>
                </div>
              ) : activeProfile === "NODYME" ? (
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mt-2">First Name</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="firstname"
                      name="firstname"
                      placeholder="Start typing..."
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Last Name</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="lastname"
                      name="lastname"
                      placeholder="Start typing..."
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    <p className="mt-2">YEAR</p>
                    <FancyInput
                      select
                      options={[
                        {
                          text: "Select the menu",
                          disable: true,
                          selected: true,
                        },
                      ]}
                      id="year"
                      name="year"
                      placeholder="select in the menu"
                      inputClassName="custom-select"
                    />
                  </div>
                  <div className="col-sm-4">
                    <p className="mt-2">Month</p>
                    <FancyInput
                      select
                      options={[
                        {
                          text: "Select the menu",
                          disable: true,
                          selected: true,
                        },
                      ]}
                      id="year"
                      name="year"
                      placeholder="select in the menu"
                      inputClassName="custom-select"
                    />
                  </div>
                  <div className="col-sm-4">
                    <p className="mt-2">Day</p>
                    <FancyInput
                      select
                      options={[
                        {
                          text: "Select the menu",
                          disable: true,
                          selected: true,
                        },
                      ]}
                      id="year"
                      name="year"
                      placeholder="select in the menu"
                      inputClassName="custom-select"
                    />
                  </div>
                </div>
              ) : activeProfile === "NODYCONTACT" ? (
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mt-2">Phone</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="phone"
                      name="phone"
                      placeholder="Start typing..."
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Email</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="email"
                      name="email"
                      placeholder="Start typing..."
                    />
                  </div>
                </div>
              ) : activeProfile === "ATHOME" ? (
                <div className="row">
                  <div className="col-sm-12">
                    <p className="mt-2">Address</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="address"
                      name="address"
                      placeholder="Start typing..."
                    />
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mt-2">Serial Number</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="vin"
                      name="vin"
                      placeholder="Start typing..."
                      onChange={(e) => setSerial(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Odometer</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="client"
                      name="client"
                      placeholder="Start typing..."
                      onChange={(e) => setOdometer(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12">
                    <p className="mt-2">Internal Label</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="client"
                      name="client"
                      placeholder="Start typing..."
                      onChange={(e) => setLabel(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Tire Size</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="vin"
                      name="vin"
                      placeholder="Start typing..."
                      onChange={(e) => setTire(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <p className="mt-2">Plate</p>
                    <FancyInput
                      prominant
                      sMargin
                      id="client"
                      name="client"
                      placeholder="Start typing..."
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default ModalProfile;

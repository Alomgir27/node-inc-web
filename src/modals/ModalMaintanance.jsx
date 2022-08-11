import React, { useEffect, useState, useContext } from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import AddBtn from "../components/AddBtn";
import Select, { ActionMeta } from "react-select";
import CreatableSelect from "react-select/creatable";
import { AuthContext } from "../store/auth-context";
import axios from "axios";

const ModalMaintanance = (props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [rprofile, setRprofile] = useState("");
  const [colors, setColors] = useState("");
  const [profileData, setProfileData] = useState();

  const [curPage, setCurPage] = useState(0);
  const { tokens } = useContext(AuthContext);
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    async function APICall() {
      setProfileId(localStorage.getItem("profile_id"));
    }
    APICall();
  }, [localStorage.getItem("profile_id")]);

  const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    setColors(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleInputChange = (inputValue, actionMeta) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const options = [
    {
      value: "Option 1",
      label: "5000",
    },
    {
      value: "Option 2",
      label: "10000",
    },
    {
      value: "Option 3",
      label: "12000",
    },
    {
      value: "Option 4",
      label: "20000",
    },
    {
      value: "Option 5",
      label: "40000",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, date, rprofile, colors);
    try {
      const response = await axios({
        method: "POST",
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/forecast`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          idToken: tokens.idToken,
          refresh_token: tokens.refreshToken,
        },
        data: {
          name: name,
          profile_id: rprofile,
          reco_date: date,
          tags: colors,
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setName(props.selectedService?.name);
  }, [props.selectedService?.name]);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal
          titleVector="./assets/vectors/active-eye.svg"
          title="Maintenance"
          {...props}
          headClassName="gradient-text "
          buttonText="save"
        >
          <div className="form-modal-body pb-3">
            <div className="continer-fluid px-4 mt-4 w-100">
              <div className="row d-flex justify-content-between w-100">
                <div className="col-6 mb-4">
                  <p className="mb-2 fw-600">Name of Maitnenance</p>
                  <FancyInput
                    id="name"
                    name="name"
                    placeholder="Type name"
                    rootClassName="appointment-select"
                    inputClassName="custom-select"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <p className="mt-2 fw-600">Next Date</p>
                  <FancyInput
                    sMargin
                    id="date"
                    type="date"
                    name="due_date"
                    //   onChange={inputChangeHandler}
                    placeholder="DD/MM/AA   at 00:000"
                    inputClassName="dateInput"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="col-6 ">
                  <p className="mb-2 fw-600">Profil Noded</p>
                  <FancyInput
                    select
                    options={[
                      {
                        text: "Select related Profile",
                        disable: true,
                        selected: true,
                      },
                      {
                        text: profileId,
                      },
                    ]}
                    id="client"
                    name="nodedwith"
                    placeholder="Select in the menu"
                    rootClassName="appointment-select"
                    inputClassName="custom-select"
                    // value={newRequest?.target_user_id}
                    onChange={(e) => setRprofile(e.target.value)}
                  />
                </div>
                <div className="col-6 ">
                  <p className="mb-2 fw-600">Next KM</p>
                  <CreatableSelect
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default ModalMaintanance;

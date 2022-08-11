import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";

import SettingsLayout from "../layouts/SettingsLayout";
import Input from "../components/Input";
import AddBtn from "../components/AddBtn";
import SettingsUserImg from "../components/SettingsUserImg";
import ModalArticle from "../modals/ModalArticle";
import { AuthContext } from "../store/auth-context";

const Settings1 = () => {
  const [keys, setKeys] = useState(null);
  const { tokens } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    about:
      "Clay is a new type of tool that brings together the best parts of spreadsheets automation. Quickly connect your apps and d workflows, build useful tools, enr.",
    invoicePrefix: "GL",
    ibeaconId: "",
    apiKey: keys ? keys.apiKey : "",
  });
  const [isModalOpenState, setIsModalOpenState] = useState(false);
  useEffect(() => {
    loadApiData();
  }, []);
  const loadApiData = async () => {
    const response = await fetch(
      "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/entity/api/keys",
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
    const apiKeys = await response.json();
    setKeys(apiKeys);
  };
  const modalOpenHandler = () => {
    setIsModalOpenState(true);
  };

  const modalCloseHandler = () => {
    setIsModalOpenState(false);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <SettingsLayout>
      <ModalArticle
        isOpen={isModalOpenState}
        modalCloseHandler={modalCloseHandler}
      />

      <div className="form business-settings">
        <div className="container-fluid px-0">
          <div className="emboss-white br-16">
            <div className="row">
              <div className="col-4">
                <SettingsUserImg
                  img="./assets/img/user-placeholder.png"
                  withoutCamera
                />
              </div>
              {[
                {
                  radio: true,
                  label: "Reservations",
                  id: "reservations",
                  options: [
                    {
                      text: "Need Request",
                      value: "need-request",
                    },
                    {
                      text: "Automatically Approve",
                      value: "automatically-approve",
                    },
                  ],
                },
                {
                  lightLabel: true,
                  label: "About",
                  id: "about",
                  fullWidth: true,
                  textArea: true,
                  rows: 3,
                },
                {
                  lightLabel: true,
                  label: "Invoice Prefix",
                  id: "invoicePrefix",
                  placeholder: "Clay Labire",
                  halfWidth: true,
                },
                {
                  lightLabel: true,
                  select: true,
                  label: "Default Bank Account",
                  id: "bank",
                  halfWidth: true,
                  options: [
                    {
                      text: "Please select ...",
                      value: "",
                    },
                    {
                      text: "Bank 1",
                      value: "bank-1",
                    },
                    {
                      text: "Bank 2",
                      value: "bank-2",
                    },
                  ],
                },
                {
                  lightLabel: true,
                  label: "Main iBeacon ID",
                  id: "ibeaconId",
                  placeholder: "uf83hfieuwfud823dd23312",
                  halfWidth: true,
                },
                {
                  lightLabel: true,
                  label: "API key",
                  id: "apiKey",
                  type: "password",
                  placeholder: "sdfsadfsd",
                  halfWidth: true,
                },
              ].map((el, idx) => {
                const {
                  lightLabel,
                  label,
                  id,
                  placeholder,
                  halfWidth,
                  fullWidth,
                  textArea,
                  ...rest
                } = el;

                return (
                  <div
                    // className={`col-${fullWidth ? "12" : "sm-6"}`}
                    className={clsx(
                      { "col-12": fullWidth },
                      { "col-6": halfWidth },
                      { col: !fullWidth && !halfWidth }
                    )}
                    key={"input" + idx}
                  >
                    <Input
                      textArea={textArea}
                      label={label}
                      rootClassName={lightLabel ? "light-label" : ""}
                      id={id}
                      name={id}
                      onChange={inputChangeHandler}
                      value={formState[id]}
                      placeholder={placeholder}
                      {...rest}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="title-wrap d-flex justify-content-between title-container align-items-start mt-5">
            <div className="title">
              <h3 className="section-title">Locations</h3>
            </div>
            <AddBtn onClick={modalOpenHandler} title="ADD" />
          </div>

          <div className="emboss-white br-16 mt-3">
            <div className="table-container short-vertical-scrollbar">
              <table className="locations-table">
                <thead className="no-bg">
                  <tr>
                    <th>Name</th>
                    <th>Schedule</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Bay 1",
                      schedule: "S-S  9:00 - 17:00",
                      address: "535 Filion, Saint-Jérôme",
                    },
                    {
                      name: "Pool - Polyvalente",
                      schedule: "M-T-F  13:00 - 17:00",
                      address: "535 Filion, Saint-Jérôme",
                    },
                    {
                      name: "Danse local 215",
                      address: "873 Labelle, Blainville",
                    },
                    {
                      name: "Gym",
                      address: "873 Labelle, Blainville",
                    },
                    {
                      name: "Badminton Court",
                      address: "73 Hoslaga-Maison, Montréal",
                    },
                  ].map((el, idx) => {
                    const { name, schedule, address } = el;

                    return (
                      <tr key={"loc-tab-item" + idx}>
                        <td>{name}</td>
                        <td>
                          {schedule || (
                            <img
                              src="./assets/vectors/schedule-add.svg"
                              alt="add"
                            />
                          )}
                        </td>
                        <td>{address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="title-wrap d-flex justify-content-between title-container align-items-start mt-5">
            <div className="title">
              <h3 className="section-title">Categories</h3>
            </div>
            <AddBtn onClick={modalOpenHandler} title="ADD" />
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Settings1;

import React, { useState } from "react";

import Input from "../components/Input";
import SettingsLayout from "../layouts/SettingsLayout";
import AddBtn from "../components/AddBtn";

const Settings3 = () => {
  const [formState, setFormState] = useState({
    employee: "",
    admin: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <SettingsLayout>
      <div className="settings-3">
        <div className="title-wrap d-flex justify-content-between title-container align-items-start">
          <div className="title">
            <h3 className="section-title">Active Users</h3>
          </div>
          <AddBtn pale small />
        </div>
        <div className="emboss-white mt-4 py-3 br-16">
          <div className="table-container short-vertical-scrollbar">
            <table className="users-table">
              <tbody>
                {[
                  {
                    text1: "Ekaterina Tankova",
                    text2: "ekaterina.tankova@devias.io",
                    text3: "304-428-3097",
                    text4: "SuperUser",
                    text5: "40,20",
                  },
                  {
                    text1: "Ekaterina Tankova",
                    text2: "ekaterina.tankova@devias.io",
                    text3: "304-428-3097",
                    text4: "Admin",
                    text5: "40,20",
                  },
                  {
                    text1: "Ekaterina Tankova",
                    text2: "ekaterina.tankova@devias.io",
                    text3: "304-428-3097",
                    text4: "Employee",
                    text5: "32,18",
                  },
                  {
                    text1: "Ekaterina Tankova",
                    text2: "ekaterina.tankova@devias.io",
                    text3: "304-428-3097",
                    text4: "Employee",
                    text5: "32,18",
                  },
                  {
                    text1: "Ekaterina Tankova",
                    text2: "ekaterina.tankova@devias.io",
                    text3: "304-428-3097",
                    text4: "Employee",
                    text5: "32,18",
                  },
                ].map((el, idx) => {
                  const { text1, text2, text3, text4, text5 } = el;

                  return (
                    <tr key={"active" + idx}>
                      <td>
                        <img src="./assets/img/active-user.jpg" alt="user" />
                        {text1}
                      </td>
                      <td>{text2}</td>
                      <td>{text3}</td>
                      <td>{text4}</td>
                      <td>{text5}$</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="title-wrap">
          <h3 className="section-title mt-3 pt-5">Permissions</h3>
        </div>

        <div className="container-fluid px-0">
          <div className="mt-4">
            <div className="emboss-white py-3 br-16">
              <Input
                style={{ maxWidth: "312px" }}
                lightLabel={true}
                select={true}
                id="bank"
                options={[
                  {
                    text: "Employee",
                    value: "employee",
                  },
                  {
                    text: "Admin",
                    value: "admin",
                  },
                ]}
              />

              {[
                {
                  checkbox: true,
                  id: "employee",
                  fullWidth: true,
                  subRootClassName: "flex-column",
                  options: [
                    {
                      text: "Hide Finances data",
                    },
                    {
                      text: "Can’t Manage Articles &amp; Services",
                    },
                    {
                      text: "Can’t Manage Clients",
                    },
                    {
                      text: "Can’t Use Node Desk Utilities",
                    },
                  ],
                },
              ].map((el, idx) => {
                const {
                  lightLabel,
                  label,
                  id,
                  placeholder,
                  fullWidth,
                  textArea,
                  ...rest
                } = el;

                return (
                  <Input
                    key={"employee" + idx}
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Settings3;

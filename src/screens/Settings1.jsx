import React, { useState, useContext, useEffect } from "react";

import SettingsLayout from "../layouts/SettingsLayout";
import Input from "../components/Input";
import SettingsUserImg from "../components/SettingsUserImg";
import Loader from "../components/Loader";
import { AuthContext } from "../store/auth-context";

const Settings1 = () => {
  const {
    tokens,
    user: {
      user: { id },
    },
  } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    about:
      "Clay is a new type of tool that brings together the best parts of spreadsheets,\nmjchiu34h9uierhf98347rch9w3efhvbnw4v5g8fwernugfjni\nvggdfggdfgfddgffgdgdf",
  });
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const response = await fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/${id}`,
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
    const user = await response.json();
    setUser(user);
  };
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  if (!user) {
  }
  console.log(user);
  return (
    <SettingsLayout>
      {user ? (
        <div className="emboss-white br-16">
          <div className="settings-1">
            <SettingsUserImg />

            <div className="form">
              <div className="container-fluid px-0">
                <div className="row">
                  {[
                    {
                      lightLabel: true,
                      label: "Your full name",
                      id: "name",
                      value: `${user.human_identity_id.first_name} ${user.human_identity_id.last_name}`,
                      placeholder: "Clay Labire",
                    },
                    {
                      lightLabel: true,
                      label: "Title",
                      id: "title",
                      value: user.human_identity_id.title,
                      placeholder: "Owner",
                    },
                    {
                      lightLabel: true,
                      label: "Phone",
                      id: "phone",
                      value: user.phone.phone_number_id
                        ? user.phone.phone_number_id.number
                        : null,
                      placeholder: "450-939-2332",
                    },
                    {
                      lightLabel: true,
                      label: "Email",
                      id: "email",
                      value: `${user.email.email_address_id.contact}@${user.email.email_address_id.domain}`,
                      placeholder: "email@mama.com",
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
                      select: true,
                      label: "Language",
                      id: "language",
                      options: [
                        {
                          text: "English",
                          value: "english",
                        },
                        {
                          text: "English",
                          value: "english",
                        },
                        {
                          text: "English",
                          value: "english",
                        },
                      ],
                    },
                    {
                      select: true,
                      label: "Week Start On",
                      id: "week",
                      options: [
                        {
                          text: "Monday",
                          value: "monday",
                        },
                        {
                          text: "Tuesday",
                          value: "tuesday",
                        },
                        {
                          text: "Wednesday",
                          value: "wednesday",
                        },
                        {
                          text: "Thursday",
                          value: "thursday",
                        },
                        {
                          text: "Friday",
                          value: "friday",
                        },
                        {
                          text: "Saturday",
                          value: "saturday",
                        },
                        {
                          text: "Sunday",
                          value: "sunday",
                        },
                      ],
                    },
                    {
                      radio: true,
                      label: "Time Formate",
                      id: "timeFormat",
                      fullWidth: true,
                      options: [
                        {
                          text: "12 Hour",
                        },
                        {
                          text: "24 Hour",
                        },
                      ],
                    },
                    {
                      radio: true,
                      fullWidth: true,
                      label: "Date Formate",
                      id: "dateFormat",
                      options: [
                        {
                          text: "DD/MM/YY",
                        },
                        {
                          text: "MM/DD/YY",
                        },
                        {
                          text: "YY/MM/DD",
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
                      <div
                        className={`col-${fullWidth ? "12" : "sm-6"}`}
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
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12 w-100 h-100 d-flex justify-content-center align-items-center loader-container">
          <Loader />
        </div>
      )}
    </SettingsLayout>
  );
};

export default Settings1;

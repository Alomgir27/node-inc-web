import React, { useState } from "react";
import axios from "axios";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";

const ModalClient = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tokens = JSON.parse(localStorage.getItem("tokens"));
    try {
      const res = await axios({
        method: "POST",
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/internal/user/connect`,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        },
      });

      props.setNewClient((prev) => !prev);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Modal
        title="Client"
        subTitle="If your Client already have Node, click on Scan"
        buttonText="Add"
        {...props}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="client-modal-body">
            <div className="container-fluid px-0">
              <div className="row">
                <div className="col-6">
                  <p className="mt-2">First Name</p>
                  <FancyInput
                    prominant
                    sMargin
                    largePaddingBottom
                    id="firstName"
                    name="firstName"
                    placeholder="Start typing..."
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <p className="mt-2">Last name</p>
                  <FancyInput
                    prominant
                    sMargin
                    largePaddingBottom
                    id="lastName"
                    name="lastName"
                    placeholder="Start typing..."
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="col-sm-6">
                  <p className="mt-2">Email</p>
                  <FancyInput
                    prominant
                    sMargin
                    mdPaddingBottom
                    id="email"
                    name="email"
                    placeholder="Start typing..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <p className="mt-2">Phone</p>
                  <FancyInput
                    prominant
                    sMargin
                    mdPaddingBottom
                    id="phone"
                    name="phone"
                    placeholder="Start typing..."
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit">Add</button>
        </form>
      </Modal>
    </div>
  );
};

export default ModalClient;

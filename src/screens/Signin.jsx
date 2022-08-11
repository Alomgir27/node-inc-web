import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import FancyInput from "../components/FancyInput";
import { AuthContext } from "../store/auth-context";

const SignUp = () => {
  const { setTokens, tokens, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (tokens && tokens.accessToken) {
      console.log("TOKENS: ", tokens);
      navigate("/360");
    } else {
      alert("Invalid credentials");
    }
  }, [tokens, navigate]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };
  const handleFormSubmit = async (event) => {
    // to="/360"
    event.preventDefault();
    try {
      const response = await fetch(
        "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );
      const tokens = await response.json();
      const response2 = await fetch(
        "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/me",
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

      const user = await response2.json();

      setTokens(tokens);
      setUser(user);

      localStorage.setItem("tokens", JSON.stringify(tokens));
      // check Profile if profile is made of invoice or not

      const body = {
        action_metadata: {},
        is_active: true,
      };
      const token = localStorage.getItem("tokens");
      // console.log("token in sign In", JSON.parse(token.accessToken));

      // try {
      //   const response3 = await fetch(
      //     "https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/invoice/profile",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${tokens.accessToken}`,
      //         refresh_token: tokens.refreshToken,
      //         idToken: tokens.idToken,
      //       },
      //       body: '{"action_metadata":{},"is_active":true}',
      //     }
      //   )

      //   const temp = await response3.json()
      //   console.log("response of Check Profile ", temp)
      // } catch (error) {
      //   console.log(error.message)
      // }

      //

      // Navigate to the next page
      // navigate("/360");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <AuthLayout
      rightImg="./assets/vectors/auth-right-3.png"
      rootClass="step-3"
      className="d-flex justify-content-center"
    >
      <div className="d-flex justify-content-center">
        <img className="w-50" src="./assets/vectors/loop.svg" />
      </div>

      <form action="" className="form" onSubmit={handleFormSubmit}>
        <FancyInput
          embossed={true}
          bMargin
          lightLabel
          icon="vectors/mail.svg"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={inputChangeHandler}
        />
        <FancyInput
          embossed={true}
          bMargin
          className="mb-4"
          lightLabel
          icon="vectors/lock.svg"
          id="password"
          name="password"
          type="password"
          value={formState.password}
          placeholder="Password"
          onChange={inputChangeHandler}
        />

        <div className="remember d-flex justify-content-between align-items-center align-items-sm-center flex-column flex-sm-row mb-sm-0 mb-4">
          <a href="#0" className="fw-500 mt-sm-0 mt-3">
            Recover password
          </a>
          <button type="submit" className="btn btn-primary text-light">
            Login
          </button>
        </div>
        <div className="d-flex justify-content-end text-sm-start"></div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Switch from "./Switch";
import moment from "moment";
import { BASEURL, sendNetworkRequest } from "../http/http-request";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import ChipInput from "material-ui-chip-input";
import { LoadingButton } from "@mui/lab";
import { slideAnimationDuration } from "@mui/lab/CalendarPicker/PickersSlideTransition";

const ListItem = ({ item, index }) => {
  const randomHeader = useMemo(() => "Header", []);
  const [clientFirstName, setClientFirstName] = useState();
  const [clientLastName, setClientLastName] = useState();
  const [empolyee, setEmpolyee] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const [tag, setTag] = useState([]);
  const chipRenderer = (
    { chip, className, handleClick, handleDelete },
    key
  ) => (
    <Chip
      className={className}
      key={key}
      label={chip}
      onDelete={handleDelete}
      size="small"
      variant="Filled"
      color="default"
    />
  );
  const handleChange = (e) => {
    setTag(e);
  };


  const updateTag = async () => {
    setLoading(true);
    await sendNetworkRequest(`${BASEURL}/invoice/${item?.id}`, "PATCH", {
      metadata: { tag: tag },
    }).catch((err) => {
      console.error(err);
      alert("Error !, Try again");
    });
    setLoading(false);
  };

  const targetIdFetch = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        headers: {
          authorization: `Bearer ${tokens.accessToken}`,
          idToken: tokens.idToken,
          refresh_token: tokens.refreshToken,
        },
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/users/entity/${id}`,
      });
      setClientFirstName(res.data.human_identity_id.first_name);
      setClientLastName(res.data.human_identity_id.last_name);
      localStorage.setItem("id", JSON.stringify(res.data.id));
      // console.log(res.data.id)

      // localStorage.setItem('invoiceIds',JSON.stringify(res.data.invoices.map(item=>item.id)));
    } catch (error) {
      console.log(error);
    }
  };

  const assignIdFetch = async (id) => {
    try {
      const res = await sendNetworkRequest(`${BASEURL}/core/employees`);
      // console.log(res.data);
      res.data.map((e) => {
        if (e.human_identity_id.id === id) {
          setEmpolyee(
            e.human_identity_id.first_name
          );
        }
      });
      // localStorage.setItem('invoiceIds',JSON.stringify(res.data.invoices.map(item=>item.id)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(item);

    if (item?.dummy === "dummy") return;
    assignIdFetch(item.metadata.assign);
    targetIdFetch(item.target_entity_id.id);
    if (item?.metadata?.tag) {
      setTag(item.metadata.tag);
    }
    let value = item?.principal_profile_id?.data
      ? item?.principal_profile_id?.data
      : "";
    if (value) {
      value = JSON.parse(value);
      // console.log(value);
      setName(value?.model);
    }
  }, []);

  const [checkIn, setCheckIn] = useState(item?.metadata?.check_in);
  const updateCheckInStatus = (checked) => {
    setCheckIn(checked);
    sendNetworkRequest(`${BASEURL}/invoice/${item?.id}`, "PATCH", {
      metadata: { check_in: checked },
    })
      .then((res) => {
        setCheckIn(checked);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const problems = [
    {
      value: "General Maintenance",
      img: "./assets/vectors/generalmaintenance.svg",
    },
    { value: "Tire", img: "./assets/vectors/tire.svg" },
    { value: "Knock Noise", img: "./assets/vectors/knocknoise.svg" },
    { value: "Rolling Noise", img: "./assets/vectors/rollingnoise.svg" },
    { value: "Silent Noise", img: "./assets/vectors/silentnoise.svg" },
    { value: "Liquid Flow", img: "./assets/vectors/liquidflow.svg" },
    { value: "Malfunction", img: "./assets/vectors/malfunction.svg" },
    {
      value: "Don't ride straight",
      img: "./assets/vectors/dontridestraight.svg",
    },
    { value: "Air flow", img: "./assets/vectors/airflow.svg" },
    { value: "A/C check", img: "./assets/vectors/accheck.svg" },
    {
      value: "Check Engine Light",
      img: "./assets/vectors/checkenginelight.svg",
    },
    { value: "Brake Problem", img: "./assets/vectors/brakeproblem.svg" },
    { value: "Hole/Puncture", img: "./assets/vectors/holepuncture.svg" },
    { value: "Battery", img: "./assets/vectors/battery.svg" },
  ];

  if (item?.dummy === "dummy") return <div className="cards"></div>;
  return (
    <div className="cards">
      <div
        key={"card-" + item?.metadata?.name + index}
        className={`card-wrap${item?.displaced ? " card-displaced" : ""}`}
      >
        {/*	<Link

					to='/workshop-articles'
					onClick={() => {
						localStorage.setItem('invoiceId', item.id);
						localStorage.setItem('invoiceClient', item.metadata.client);
						console.log('note  here : ', item);
					}}
				>*/}

        <div className="card">
          <div className="card-head d-flex justify-content-between align-items-center">
            <div className="text">
              <div className="fw-700">{item?.metadata?.name}</div>
              <p className="fs-12 mb-4">Located in {item?.metadata?.location}</p>
            </div>

            <div className="options d-flex justify-content-end align-items-center">
              {item && (
                <Switch
                  // checked={item?.metadata?.check_in}
                  checked={checkIn}
                  onChange={(e) => {
                    updateCheckInStatus(e?.target.checked);
                  }}
                />
              )}
              {item && (
                <div className="d-flex flex-column">
                  {item?.metadata?.landmarks?.map((landmark, index) => {
                    // console.log(landmark?.problem?.toLowerCase(), landmark);
                    console.log(
                      problems?.filter((p) => p?.value === landmark?.problem)[0]
                        ?.img
                    );
                    return (
                      <img
                        key={index}
                        className="user-img mb-2"
                        src={
                          problems?.filter(
                            (p) => p?.value === landmark?.problem
                          )[0]?.img
                        }
                        // src={`./assets/vectors/${landmark?.problem
                        //   ?.toLowerCase()
                        //   ?.replace(/\s/g, "")}.svg`}
                        alt={landmark?.problem}
                      />
                    );
                  })}
                  {/* {" "}
                  <img
                    className="user-img"
                    src={"./assets/vectors/lmcel.svg"}
                    alt="add"
                  /> */}
                </div>
                //   <h5 className="sub-title text-light-5">
                //   {item.metadata.assign}
                // </h5>
              )}
              {item?.withAdd && (
                <button className="btn btn-plus">
                  <img src="./assets/vectors/workshop-cart-add.svg" alt="add" />
                </button>
              )}
            </div>
          </div>
          <div className="text-light-5 card-text"></div>

          <div className="card-foot">
            <div className="user-info">
              {item && (
                <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={"./assets/vectors/car-1.svg"}
                    alt="card-user"
                  />
                </div>
              )}

              <div style={{ display: "block", width: "100%" }}>
                <h4 className="sub-title">{clientFirstName}</h4>

                <p className="sub-title text-light-5">
                {name}
              </p>
              </div>
            </div>
            <Link
              to="/workshop-articles"
              onClick={() => {
                localStorage.setItem("invoiceId", item.id);
                localStorage.setItem("invoiceClient", item.metadata.client);
              }}
            >
              <div className="time">
                <div className="text fw-600">
                  {item?.metadata?.status === 0
                    ? moment(`${item?.metadata?.sdate}`).format("h:mm")
                    : moment(`${item?.metadata?.edate}`).format("h:mm")}
                </div>
              </div>
            </Link>
          </div>
          <div className="card-body"></div>
          <div
            className="tags-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <ChipInput
              chipRenderer={chipRenderer}
              defaultValue={tag}
              onChange={(chips) => handleChange(chips)}
              style={{ marginTop: "4px", width: "270px" }}
              chip="newmmm"
            />
            {!loading ? (
              <LoadingButton
                variant="Filled"
                size="small"
                onClick={() => {
                  updateTag();
                }}
                style={{ marginTop: "4px", marginLeft: "auto" }}
              >
                update tags
              </LoadingButton>
            ) : (
              <LoadingButton
                loading
                variant="Filled"
                size="small"
                style={{ marginTop: "4px", marginLeft: "auto" }}
              >
                update tags
              </LoadingButton>
            )}
          </div>
          <div className="col-12 d-flex">
            <div className="col-6 d-flex">
              <div className="col-2">
                <img src="./assets/vectors/np_person.svg"/>
              </div>
              <p className="fs-10 mt-1">Assigned to {empolyee}</p>
            </div>
            <div className="col-5 d-flex">
              <div className="col-2">
                <img src="./assets/vectors/np_duration.svg"/>
              </div>
              <p className="fs-10 mt-1">Duration {item?.metadata?.duration}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="progress-bar w-100">
        <div
          className="progress"
          style={{ width: item?.metadata?.progress + "%" }}
        ></div>
      </div>
    </div>
  );
};

export default ListItem;

import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import AddBtn from "../components/AddBtn";
import { useSelect } from "downshift";
import ModelServices from "./ModalServicesAppointment";
import { BASEURL, sendNetworkRequest } from "../http/http-request";
import moment from "moment";
import axios from "axios";
import SelectSearch, { fuzzySearch } from "react-select-search";
import "react-select-search/dist/cjs";
import nodeAxios from "../utils/nodeAxios";

const ModalAppointment = (props) => {
  const [servicesModalOpenState, setServicesModalOpenState] = useState(false);
  const [circles, setCircles] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [note, setNote] = useState("");

  // service_id : {
  //   address: item?.address ? item?.address : null,
  //   availableToBook: item?.availableToBook ? item?.availableToBook : true,
  //   category: item?.category ? item?.category : "",
  //   deleted_at: null,
  //   duration: item?.duration ? item?.duration : 0,
  //   endDate: item?.endDate ? item?.endDate : "",
  //   id: item?.id ? item?.id : "",
  //   name: item?.name ? item?.name : "",
  //   price: item?.price ? item?.price : 0,
  //   serviceType: item?.serviceType ? item?.serviceType : 0,
  //   startDate: item?.startDate ? item?.startDate : "",
  // }

  const [formState, setFormState] = useState({
    assign: "",
    note: "",
    sdate: "",
    client_name: "",
    edate: "",
    nodeclient: "",
    nodewith: "",
    due_date: "",
    name: "",
    duration: "",
  });
  const inputChangeHandler = (evt) => {
    console.log(evt.target.name, evt.target.value);
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  // STATE
  const [currentUser, setCurrentUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectUserProfiles, setSelectedUserProfiles] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedSide, setSelectedSide] = useState();
  const [selectedWhen, setSelectedWhen] = useState();
  const [landmarks, setLandmarks] = useState([]);
  const [services, setServices] = useState([]);

  function handleSelectedProblem(e) {
    setSelectedProblem(e.selectedItem);
    setLandmarks((landmarks) =>
      landmarks.map((land) =>
        land.id === e.selectedItem.id
          ? { ...land, problem: e.selectedItem.value }
          : land
      )
    );
  }
  function handleSelectedSide(e) {
    setSelectedSide(e.selectedItem);
    setLandmarks((landmarks) =>
      landmarks.map((land) =>
        land.id === e.selectedItem.id
          ? { ...land, side: e.selectedItem.value }
          : land
      )
    );
  }
  function handleSelectedWhen(e) {
    setSelectedWhen(e.selectedItem);
    setLandmarks((landmarks) =>
      landmarks.map((land) =>
        land.id === e.selectedItem.id
          ? { ...land, when: e.selectedItem.value }
          : land
      )
    );
  }

  const [problems, setProblem] = useState([
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
  ]);

  const [sides, setSides] = useState([
    { value: "Front Right", img: "" },
    { value: "Back Right", img: "" },
    { value: "Right Side Center", img: "" },
    { value: "Front Left", img: "" },
    { value: "Back Left", img: "" },
    { value: "Left Side Center", img: "" },
    { value: "below", img: "" },
  ]);

  const [when, setWhen] = useState([
    { value: "High Speed", img: "" },
    { value: "Low Speed", img: "" },
    { value: "Always", img: "" },
    { value: "Rolling over a hole", img: "" },
    { value: "Braking", img: "" },
    { value: "Accleterating", img: "" },
    { value: "Turn Left", img: "" },
    { value: "Turn Right", img: "" },
    { value: "Hot engine", img: "" },
    { value: "Cold engine", img: "" },
  ]);
  const { employeeList, Id } = props;
  // console.log(employeeList);

  const Services = [
    {
      id: 1,
      part: "Front Brake",
      partPrice: "100",
      imgSrc: "",
    },
    {
      id: 2,
      part: "Side Mirror",
      partPrice: "150",
    },
  ];

  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };
  const getClickCoords = (event) => {
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };
  const addCircle = (event) => {
    let [x, y] = getClickCoords(event);
    let newCircle = (
      <div
        id={Number(circles.length + 1)}
        className="carcircle"
        style={{ top: `${y - 20}px`, left: `${x - 20}px` }}
      >
        {circles.length + 1}
        {setLandmarks((landmarks) => [
          ...landmarks,
          { id: Number(circles.length + 1), problem: "", side: "", when: "" },
        ])}
      </div>
    );
    let newAppointment = (
      <div className="d-flex align-items-start car-appointment">
        <div className="item mb-3 ">
          {circles.length + 1}. Check for{" "}
          <DropdownSelect
            options={problems.map((problem) => ({
              ...problem,
              id: Number(circles.length + 1),
            }))}
            SelectedOption={selectedProblem}
            handleSelectedItemChange={(e) => handleSelectedProblem(e)}
          />
          located
          <DropdownSelect
            options={sides.map((side) => ({
              ...side,
              id: Number(circles.length + 1),
            }))}
            SelectedOption={selectedSide}
            handleSelectedItemChange={(e) => handleSelectedSide(e)}
          />
          Side, when{" "}
          <DropdownSelect
            options={when.map((when) => ({
              ...when,
              id: Number(circles.length + 1),
            }))}
            SelectedOption={selectedWhen}
            handleSelectedItemChange={(e) => handleSelectedWhen(e)}
          />
        </div>
        <img
          id={appointments.length}
          src="./assets/vectors/delete.svg"
          alt="delete"
          onClick={deleteAppointment}
          className="hover"
        />
      </div>
    );

    let allCircles = [...circles, newCircle];
    let allAppointment = [...appointments, newAppointment];

    // update 'circles'
    setCircles(allCircles);
    setAppointments(allAppointment);
    console.log(appointments);
  };
  const deleteAppointment = (e) => {
    const index = Number(e.target.id);
    const updatedAppointments = appointments.filter((circle, i) => {
      return i !== index;
    });
    setAppointments(updatedAppointments);
    const updatedCircles = circles.filter((circle, i) => {
      return i !== index;
    });
    setCircles(updatedCircles);
  };
  const createAppointment = async function (event) {
    event.preventDefault();
    try {
      const noteResponse = await sendNetworkRequest(
        `${BASEURL}/core/notes`,
        "POST",
        {
          data: {
            note,
          },
        }
      );
      // console.log(formState);
      if (noteResponse && noteResponse.data) {
        sendNetworkRequest(`${BASEURL}/invoice`, "POST", {
          target_entity_id: selectedClient,
          currency_id: "e855330b-e974-428d-a666-bd1b57a786be",
          principal_profile_id: selectedProfile,
          subtotal: 0,
          // due_date: new Date(formState.edate),
          due_date: moment(formState?.sdate)
            .add(formState?.duration, "m")
            .toDate(),
          metadata: {
            name: formState.name,
            profile_name: formState.nodewith,
            client_name: formState.nodeclient,
            progress: 0,
            status: 0,
            assign: formState.assign,
            sdate: new Date(formState.sdate),
            edate: moment(formState?.sdate)
              .add(formState?.duration, "m")
              .toDate(),
            // edate: new Date(formState.edate),
            landmarks: landmarks,
          },
          private_note_id: noteResponse.data.id,
          customer_note_id: noteResponse.data.id,
        })
          .then((res) => {
            if (res && res.data) {
              services.forEach(async (service) => {
                await nodeAxios("POST", "service/invoice", {
                  invoice_id: res.data.id,
                  service_id: service.service_id.id,
                });
                await nodeAxios("POST", "invoice/items", {
                  invoice_id: res.data.id,
                  name: service.service_id.name,
                  base_price: service.service_id.price,
                  description: "No description available",
                  metadata: {
                    ...service.service_id,
                    is_service: true,
                    is_article: false,
                  },
                });
              });

              alert("Appointment has been successfully created");
            }
          })
          .catch((err) => {
            console.log(err.response.data);
            // alert("An error occured when creating an appointment");
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatedInvoice = async (event) => {
    event.preventDefault();
    const value = {
      metadata: {
        name: formState.name,
        profile_name: formState.nodewith,
        client_name: selectedClient,
        sdate: new Date(formState.sdate),
        edate: new Date(formState.edate),
      },
    };

    try {
      const res = await sendNetworkRequest(
        `${BASEURL}/invoice/${Id}`,
        "PATCH",
        value
      );
      console.log(res);
      alert("Update Successfully");
    } catch (err) {
      console.log(err);
      alert("Error !");
    }
    // props.modalCloseHandler();
  };

  useEffect(() => {
    if (Id) {
      // console.log("HEKKEIE", Id);
      const fetch = async () => {
        const res = await sendNetworkRequest(`${BASEURL}/invoice/${Id}`);
        console.log(res);
        console.log(moment(res.data.metadata.sdate).format("YYYY-MM-DDTHH:mm"));

        setFormState({
          note: res.data.metadata?.note ? res.data.metadata?.note : "",
          sdate: res.data.metadata?.sdate
            ? moment(res.data.metadata.sdate).format("YYYY-MM-DDTHH:mm")
            : "",
          client_name: res.data.metadata?.client_name
            ? res.data.metadata?.client_name
            : "",
          edate: res.data.metadata?.edate
            ? moment(res.data.metadata.edate).format("YYYY-MM-DDTHH:mm")
            : "",
          nodeclient: "",
          nodewith: res.data.metadata?.profile_name
            ? res.data.metadata?.profile_name
            : "",
          due_date: "",
          name: res.data.metadata?.name ? res.data.metadata?.name : "",
          landmarks: res.data.metadata?.landmarks
            ? res.data.metadata.landmark
            : null,
        });
      };
      fetch();
    }
  }, [Id]);

  // Use effect to fetch current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendNetworkRequest(`${BASEURL}/users/me`);
        setCurrentUser(res.data.user);
      } catch (error) {
        // console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // Use effect to fetch client list (Entity Connections) -- this is for the dropdown
  useEffect(() => {
    const fetchData = async () => {
      const res = await sendNetworkRequest(
        `${BASEURL}/users/connections/${currentUser.id}/0`
      );

      // Getting the client entities
      const ids = res.data.connections.map(
        (conn) => conn.connection_id.target_entity_id.id
      );

      const data = await sendNetworkRequest(
        `${BASEURL}/users/get-users`,
        "POST",
        { entity_ids: ids }
      );
      data.data.users.map((user) => {
        let val = {
          text: `${user.human_identity_id.first_name} ${user.human_identity_id.last_name}`,
          value: user.entity_id.id,
        };
        setClients((oddvalue) => [...oddvalue, val]);
      });
    };
    if (currentUser) fetchData();
  }, [currentUser]);

  // Use effect to fetch selected client profiles (Entity Profiles) -- this is for the dropdown
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await sendNetworkRequest(
          `${BASEURL}/profile/single-user/profile/all/${selectedClient}`,
          "GET"
        );
        setSelectedUserProfiles(
          data.data.map((profile) => ({
            text:
              JSON.parse(profile.object_id.data).year +
              JSON.parse(profile.object_id.data).model,
            value: profile.object_id.id,
            disabled: false,
            selected: true,
          }))
        );
        setSelectedProfile(data.data[0].object_id.id);
      } catch (error) {
        // console.log(error.message);
      }
    };
    if (selectedClient) fetchProfiles();
  }, [selectedClient]);

  useEffect(() => {
    console.log(landmarks);
  }, [landmarks]);
  const handleServiceRemove = (service_id) => {
    const newServices = services.filter(
      (service) => service.service_id.id !== service_id
    );
    setServices(newServices);
  };

  const handelRequired = () => {
    alert("Please fill all required fields");
  };

  return (
    <form onSubmit={Id ? updatedInvoice : createAppointment}>
      <div>
        <Modal
          className="modal-appointment"
          buttonText={`${Id ? "Edit" : "Add"}`}
          {...props}
        >
          <div className="client-modal-body">
            <div className="container-fluid px-0">
              <div className="row gy-5">
                <div className="col-lg-5">
                  <div className="row">
                    <h3 className="section-title mb-4">Appointment</h3>
                    <div className="col-8 mb-3">
                      <p className="mt-2">
                        Name{" "}
                        <span className="fs-14 text-danger">
                          {formState.name == "" ? "*" : ""}
                        </span>
                      </p>
                      <FancyInput
                        sMargin
                        id="name"
                        name="name"
                        onChange={inputChangeHandler}
                        placeholder="Give a Title to your Appointment..."
                        value={formState.name}
                        maxLength="15"
                      />
                    </div>
                    {!Id && (
                      <div className="col-sm-4 mb-3">
                        <p className="mt-2">
                          Assign to{" "}
                          <span className="fs-14 text-danger">
                            {formState.assign == "" ? "*" : ""}
                          </span>
                        </p>
                        <FancyInput
                          select
                          options={employeeList ? employeeList : []}
                          id="assignedTo"
                          name="assign"
                          onChange={inputChangeHandler}
                          placeholder="Select in the menu"
                          rootClassName="appointment-select"
                          inputClassName="custom-select"
                        />
                      </div>
                    )}

                    <div className="col-sm-6 mb-3">
                      <p className="mt-2">
                        Start time{" "}
                        <span className="fs-14 text-danger">
                          {formState.sdate == "" ? "*" : ""}
                        </span>
                      </p>
                      <FancyInput
                        sMargin
                        id="date"
                        type="datetime-local"
                        name="sdate"
                        onChange={inputChangeHandler}
                        placeholder="DD/MM/AA   at 00:000"
                        inputClassName="dateInput"
                        value={formState.sdate}
                      />
                    </div>

                    <div className="col-sm-6 mb-3">
                      <p className="mt-2">
                        Duration (minutes){" "}
                        <span className="fs-14 text-danger">
                          {formState.duration == "" ? "*" : ""}
                        </span>
                      </p>
                      <FancyInput
                        type="number"
                        sMargin
                        id="name"
                        name="duration"
                        onChange={inputChangeHandler}
                        placeholder="60 minutes"
                        value={formState.duration}
                      />
                    </div>
                    {/* <div className="col-sm-6 mb-3">
                      <p className="mt-2">End time</p>
                      <FancyInput
                        sMargin
                        id="date"
                        type="datetime-local"
                        name="edate"
                        onChange={inputChangeHandler}
                        placeholder="start time"
                        inputClassName="dateInput"
                        value={formState.edate}
                      />
                    </div> */}
                    {!Id && (
                      <div className="col-sm-6 mb-3">
                        <p className="mt-2">
                          Node Client{" "}
                          <span className="fs-14 text-danger">
                            {formState.nodeclient == "" ? "*" : ""}
                          </span>
                        </p>
                        {/* <FancyInput
                        select
                        options={clients ? clients : []}
                        id="assignedTo"
                        value={`${selectedClient?.text}`}
                        name="nodeclient"
                        onChange={(e) => {
                          setSelectedClient(e.target.value);
                        }}
                        placeholder="Select in the menu"
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                      /> */}
                        <SelectSearch
                          options={
                            clients
                              ? clients.map((client) => {
                                  return {
                                    name: client.text,
                                    value: client.value,
                                  };
                                })
                              : []
                          }
                          value={`${selectedClient}`}
                          onChange={(e) => {
                            setSelectedClient(e);
                          }}
                          search
                          filterOptions={fuzzySearch}
                          placeholder="Select in the menu"
                        />
                      </div>
                    )}
                    {!Id && (
                      <div className="col-sm-6 mb-3">
                        {selectedClient == "" ? (
                          ""
                        ) : (
                          <>
                            <p className="mt-2">
                              Noded with{" "}
                              <span className="fs-14 text-danger">
                                {formState.nodewith == "" ? "*" : ""}
                              </span>
                            </p>
                            <FancyInput
                              select
                              options={
                                selectUserProfiles ? selectUserProfiles : []
                              }
                              value={
                                selectedProfile ? selectedProfile.text : ""
                              }
                              id="client"
                              name="nodedwith"
                              onChange={(e) => {
                                setSelectedProfile(e.target.value);
                              }}
                              placeholder="Select in the menu"
                              rootClassName="appointment-select"
                              inputClassName="custom-select"
                            />
                          </>
                        )}
                      </div>
                    )}
                    <div className="col-sm-12 mb-3">
                      <p className="mt-2">Notes</p>
                      <FancyInput
                        sMargin
                        textArea
                        id="notes"
                        type="text"
                        name="note"
                        onChange={inputChangeHandler}
                        placeholder="Add notes on this Appointment"
                        value={formState.note}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="row gy-5">
                    <div className="col-sm-6 d-flex align-items-center justify-content-center">
                      <div
                        className="mt-5 clickalbe-car"
                        src="./assets/vectors/ar.svg"
                        alt="car"
                        onClick={addCircle}
                      >
                        {circles}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <h3 className="section-title">Appointment Landmarks</h3>
                      <div className="car-work-details emboss-white p-3 br-16 px-3 mt-4 pe-lg-5">
                        {appointments}
                      </div>

                      <div className="mt-5 d-flex justify-content-between">
                        <h3 className="section-title">
                          Service &amp; Articles
                        </h3>
                        <ModelServices
                          isOpen={servicesModalOpenState}
                          setServices={setServices}
                          services={services}
                          modalCloseHandler={() =>
                            modalCloseHandler(setServicesModalOpenState)
                          }
                        />
                        <AddBtn
                          type="button"
                          small
                          pale
                          onClick={() =>
                            modalOpenHandler(setServicesModalOpenState)
                          }
                        />
                      </div>

                      <div className="table-container mt-3">
                        <table>
                          {/* {Services.map((item) => (
                            <tr>
                              <td>
                                <div className="fs-12  text-light-5">
                                  {item.part}
                                </div>
                              </td>
                              <td>
                                <div className="fs-12 ">{item.partPrice}</div>
                              </td>
                              <td className="text-end" width={30}>
                                <img
                                  src="./assets/vectors/delete.svg"
                                  alt="delete"
                                />
                              </td>
                            </tr>
                          ))} */}
                          {services.map((service) => {
                            return (
                              <tr>
                                <td>
                                  <div className="fs-12  text-light-5 mt-3">
                                    {service?.service_id?.name}
                                  </div>
                                </td>
                                <td>
                                  <div className="fs-12 "></div>
                                </td>
                                <td className="text-end " width={30}>
                                  <img
                                    src="./assets/vectors/delete.svg"
                                    alt="delete"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleServiceRemove(service.service_id.id)
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                  {formState.name != "" &&
                  formState.duration != "" &&
                  formState.sdate != "" ? (
                    ""
                  ) : (
                    <div className="py-2">
                      <button
                        className="btn btn-add btn-gradient position-absolute"
                        style={{ right: "27px", bottom: "20px" }}
                        disabled
                      >
                        <img
                          class="add"
                          src="../assets/vectors/add-blue.svg"
                          alt="add"
                        />{" "}
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </form>
  );
};

function DropdownSelect({ options, SelectedOption, handleSelectedItemChange }) {
  const items = options;
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    selectedItem,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    SelectedOption,
    onSelectedItemChange: handleSelectedItemChange,
  });
  return (
    <>
      <button
        type="button"
        className="landmark-select position-relative "
        {...getToggleButtonProps()}
      >
        {selectedItem ? selectedItem.value : "select"}&nbsp;
      </button>
      <ul
        className="position-absolute landmark-select-options"
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className="landmark-select-option"
              style={
                highlightedIndex === index ? { backgroundColor: "#e7ebee" } : {}
              }
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.value}
              {item.img == "" ? "" : <img src={item.img} width="15%" />}
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModalAppointment;

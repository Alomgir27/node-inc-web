import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import AddBtn from "../components/AddBtn";
import nodeAxios from "../utils/nodeAxios";

const ModalConnectors = (props) => {
  const [active, setActive] = useState("placeAnOrder");
  const [next, setNext] = useState(false);
  const [tab2, setTab2] = useState(false);
  const handelSelect = (e) => {
    setActive(e.target.id);
  };
  const [tireType, setTireType] = useState({
    text: "summer",
    value: 0,
  });
  const [tyreProfiles, setTyreProfiles] = useState(null);

  const [order, setOrder] = useState([]);

  const [connectors, setConnectors] = useState([
    {
      text: "Choose a Connectors  ",
      id: "",
      disable: true,
      selected: true,
    },
  ]);
  const [selectedConnector, setSelectedConnector] = useState();

  const handleTireTypeChange = (e) => {
    const value = e;
    switch (value) {
      case "summer":
        setTireType({
          text: "summer",
          value: 5,
        });
        break;
      case "winter":
        setTireType({
          text: "winter",
          value: 7,
        });
        break;
      default:
        setTireType({
          text: "4 seasons",
          value: 1,
        });
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await nodeAxios("GET", "/connector/all/0");
        const connectors = data.connectors.map((connector) => ({
          text: connector.connector_key_id.name,
          id: connector.connector_key_id.id,
          disable: false,
          selected: false,
        }));
        setConnectors((conn) => [
          {
            text: "Choose a Connectors  ",
            id: "",
            disable: true,
            selected: true,
          },
          ...connectors,
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // console.log(tab2, "tab");

  // Fetch tires
  useEffect(() => {
    const fetchData = async () => {
      try {
        const size = JSON.parse(props.profile.data).tires;
        const type = tireType.value;
        console.log(size);
        console.log(type);
        const data = await nodeAxios(
          "GET",
          `connector/vln/inventory?tireSize=${size}&tireType=${type}`
        );

        const array = Object.keys(data.profiles).map((key) => ({
          ...data.profiles[key],
          key,
        }));

        setTyreProfiles(array);
      } catch (error) {
        console.log(error);
      }
    };
    if (props.profile) fetchData();
  }, [props.profile, tireType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedConn = connectors.find(
      (conn) => conn.text === selectedConnector
    );

    console.log(selectedConn);
    console.log(props.invoice);

    try {
      const data = await nodeAxios("POST", "/connector/vln/order", {
        connector_id: selectedConn.id,
        products: order,
        invoice_id: props.invoice.id,
        target_entity_id: props.invoice.target_entity_id.id,
      });

      console.log("order", order);

      // const tokens = await JSON.parse(localStorage.getItem("tokens"));

      // const data = await axios({
      //   method: "POST",
      //   url: `http://localhost:3000/prod/connector/vln/order`,
      //   headers: {
      //     Authorization: `Bearer ${tokens.accessToken}`,
      //     refresh_token: tokens.refreshToken,
      //     idToken: tokens.idToken,
      //   },
      //   data: {
      //     connector_id: selectedConn.id,
      //     products: order,
      //     invoice_id: props.invoice.id,
      //     target_entity_id: props.invoice.target_entity_id.id,
      //   },
      // });

      console.log(data);
      alert("Order placed");
    } catch (error) {
      console.log(error.response);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Modal
        titleVector="./assets/vectors/active-connector.svg"
        title="Connectors"
        {...props}
        headClassName="position-relative gradient-text "
        buttonText={next === true ? "Close" : ""}
        className="modal-connectors"
      >
        <div className="form-modal-body pb-3">
          <div className="d-flex justify-content-evenly mb-4 position-absolute connctors-header">
            <div
              className={`connctors-header-circle emboss ${
                tab2 === false ? "gradient-text" : ""
              }`}
            >
              1
            </div>
            <div
              className={`connctors-header-circle emboss ${
                tab2 === true ? "gradient-text" : ""
              }`}
            >
              2
            </div>
          </div>

          <div className="continer-fluid px-4 mt-4 w-100">
            {tab2 === false ? (
              <>
                <div className="row d-flex justify-content-between w-100">
                  <div className="col-4">
                    <div
                      id="placeAnOrder"
                      className={`${
                        active === "placeAnOrder" ? "emboss" : "emboss-inner"
                      }  connector-select hover my-4`}
                      onClick={handelSelect}
                    >
                      <p>Place an order</p>
                    </div>
                    <div
                      id="lookInventory"
                      className={`${
                        active === "lookInventory" ? "emboss" : "emboss-inner"
                      }  connector-select hover mb-3 mt-5`}
                      onClick={handelSelect}
                    >
                      <p>-</p>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="mb-4">
                      <div>
                        Tire Size:{" "}
                        {props &&
                          props?.invoice?.principal_profile_id?.data &&
                          JSON.parse(props?.invoice?.principal_profile_id?.data)
                            .tires}
                      </div>
                      <p className="mb-2 fw-600">Choose a Connectors</p>
                      <FancyInput
                        select
                        options={connectors}
                        id="client"
                        name="nodedwith"
                        placeholder="Select in the menu"
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                        value={selectedConnector ? selectedConnector.text : ""}
                        onChange={(e) => setSelectedConnector(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="mb-2 fw-600">Type of tires</p>
                      <FancyInput
                        select
                        options={[
                          {
                            text: "Summer",
                            selected: true,
                          },
                          {
                            text: "Winter",
                            selected: false,
                          },
                          {
                            text: "4 seasons",
                            selected: false,
                          },
                        ]}
                        id="client"
                        name="nodedwith"
                        placeholder="Select in the menu"
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                        value={tireType.text}
                        onChange={(e) => handleTireTypeChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {tyreProfiles &&
                  tyreProfiles.map((profile) => (
                    <TyreComponent
                      tire={profile}
                      order={order}
                      setOrder={setOrder}
                    />
                  ))}

                {/* <div className="row emboss-inner p-4 rounded d-flex justify-content-center align-items-center mb-5">
                  <div className="col-2">
                    <FancyInput
                      prominant
                      sMargin
                      id=" qty"
                      name="qty"
                      placeholder="Qty"
                      // onChange={changeHandler}
                      // value={newRequest?.name}
                      //   onChange={(e) => setSerial(e.target.value)}
                    />
                  </div>
                  <div className="col-6 d-flex">
                    <img
                      src="./assets/img/tyre.png"
                      width="40px"
                      height="60px"
                      alt=""
                    />
                    <div className="mx-2">
                      <h3>TOYO TIRES - 205/65R17</h3>
                      <p>783764327131-21 Nulla tincidunt lobortis </p>
                      <p className="" style={{ fontSize: "11px" }}>
                        Nulla tincidunt lobortis arcu, id ultricies elit
                        scelerisque imperdiet. Morbi sed ultrices nunc. Integer
                        aliquam rutrum arcu sodales.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-3  text-muted">
                    Availability : 34 <br />
                    Type : Summer
                    <br />
                    Category : High perf.
                  </div>
                  <div className="col-1  fw-900 text-muted">
                    <h2>132,34$</h2>
                  </div>
                </div>

                <div className="row emboss-inner p-4 rounded d-flex justify-content-center align-items-center mb-5">
                  <div className="col-2">
                    <FancyInput
                      prominant
                      sMargin
                      id=" qty"
                      name="qty"
                      placeholder="Qty"
                      // onChange={changeHandler}
                      // value={newRequest?.name}
                      //   onChange={(e) => setSerial(e.target.value)}
                    />
                  </div>
                  <div className="col-6 d-flex">
                    <img
                      src="./assets/img/tyre.png"
                      width="40px"
                      height="60px"
                      alt=""
                    />
                    <div className="mx-2">
                      <h3>TOYO TIRES - 205/65R17</h3>
                      <p>783764327131-21 Nulla tincidunt lobortis </p>
                      <p className="" style={{ fontSize: "11px" }}>
                        Nulla tincidunt lobortis arcu, id ultricies elit
                        scelerisque imperdiet. Morbi sed ultrices nunc. Integer
                        aliquam rutrum arcu sodales.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-3  text-muted">
                    Availability : 34 <br />
                    Type : Summer
                    <br />
                    Category : High perf.
                  </div>
                  <div className="col-1  fw-900 text-muted">
                    <h2>132,34$</h2>
                  </div>
                </div> */}

                {/* <div className="row emboss-inner p-4 rounded d-flex justify-content-center align-items-center">
                  <div className="col-2">
                    <FancyInput
                      prominant
                      sMargin
                      id=" qty"
                      name="qty"
                      placeholder="Qty"
                      // onChange={changeHandler}
                      // value={newRequest?.name}
                      //   onChange={(e) => setSerial(e.target.value)}
                    />
                  </div>
                  <div className="col-6 d-flex">
                    <img
                      src="./assets/img/tyre.png"
                      width="40px"
                      height="60px"
                      alt=""
                    />
                    <div className="mx-2">
                      <h3>TOYO TIRES - 205/65R17</h3>
                      <p>783764327131-21 Nulla tincidunt lobortis </p>
                      <p className="" style={{ fontSize: "11px" }}>
                        Nulla tincidunt lobortis arcu, id ultricies elit
                        scelerisque imperdiet. Morbi sed ultrices nunc. Integer
                        aliquam rutrum arcu sodales.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-3  text-muted">
                    Availability : 34 <br />
                    Type : Summer
                    <br />
                    Category : High perf.
                  </div>
                  <div className="col-1  fw-900 text-muted">
                    <h2>132,34$</h2>
                  </div>
                </div> */}
              </>
            )}
            {selectedConnector && (
              <div className="w-100 d-flex justify-content-end">
                {next === true ? (
                  ""
                ) : (
                  <AddBtn
                    gradient
                    title="Next"
                    onClick={(e) => setNext(true) || setTab2(true)}
                  />
                )}
              </div>
            )}
            <button
              className="btn gradient-text emboss py-2 px-4 fw-600 fs-16"
              style={{ bottom: "-59px", right: "105px" }}
              onClick={(e) => handleSubmit(e)}
            >
              Place order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const TyreComponent = (props) => {
  const [quantity, setQuantity] = useState("");

  const tyreResolver = (value) => {
    switch (value) {
      case "1":
        return "Summer";
      case "2":
        return "Winter";
      default:
      case "3":
        return "4 seasons";
    }
  };

  const { setOrder } = props;

  const handleChange = (e) => {
    setQuantity(e.target.value);
    setOrder((orders) => {
      const check = orders.find((order) => order.sku === props.tire.key);

      if (parseInt(e.target.value) === 0 || e.target.value === "") {
        console.log("here");
        return orders.filter((order) => order.sku !== props.tire.key);
      }

      if (check)
        return orders.map((order) => {
          return order.sku === props.tire.key
            ? { ...order, quantity: parseInt(e.target.value) }
            : order;
        });

      return [
        ...orders,
        {
          sku: props.tire.key,
          brandname: props.tire.manufacturer,
          data: props.tire,
          quantity: parseInt(e.target.value),
          key: props.tire.key,
        },
      ];
    });
  };

  return (
    <div className="row emboss-inner p-4 rounded d-flex justify-content-center align-items-center mb-5">
      <div className="col-2">
        <FancyInput
          prominant
          sMargin
          id=" qty"
          name="qty"
          placeholder="Qt. order"
          onChange={handleChange}
          value={quantity}
        />
      </div>
      <div className="col-6 d-flex">
        <img src={props.tire.photo} width="40px" height="60px" alt="" />
        <div className="mx-2">
          <h3>{props.tire.description}</h3>
          {/* <p>783764327131-21 Nulla tincidunt lobortis </p> */}
          <p>Code : {props.tire.key}</p>
          <p>Qty Manufacturer : {props.tire.qtyManufacturer}</p>
          <p>Speed Index : {props.tire.speedIndex}</p>
          {/* <p className="" style={{ fontSize: "11px" }}>
          </p> */}
        </div>
      </div>
      <div className="col-3  text-muted">
        Availability : {props.tire.totalQty} <br />
        Type : {tyreResolver(props.tire.tireType)}
        <br />
        Category : {props.tire.inventoryCategory}
      </div>
      <div className="col-1  fw-900 text-muted">
        <h2>{props.tire.listPrice} $CAD</h2>
      </div>
    </div>
  );
};

export default ModalConnectors;

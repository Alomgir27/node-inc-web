import React, { useEffect, useState } from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";

// import ModelServices from './ModalServices';
import { BASEURL, sendNetworkRequest } from "../http/http-request";
import nodeAxios from "../utils/nodeAxios";

const ModalServices = (props) => {
  const [articlesValue, setArticles] = useState([]);
  const [servicesValue, setServices] = useState([]);

  const [articlesSearchItems, setArticlesSearchItems] = useState([]);
  const [servicesSearchItems, setServicesSearchItems] = useState([]);

  const [selected, setSelected] = useState({});
  const [type, setType] = useState(null);

  const handelItemSelect = async (service) => {
    setSelected(service);
    props?.setServices([...props.services, service]);
  };

  const handleArticleClick = async (event) => {
    event.preventDefault();
    setType("articles");
    const articles = await nodeAxios("GET", "profile/entity/artiles/0");
    articles.articles.forEach(
      (article) => (article.object_id.data = JSON.parse(article.object_id.data))
    );
    setArticles(articles.articles);
    setArticlesSearchItems(articles.articles);
  };
  const handleServiceClick = async (event) => {
    event.preventDefault();
    setType("services");
    const { services } = await nodeAxios("GET", "service/all/0");
    setServices(services);
    setServicesSearchItems(services);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profile_id = localStorage.getItem("profile_id");
    await nodeAxios("POST", "invoice/items", {
      invoice_id: props.invoice_id,
      name: selected.object_id.category,
      base_price: selected.object_id.data.price,
      description: "No description available",
      metadata: selected.object_id.data,
      object_id: profile_id,
    });
    props.addArticle(selected);
    props.loadSummary();
    /* For Posting Service Will be added after completing backend */
    /* await nodeAxios("POST", "service/invoice", {

      invoice_id: props.invoice_id,
      service_id: selected.service_id.id,
    });*/
  };

  const onSearch = (event) => {
    event.preventDefault();
    const inputVal = event.target.value.toLowerCase();

    if (inputVal.length === "") {
      setArticlesSearchItems(articlesValue);
      setServicesSearchItems(servicesValue);
    } else if (type === "articles") {
      const newSearchItems = articlesValue.filter((el) =>
        el.object_id.data.name.toLowerCase().startsWith(inputVal)
      );
      setArticlesSearchItems(newSearchItems);
    } else if (type === "services") {
      const newSearchItems = servicesValue.filter((el) =>
        el.service_id.name.toLowerCase().startsWith(inputVal)
      );
      setServicesSearchItems(newSearchItems);
    }
  };
  const handleSelectChange = (event) => {
    event.preventDefault();
    const selectVal = event.target.value.toLowerCase();
    console.log(selectVal);
    /* It will be implemented after all articles have category */
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <Modal
          className="modal-search "
          buttonText={props?.setItem ? "" : "Add"}
          {...props}
        >
          <div className="client-modal-body">
            <div className="container-fluid px-0">
              <div className="row gy-5 mt-4">
                <div className="col-lg-12">
                  <div className="row d-flex mb-5">
                    {/* <h3 className="section-title mb-4">Appointment</h3> */}

                    <div className="col-sm-3 mb-3">
                      {/* <p className="mt-2">Node Client</p> */}
                      <FancyInput
                        select
                        options={[
                          {
                            text: "Categories",
                            value: "",
                            selected: true,
                          },
                          {
                            text: "AIR CONDITIONING / HEATING",
                            value: "heating",
                          },
                          {
                            text: "BREAK SYSTEM",
                            value: "break",
                          },
                          {
                            text: "CLUTCH",
                            value: "clutch",
                          },
                          {
                            text: "COOLING SYSTEM",
                            value: "cooling",
                          },
                          {
                            text: "ELECTRICAL",
                            value: "electrical",
                          },
                          {
                            text: "EMISSIONS & FUEL",
                            value: "emissions",
                          },
                          {
                            text: "ENGINE",
                            value: "engine",
                          },
                          {
                            text: "EXHAUST SYSTEM",
                            value: "exhaust",
                          },
                          {
                            text: "MAINTENANCE",
                            value: "maintenance",
                          },
                        ]}
                        onChange={handleSelectChange}
                        id="assignedTo"
                        name="nodeclient"
                        placeholder="Select in the menu"
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                      />
                    </div>
                    <div className="col-sm-3 mb-3">
                      {/* <p className="mt-2">Node Client</p> */}
                      <FancyInput
                        select
                        options={[
                          {
                            text: "Profile Variant",
                            disabled: true,
                            selected: true,
                          },
                        ]}
                        id="assignedTo"
                        name="nodeclient"
                        placeholder="Select in the menu"
                        rootClassName="appointment-select"
                        inputClassName="custom-select"
                      />
                    </div>
                    <div className="col-sm-3 mb-3">
                      <FancyInput
                        sMargin
                        id="Search modal"
                        name="Search modal"
                        placeholder="Search Modal..."
                        onChange={onSearch}
                      />
                    </div>
                    <div className="col-sm-3 d-flex justify-content-evenly">
                      <button
                        className={
                          type === "articles"
                            ? "btn btn-gradient"
                            : "custom-modal-btn emboss-inner"
                        }
                        type="button"
                        onClick={handleArticleClick}
                      >
                        Articles
                      </button>
                      <button
                        className={
                          type === "services"
                            ? "btn btn-gradient"
                            : "custom-modal-btn emboss-inner"
                        }
                        type="button"
                        onClick={handleServiceClick}
                      >
                        Services
                      </button>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between mt-5 gy-5">
                    {type === "articles" &&
                      articlesSearchItems.map((el, i) => (
                        <div
                          className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5  ${
                            selected.id === el.id && "activeItem"
                          }`}
                          onClick={() => handelItemSelect(el)}
                        >
                          <img
                            className="itemImage"
                            src={
                              el.object_id.data.image?.url ||
                              "./assets/vectors/feed-6.svg"
                            }
                            alt=""
                          />
                          <h1 className="item-name mb-2">
                            {" "}
                            {el.object_id.category}
                          </h1>
                          <h2 className="item-subheading mb-2">
                            {el.object_id.data.name}
                          </h2>
                          <p className="item-serial-number mb-2">
                            #98764324234734-212
                          </p>
                          <p>{el.object_id.data.price || 0}$</p>
                        </div>
                      ))}
                    {type === "services" &&
                      servicesSearchItems.map((el, i) => (
                        <div
                          className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5  ${
                            selected.id === el.id && "activeItem"
                          }`}
                          onClick={() => handelItemSelect(el)}
                        >
                          <img
                            className="itemImage"
                            src={
                              el.service_id.image?.url ||
                              "./assets/vectors/feed-6.svg"
                            }
                            alt=""
                          />
                          <h1 className="item-name mb-2">Brake</h1>
                          <h2 className="item-subheading mb-2">
                            {el.service_id.name}
                          </h2>
                          <p className="item-serial-number mb-2">
                            #98764324234734-212
                          </p>
                          <p>{el.service_id.price || 0}$</p>
                        </div>
                      ))}
                    {/* <div
                      id="1"
                      className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5 ${
                        itemId == 1 ? "activeItem" : ""
                      }`}
                      onClick={handelItemSelect}
                    >
                      <img
                        className="itemImage"
                        src="./assets/vectors/feed-6.svg"
                        alt=""
                      />
                      <h1 className="item-name mb-2">Brake</h1>
                      <h2 className="item-subheading mb-2">Brake Disc Kit</h2>
                      <p className="item-serial-number mb-2">
                        #98764324234734-212
                      </p>
                      <p>112,90$</p>
                    </div>
                    <div
                      id="2"
                      className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5 ${
                        itemId == 2 ? "activeItem" : ""
                      }`}
                      onClick={handelItemSelect}
                    >
                      <img
                        className="itemImage"
                        src="./assets/vectors/feed-6.svg"
                        alt=""
                      />
                      <h1 className="item-name mb-2">Brake</h1>
                      <h2 className="item-subheading mb-2">Brake Disc Kit</h2>
                      <p className="item-serial-number mb-2">
                        #98764324234734-212
                      </p>
                      <p>112,90$</p>
                    </div>
                    <div
                      id="3"
                      className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5 ${
                        itemId == 3 ? "activeItem" : ""
                      }`}
                      onClick={handelItemSelect}
                    >
                      <img
                        className="itemImage"
                        src="./assets/vectors/feed-6.svg"
                        alt=""
                      />
                      <h1 className="item-name mb-2">Brake</h1>
                      <h2 className="item-subheading mb-2">Brake Disc Kit</h2>
                      <p className="item-serial-number mb-2">
                        #98764324234734-212
                      </p>
                      <p>112,90$</p>
                    </div>
                    <div
                      id="4"
                      className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5 ${
                        itemId == 4 ? "activeItem" : ""
                      }`}
                      onClick={handelItemSelect}
                    >
                      <img
                        className="itemImage"
                        src="./assets/vectors/feed-6.svg"
                        alt=""
                      />
                      <h1 className="item-name mb-2">Brake</h1>
                      <h2 className="item-subheading mb-2">Brake Disc Kit</h2>
                      <p className="item-serial-number mb-2">
                        #98764324234734-212
                      </p>
                      <p>112,90$</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default ModalServices;

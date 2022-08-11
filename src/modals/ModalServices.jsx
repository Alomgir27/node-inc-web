import React, { useEffect, useState } from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";

import ModelServices from "./ModalServices";
import { BASEURL, sendNetworkRequest } from "../http/http-request";
import nodeAxios from "../utils/nodeAxios";
import ReactPaginate from "react-paginate";

const ModalServices = (props) => {
  const [pageCount, setpageCount] = useState(0);

  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);

  const [articlesSearchItems, setArticlesSearchItems] = useState([]);
  const [servicesSearchItems, setServicesSearchItems] = useState([]);

  const [selected, setSelected] = useState({});
  const [type, setType] = useState(props.type);

  const handelItemSelect = async (articleOrService) => {
    setSelected(articleOrService);
  };

  const handleArticlesClick = async () => {
    setType("articles");
    const { articles, totalRecords } = await nodeAxios(
      "GET",
      `profile/entity/artiles/0`
    );
    articles.forEach(
      (article) => (article.object_id.data = JSON.parse(article.object_id.data))
    );
    setpageCount(Math.ceil(totalRecords / 10));
    setArticles(articles);
    setArticlesSearchItems(articles);
  };

  const handleServicesClick = async () => {
    setType("services");
    const { services, totalRecords } = await nodeAxios("GET", "service/all/0");
    setpageCount(Math.ceil(totalRecords / 10));
    setServices(services);
    setServicesSearchItems(services);
  };
  useEffect(() => {
    (async () => {
      if (props.type === "articles") {
        handleArticlesClick();
      } else if (props.type === "services") {
        handleServicesClick();
      }
    })();
  }, [props.type]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profile_id = localStorage.getItem("profile_id");
    if (type === "articles") {
      await nodeAxios("POST", "invoice/items", {
        invoice_id: props.invoice_id,
        name: selected.object_id.data.name,
        base_price: selected.object_id.data.price,
        description: "No description available",
        metadata: {
          ...selected.object_id.data,
          service_id: props.selectedServiceId,
          is_service: false,
          is_article: true,
        },
        object_id: profile_id,
      });
      await nodeAxios(
        "POST",
        `service/node/service/${props.selectedServiceId}`,
        { article_ids: [selected.object_id.id] }
      );
    } else if (type === "services") {
      await nodeAxios("POST", "service/invoice", {
        invoice_id: props.invoice_id,
        service_id: selected.service_id.id,
      });
      const responseService = await nodeAxios("POST", "invoice/items", {
        invoice_id: props.invoice_id,
        name: selected.service_id.name,
        base_price: selected.service_id.price,
        description: "No description available",
        metadata: {
          ...selected.service_id,
          is_service: true,
          is_article: false,
        },
      });
      const serviceRelatedArticles = await nodeAxios(
        "GET",
        `service/articles/${selected.service_id.id}/0`
      );
      const { items } = await nodeAxios(
        "GET",
        `invoice/items/${props.invoice_id}`
      );
      const articles = items.filter((item) => item.metadata.is_article);
      responseService.metadata.articles = articles.filter((article) => {
        return article.metadata.service_id === responseService.metadata.id;
      });

      serviceRelatedArticles.articles.forEach(async (serviceRelatedArticle) => {
        const parseData = JSON.parse(serviceRelatedArticle.profile_id.data);
        if (
          responseService.metadata.articles.find(
            (article) => article.metadata.sku === parseData.sku
          )
        ) {
          return;
        }
        await nodeAxios("POST", "invoice/items", {
          invoice_id: props.invoice_id,
          name: parseData.name,
          base_price: parseData.price,
          description: "No description available",
          metadata: {
            ...parseData,
            service_id: selected.service_id.id,
            is_service: false,
            is_article: true,
          },
          object_id: profile_id,
        });
      });
    }
    props.loadSummary();
  };

  const onSearch = (event) => {
    const inputVal = event.target.value.toLowerCase();
    if (inputVal.length === "") {
      setArticlesSearchItems(articles);
      setServicesSearchItems(services);
    } else if (type === "articles") {
      const newSearchItems = articles.filter((el) =>
        el.object_id.data.name?.toLowerCase().startsWith(inputVal)
      );
      setArticlesSearchItems(newSearchItems);
    } else if (type === "services") {
      const newSearchItems = services.filter((el) =>
        el.service_id.name.toLowerCase().startsWith(inputVal)
      );
      setServicesSearchItems(newSearchItems);
    }
  };
  const handleSelectChange = (event) => {
    const selectVal = event.target.value.toLowerCase();
    /* It will be implemented after all articles have category */
  };
  const activeStyle = {
    background: "linear-gradient(to right, #1e55a9, #2bbfc7)",
    color: "#fff",
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    if (type === "articles") {
      const { articles } = await nodeAxios(
        "GET",
        `profile/entity/artiles/${currentPage - 1}`
      );
      articles.forEach(
        (article) =>
          (article.object_id.data = JSON.parse(article.object_id.data))
      );
      setArticles(articles);
      setArticlesSearchItems(articles);
    } else if (type === "services") {
      const { services } = await nodeAxios(
        "GET",
        `service/all/${currentPage - 1}`
      );
      setServices(services);
      setServicesSearchItems(services);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Modal className="modal-search " buttonText="Add" {...props}>
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
                        className={`custom-modal-btn emboss-inner `}
                        type="button"
                        onClick={handleServicesClick}
                        style={type === "services" ? activeStyle : {}}
                      >
                        Services
                      </button>
                      <button
                        className="custom-modal-btn emboss-inner"
                        type="button"
                        onClick={handleArticlesClick}
                        style={type === "articles" ? activeStyle : {}}
                      >
                        Articles
                      </button>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between mt-5 gy-3">
                    {type === "articles" &&
                      articlesSearchItems.map((article) => (
                        <div
                          className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5  ${
                            selected.id === article.id && "activeItem"
                          }`}
                          onClick={() => handelItemSelect(article)}
                        >
                          <img
                            className="itemImage"
                            src={
                              article.object_id.data.image?.url ||
                              "./assets/vectors/feed-6.svg"
                            }
                            alt="feed"
                          />
                          <h1 className="item-name mb-2">
                            {article.object_id.category}
                          </h1>
                          <h2 className="item-subheading mb-2">
                            {article.object_id.data.name}
                          </h2>
                          <p className="item-serial-number mb-2">
                            #{article.object_id.data.sku}
                          </p>
                          <p>{article.object_id.data.price}$</p>
                        </div>
                      ))}
                    {type === "services" &&
                      servicesSearchItems.map((service) => (
                        <div
                          className={`col-sm-3 item-card d-flex flex-column align-items-center pt-5  ${
                            selected.id === service.id && "activeItem"
                          }`}
                          onClick={() => handelItemSelect(service)}
                        >
                          <img
                            className="itemImage"
                            src={
                              service.service_id.image?.url ||
                              "./assets/vectors/feed-6.svg"
                            }
                            alt=""
                          />
                          <h1 className="item-name mb-2">
                            {service.service_id.category}
                          </h1>
                          <h2 className="item-subheading mb-2">
                            {service.service_id.name}
                          </h2>

                          <p className="item-serial-number mb-2"></p>
                          <p>{service.service_id.price}h</p>
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
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default ModalServices;

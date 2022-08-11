import React, { useCallback, useEffect, useState, useContext } from "react";

import FancyInput from "../../components/FancyInput";
import AddBtn from "../../components/AddBtn";
import Input from "../../components/Input";
import TabContents from "../../components/TabContents";
import TabContentItem from "../../components/TabContentItem";
import WorkshopWorkorderLayout from "../../layouts/WorkshopWorkorderLayout";
import ModalOrder from "../../modals/Modalrequests";
import ModalForm from "../../modals/ModalForm";
import ModalArticle from "../../modals/ModalServices";
import Accordion from "../../components/Accordion";
import Switch from "../../components/Switch";
import { Link, useNavigate } from "react-router-dom";
import nodeAxios from "../../utils/nodeAxios";
import ModalMaintanance from "../../modals/ModalMaintanance";
import { BASEURL, sendNetworkRequest } from "../../http/http-request";
import { AuthContext } from "../../store/auth-context";

import TextSubField from "./subFields/TextSubField";
import NumberSubField from "./subFields/NumberSubField";
import FileSubField from "./subFields/FileSubField";
import DateSubField from "./subFields/DateSubField";
import ChoiceSubField from "./subFields/ChoiceSubField";
import axios from "axios";

const WorkshopArticles = () => {
  const [curPage, setCurPage] = useState(0);
  const [ProfileId, setProfileId] = useState("");
  const { tokens } = useContext(AuthContext);
  const [maintananceData, setMaintananceData] = useState([]);

  /* Getting Token Id from local storage */
  const invoice_id = window.localStorage.getItem("invoiceId");
  /* All state that are used in this file */
  const [type, setType] = useState(null);
  const [noteData, setNoteData] = useState("");
  const [requests, setRequests] = useState([]);
  const [orderModalOpenState, setOrderModalOpenState] = useState(false);
  const [FormModalOpenState, setFormModalOpenState] = useState(false);
  const [articleModalOpenState, setArticleModalOpenState] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [odometer, setOdometer] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState([]);
  const [flag, setFlag] = useState(true);
  const [maintananceModalOpenState, setMaintananceModalOpenState] =
    useState(false);

  const [services, setServices] = useState([]);
  const [active, setActive] = useState("maintenance");
  const [selectedService, setSelectedService] = useState(null);
  const [formState, setFormState] = useState({
    name1: "Front Pad",
    sku1: "873244424343-32",
    quantity1: 2,
    availability1: 76,
    unitPrice1: "20.00$",
    categorie1: "BRAKE",
    name2: "Front Brake Change with OP",
    sku2: "L-FBC-OP",
    quantity2: 1,
    availability2: "NA",
    unitPrice2: "47.00$",
    categorie2: "LABOR",
    details: "Part of brake article description here.",
    discount: "0%",
  });
  /* Invoice Request */
  const fetchRequest = useCallback(async () => {
    const response = await nodeAxios("GET", `request/invoice/${invoice_id}/0`);
    setRequests(response.requests);
  }, [invoice_id]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  useEffect(() => {
    setProfileId(localStorage.getItem("profile_id"));
    GetMaintananceRecordAPI();
  }, []);

  async function GetMaintananceRecordAPI() {
    const api = await fetch(
      `${BASEURL}/forecast/all/profile/${localStorage.getItem(
        "profile_id"
      )}/${curPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      }
    );
    const resp = await api.json();
    setMaintananceData(resp);
  }

  const inputChangeHandler = () => {};

  /* Modal open close  */
  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };

  /* Odometer Timer */
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  /* For handling file upload */
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setInvoiceFile(URL.createObjectURL(file));

    /*=== Invoice file api connection code will be added soon === */
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("invoice_id", invoice_id);
    formData.append("metadata", JSON.stringify({}));
    formData.append("action_metadata", JSON.stringify({}));

    await nodeAxios("POST", "invoice/file", formData);
  };

  /* Get the uploaded file & set into React state */
  useEffect(() => {
    (async () => {
      const file = await nodeAxios("GET", `invoice/file/${invoice_id}`);
      setInvoiceFile(file?.url.split("?")[0]);
    })();
  }, [invoice_id]);
  const calculateArticlePrice = (services) => {
    const articles = [];
    services.forEach((service) => {
      service.metadata.articles.forEach((article) => {
        articles.push(article);
      });
    });
    const serviceTotal = services
      .map((service) => service.metadata.price * 95.5)
      .reduce((a, b) => a + b, 0);
    const articleTotal = articles
      .map(
        (article) => article.metadata.price * (article.metadata.quantity || 1)
      )
      .reduce((a, b) => a + b, 0);

    return serviceTotal + articleTotal;
  };
  /* From Change Handler */
  const formChangeHandler = async (
    event,
    outerIndex,
    innerIndex,
    isUnderMetadata
  ) => {
    const clonedServices = [...services];
    const { name, value } = event.target;
    if (isUnderMetadata) {
      clonedServices[outerIndex].metadata.articles[innerIndex].metadata[name] =
        value;
    } else {
      clonedServices[outerIndex].metadata.articles[innerIndex][name] = value;
    }

    setServices(clonedServices);
    setSubTotal(calculateArticlePrice(clonedServices));
  };
  /* When user focus out from the input element then it will save to database */
  const formBlurHandler = async (outerIndex, innerIndex, item_id) => {
    const updatedValue = {
      description:
        services[outerIndex].metadata.articles[innerIndex].description,
      metadata: {
        price:
          services[outerIndex].metadata.articles[innerIndex].metadata.price,
        quantity:
          services[outerIndex].metadata.articles[innerIndex].metadata.quantity,
        discount:
          services[outerIndex].metadata.articles[innerIndex].metadata.discount,
      },
    };
    await nodeAxios(
      "PATCH",
      `invoice/item/${invoice_id}/${item_id}`,
      updatedValue
    );
  };

  /* ===Articles Summary === */
  const loadSummary = useCallback(async () => {
    const { items } = await nodeAxios("GET", `invoice/items/${invoice_id}`);

    const services = items.filter((item) => item.metadata.is_service);
    const articles = items.filter((item) => item.metadata.is_article);

    services.forEach((service) => {
      service.metadata.articles = articles.filter((article) => {
        return article.metadata.service_id === service.metadata.id;
      });
    });

    const completedServicesArr = services.filter(
      (service) => service.metadata.completed
    );
    const percentage =
      (completedServicesArr.length / (services.length || 1)) * 100;
    setPercentage(percentage);
    setServices(services);
    setSubTotal(calculateArticlePrice(services));
  }, [invoice_id]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  /* Update Invoice */
  const handleInvoiceUpdate = async () => {
    if (services.length !== 0 && Number(percentage) !== 100) {
      alert("Please complete all services");
      return;
    }
    await nodeAxios("PATCH", `invoice/${invoice_id}`, {
      metadata: { status: 2 },
    });
    navigate("/workshop-realtime");
  };

  /* Calculate percentage of work completed */
  const handleCheckboxChange = async (event, service_id, index) => {
    const clonedServices = [...services];
    const { checked } = event.target;
    if (checked) {
      clonedServices[index].metadata.completed = true;
    } else {
      clonedServices[index].metadata.completed = false;
    }
    const completedServicesArr = clonedServices.filter(
      (service) => service.metadata.completed
    );
    const percentage =
      (completedServicesArr.length / (services.length || 1)) * 100;
    setPercentage(percentage);
    setServices(clonedServices);

    await nodeAxios("PATCH", `invoice/item/${invoice_id}/${service_id}`, {
      metadata: { completed: checked },
    });
    await nodeAxios("PATCH", `invoice/${invoice_id}`, {
      metadata: { progress: percentage },
    });
  };

  const handelActive = (e) => {
    setActive(e.target.id);
  };

  const handleInvoiceDelete = async (item_id) => {
    await nodeAxios("DELETE", `invoice/items/${item_id}`);
    loadSummary();
  };
  const handleProfileTimerUpdate = async () => {
    setRunning(false);
    await nodeAxios("PATCH", `invoice/${invoice_id}`, {
      metadata: { timer: time },
    });
  };
  const handleOdometerBlur = async (event) => {
    const profile_id = localStorage.getItem("profile_id");
    await nodeAxios("PATCH", `profile/${profile_id}`, {
      data: { odometer: event.target.value },
    });
  };

  const handleServiceInputChange = (event, index) => {
    const clonedServices = [...services];
    clonedServices[index].metadata.price = event.target.value;
    setServices(clonedServices);
  };
  const handleServiceInputBlur = async (outerIndex, service_id) => {
    await nodeAxios("PATCH", `invoice/item/${invoice_id}/${service_id}`, {
      metadata: { price: services[outerIndex].metadata.price },
    });
  };
  /* Notes Functionality is not implemented yet */
  const handleNotesChange = async (event) => {
    const { value } = event.target;
    await nodeAxios("POST", "core/notes", { data: value });
  };
  const getRequestColor = (status) => {
    if (status === 0) {
      return {
        color: "#3e4244",
        text: "Requested",
      };
    } else if (status === 1) {
      return {
        color: "#2bbfc7",
        text: "Approved",
      };
    } else if (status === 2) {
      return {
        color: "#1e55a9",
        text: "In progress",
      };
    } else if (status === 3) {
      return {
        color: "crimson",
        text: "Denied",
      };
    } else if (status === 4) {
      return {
        color: "#eca0a0",
        text: "Done",
      };
    } else if (status === 5) {
      return {
        color: "#3e4244",
        text: "On Hold",
      };
    } else if (status === 6) {
      return {
        color: "#3e4244",
        text: "Archived",
      };
    }
  };
  return (
    <WorkshopWorkorderLayout
      title="Details"
      invoice_id={invoice_id}
      summary={{ services, subTotal }}
      percentage={percentage}
      setOdometer={setOdometer}
      setTime={setTime}
      loadSummary={loadSummary}
    >
      <ModalOrder
        isOpen={orderModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setOrderModalOpenState)}
      />
      <ModalForm
        isOpen={FormModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setFormModalOpenState)}
      />
      <ModalArticle
        invoice_id={invoice_id}
        isOpen={articleModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setArticleModalOpenState)}
        loadSummary={loadSummary}
        type={type}
        selectedServiceId={selectedServiceId}
      />

      <ModalMaintanance
        isOpen={maintananceModalOpenState}
        modalCloseHandler={() =>
          modalCloseHandler(setMaintananceModalOpenState)
        }
        selectedService={selectedService}
      />

      <TabContents tabGroupName="workshop-articles-tabs">
        <TabContentItem target="forms">
          <div className="container-fluid px-0 mt-4">
            <div className="row gy-5">
              <div className="col-md-6">
                <div className="d-flex flex-wrap justify-content-between title-container px-3">
                  <div className="title me-4 pb-3">
                    <h3 className="section-title text-dark-1 d-flex align-items-center">
                      <img
                        className="me-3"
                        src="./assets/vectors/forms.svg"
                        alt="forms"
                      />
                      Forms
                    </h3>
                  </div>
                </div>
                <div className="files forms emboss-white br-16">
                  <div className="file-item">
                    <div className="bg">
                      <img src="./assets/vectors/!.svg" alt="exclamation" />
                    </div>
                    <div className="text">Inspection</div>
                  </div>
                  <div className="file-item">
                    <div className="bg">
                      <img src="./assets/vectors/tick.svg" alt="exclamation" />
                    </div>
                    <div className="text">Brake Check</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-wrap justify-content-between title-container px-3">
                  <div className="title me-4 pb-3">
                    <h3 className="section-title text-dark-1 d-flex align-items-center">
                      <img
                        className="me-3"
                        src="./assets/vectors/live.svg"
                        alt="files"
                      />
                      Feeds
                    </h3>
                  </div>
                  <input type="file" onChange={handleFileUpload} />
                  <AddBtn pale />
                </div>

                <div className="files img emboss-white br-16">
                  {invoiceFile ? (
                    <div className="file-item">
                      <img src={invoiceFile} alt="exclamation" />
                      <div className="text">Feed Image</div>
                    </div>
                  ) : (
                    <p>No data found! 🙄</p>
                  )}
                  {/* <div className="file-item">
                    <img
                      src="./assets/vectors/file-img-placeholder.svg"
                      alt="exclamation"
                    />
                    <div className="text">Rear Scratch</div>
                  </div>
                  <div className="file-item">
                    <img
                      src="./assets/vectors/file-img-placeholder.svg"
                      alt="exclamation"
                    />
                    <div className="text">Brake Check</div>
                  </div>
                  <div className="file-item">
                    <img
                      src="./assets/vectors/file-img-placeholder.svg"
                      alt="exclamation"
                    />
                    <div className="text">Door lock</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-5">
            <div className="title d-flex justify-content-between w-100">
              <h3 className="section-title text-dark-1 d-flex align-items-center">
                <img
                  className="me-3"
                  src="./assets/vectors/requests-dark.svg"
                  alt="requests"
                />
                Requests
              </h3>
            </div>
          </div>

          <div className="mt-3 br-16 emboss-white px-3 py-4">
            <div className="table-container vertical-scrollbar">
              <table style={{ minWidth: 500 }}>
                {requests?.map((request) => (
                  <tr key={request?.request_id?.id}>
                    <Link
                      to={`/workshop-request-details/${request?.request_id?.id}`}
                      className="w-100 d-flex justify-content-between"
                    >
                      <td>{request?.name}</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className="round-box me-2"
                            style={{
                              backgroundColor: getRequestColor(
                                request?.request_id.status
                              ).color,
                            }}
                          ></div>
                          <span
                            className="text-bluem"
                            style={{
                              color: getRequestColor(request?.request_id.status)
                                .color,
                            }}
                          >
                            {getRequestColor(request?.request_id.status).text}
                          </span>
                        </div>
                      </td>
                      <td>{request?.request_id?.invoice_id?.metadata?.assign}</td>
                      <td>
                        {new Intl.DateTimeFormat("en-UK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }).format(
                          new Date(
                            request?.invoice_id?.metadata?.sdate || Date.now()
                          )
                        )}
                      </td>
                    </Link>
                  </tr>
                ))}
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-between title-container mt-5">
            <div
              id="maintenance"
              className={`py-3 px-2 hover title d-flex justify-content-between w-100`}
              onClick={handelActive}
            >
              <h3 className="section-title text-dark-1 d-flex align-items-center">
                <img
                  className="me-3"
                  src="./assets/vectors/darkeye.svg"
                  alt="requests"
                  width="20px"
                />
                Maintenance
              </h3>
            </div>
          </div>

          {active == "maintenance" ? (
            <div className="mt-3 br-16 emboss-white px-3 py-4">
              <div className="table-container vertical-scrollbar">
                <table style={{ minWidth: 500 }}>
                  <tr>
                    {maintananceData.map((rec) => {
                      let recdate = new Date(rec.reco_date).getDate();
                      let recmon = new Date(rec.reco_date).getMonth();
                      let recyear = new Date(rec.reco_date).getFullYear();
                      let MainTags = rec.tags;
                      let FormatTags = JSON.parse(MainTags[0]).label;
                      return (
                        <Link
                          to=""
                          className="w-100 d-flex justify-content-between"
                        >
                          <td>
                            <div className="d-flex">{rec.name}</div>
                          </td>

                          <td>
                            <div className="d-flex">{FormatTags}, </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              {`${recyear}/${recmon}/${recdate}`}
                            </div>
                          </td>
                        </Link>
                      );
                    })}
                  </tr>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-between title-container mt-5">
            <div className="title">
              <h3 className="section-title text-dark-1 d-flex align-items-center">
                <img
                  className="me-3"
                  src="./assets/vectors/notes.svg"
                  alt="notes"
                />
                Notes
              </h3>
            </div>
          </div>

          <div className="mt-3 br-16 emboss-white px-3 py-4">
            <div className="fs-10 text-manrope text-light-7">Internal Note</div>
            <Input
              rootClassName="mt-2"
              value={noteData}
              onChange={(e) => setNoteData(e.target.value)}
              placeholder="Write a note! (Optional) 😎"
              onBlur={handleNotesChange}
              textArea
              rows={3}
            />
            {/* <div className="mt-4 fs-10 text-manrope text-light-7">
              Public Note
            </div>
            <Input
              rootClassName="mt-2"
              value="Is there any evidence of benefit if people without diabetes monitor their blood sugar levels with CGMs? There’s little published research to help answer this question."
              textArea
              rows={4}
            /> */}

            {/* <div className="d-flex justify-content-end mt-5">
              <button className="btn btn-blue btn-rounded">
                Convert to Invoice
                <img
                  className="ms-3"
                  src="./assets/vectors/r-arrow-btn.svg"
                  alt="right-arrow"
                />
              </button>
            </div> */}
          </div>
        </TabContentItem>

        <TabContentItem target="articles">
          <div className="d-flex justify-content-end mt-4 mb-3">
            <AddBtn
              onClick={() => {
                setType("services");
                modalOpenHandler(setArticleModalOpenState);
              }}
              pale
            />
          </div>
          <div className="collapses-container">
            <div className="collapse ">
              {services.map((service, outerIndex) => {
                return (
                  <div key={outerIndex} className="d-flex align-items-baseline">
                    <input
                      type="checkbox"
                      className="me-3 hover"
                      onChange={(e) =>
                        handleCheckboxChange(e, service.id, outerIndex)
                      }
                      checked={service.metadata.completed}
                    />
                    <div className="col-sm-1">
                      <FancyInput
                        placeholder="h"
                        name="hours"
                        className="custom-select"
                        value={service.metadata.price}
                        onChange={(e) =>
                          handleServiceInputChange(e, outerIndex)
                        }
                        onBlur={() =>
                          handleServiceInputBlur(outerIndex, service.id)
                        }
                      />
                    </div>
                    <Accordion
                      headComp={
                        <div className="head">
                          <div className="text-dark-3 text-lato fw-800 fs-12 d-flex align-items-center">
                            {service.metadata.name}
                          </div>

                          <div className="options w-25">
                            <div className="btn p-0 w-100 d-flex justify-content-between">
                              <img
                                src="./assets/vectors/add.svg"
                                alt="bin"
                                onClick={() => {
                                  setSelectedServiceId(service.metadata.id);
                                  setType("articles");
                                  modalOpenHandler(setArticleModalOpenState);
                                }}
                              />
                              <img
                                src="./assets/vectors/darkeye.svg"
                                alt="bin"
                                height="17px"
                                onClick={() => {
                                  setSelectedService(service);
                                  modalOpenHandler(
                                    setMaintananceModalOpenState
                                  );
                                }}
                              />
                              <img
                                src="./assets/vectors/bin-1.svg"
                                alt="bin"
                                onClick={() => handleInvoiceDelete(service.id)}
                              />
                            </div>
                            <div className="btn p-0">
                              <img
                                className="arrow"
                                src="./assets/vectors/arrow-down-1.svg"
                                alt="arrow-down"
                              />
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div className="body">
                        {service.metadata.articles.length > 0 ? (
                          service.metadata.articles?.map(
                            (article, innerIndex) => (
                              <div className="collapse-section">
                                <div className="container-fluid px-0">
                                  <div className="row">
                                    <div className="col-6">
                                      <FancyInput
                                        embossed={false}
                                        icon="vectors/cart.svg"
                                        prominantBlue
                                        mdPaddingBottom
                                        sMargin
                                        label="&nbsp;"
                                        id="name"
                                        name="name"
                                        placeholder="Start typing..."
                                        value={article.metadata.name}
                                      />
                                    </div>
                                    <div className="col-6">
                                      <FancyInput
                                        embossed={false}
                                        prominant
                                        lightLabel
                                        thinlabel
                                        mdPaddingBottom
                                        sMargin
                                        id="sku"
                                        name="sku"
                                        label="SKU"
                                        placeholder="Start typing..."
                                        value={article.metadata.sku}
                                      />
                                    </div>
                                    <div className="col-6 col-sm-3">
                                      <FancyInput
                                        embossed={false}
                                        prominant
                                        lightLabel
                                        thinlabel
                                        mdPaddingBottom
                                        sMargin
                                        id="quantity"
                                        name="quantity"
                                        label="Quantity"
                                        placeholder="Start typing..."
                                        onChange={(e) =>
                                          formChangeHandler(
                                            e,
                                            outerIndex,
                                            innerIndex,
                                            true
                                          )
                                        }
                                        onBlur={() =>
                                          formBlurHandler(
                                            outerIndex,
                                            innerIndex,
                                            article.id
                                          )
                                        }
                                        value={article.metadata.quantity || 0}
                                      />
                                    </div>
                                    <div className="col-6 col-sm-3">
                                      <FancyInput
                                        embossed={false}
                                        prominant
                                        lightLabel
                                        thinlabel
                                        mdPaddingBottom
                                        sMargin
                                        id="availability"
                                        name="availability"
                                        label="Availability"
                                        placeholder="Start typing..."
                                        disabled
                                        value={
                                          article.metadata.availability || 0
                                        }
                                      />
                                    </div>
                                    <div className="col-6 col-sm-3">
                                      <FancyInput
                                        embossed={false}
                                        prominant
                                        lightLabel
                                        thinlabel
                                        mdPaddingBottom
                                        sMargin
                                        id="price"
                                        name="price"
                                        label="Unit Price"
                                        placeholder="Start typing..."
                                        value={article.metadata.price}
                                        onChange={(e) =>
                                          formChangeHandler(
                                            e,
                                            outerIndex,
                                            innerIndex,
                                            true
                                          )
                                        }
                                        onBlur={() =>
                                          formBlurHandler(
                                            outerIndex,
                                            innerIndex,
                                            article.id
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-6 col-sm-3">
                                      <FancyInput
                                        embossed={false}
                                        prominant
                                        lightLabel
                                        thinlabel
                                        mdPaddingBottom
                                        sMargin
                                        id="category"
                                        name="category"
                                        label="Variant"
                                        placeholder="Start typing..."
                                        value={article.category}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-8">
                                      <FancyInput
                                        embossed={false}
                                        prominant
                                        lightLabel
                                        thinlabel
                                        mdPaddingBottom
                                        sMargin
                                        id="description"
                                        name="description"
                                        label="Details"
                                        placeholder="Start typing..."
                                        onChange={(e) =>
                                          formChangeHandler(
                                            e,
                                            outerIndex,
                                            innerIndex,
                                            false
                                          )
                                        }
                                        onBlur={() =>
                                          formBlurHandler(
                                            outerIndex,
                                            innerIndex,
                                            article.id
                                          )
                                        }
                                        value={article.description}
                                      />
                                    </div>
                                    <div className="col-4">
                                      <FancyInput
                                        embossed={false}
                                        prominant
                                        lightLabel
                                        thinlabel
                                        mdPaddingBottom
                                        sMargin
                                        id="discount"
                                        name="discount"
                                        label="Discount"
                                        placeholder="Start typing..."
                                        onChange={(e) =>
                                          formChangeHandler(
                                            e,
                                            outerIndex,
                                            innerIndex,
                                            true
                                          )
                                        }
                                        onBlur={() =>
                                          formBlurHandler(
                                            outerIndex,
                                            innerIndex,
                                            article.id
                                          )
                                        }
                                        value={article.metadata.discount || 0}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="collapse-section">
                            <h2>No Articles Added! 😐 Maybe add one</h2>
                          </div>
                        )}
                      </div>
                    </Accordion>
                  </div>
                );
              })}
              {/* <Accordion
              
                headComp={
                  <div className="head">
                    <div className="text-dark-3 text-lato fw-800 fs-12">
                      Service: Front Back Change
                    </div>
                    <div className="options w-25">
                      <div className="btn p-0 w-100 d-flex justify-content-between">
                        <img src="./assets/vectors/add.svg" alt="bin" />
                        <img
                          src="./assets/vectors/darkeye.svg"
                          alt="bin"
                          height="17px"
                        />
                        <img src="./assets/vectors/bin-1.svg" alt="bin" />
                      </div>
                      <div className="btn p-0">
                        <img
                          className="arrow"
                          src="./assets/vectors/arrow-down-1.svg"
                          alt="arrow-down"
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="body">
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="name1"
                            name="name1"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.name1}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku1"
                            name="sku1"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity1"
                            name="quantity1"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability1"
                            name="availability1"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice1"
                            name="unitPrice1"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie1"
                            name="categorie1"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie1}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="categorie2"
                            name="categorie2"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku2"
                            name="sku2"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability2"
                            name="availability2"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice2"
                            name="unitPrice2"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie2"
                            name="categorie2"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion> */}
            </div>
            {/* <div className="collapse">
              <Accordion
                headComp={
                  <div className="head">
                    <div className="text-dark-3 text-lato fw-800 fs-12">
                      Unit : Oil - (1L) 5W30 Syn.
                    </div>
                    <div className="options w-25">
                      <div className="btn p-0 w-100 d-flex justify-content-between">
                        <img src="./assets/vectors/add.svg" alt="bin" />
                        <img
                          src="./assets/vectors/darkeye.svg"
                          alt="bin"
                          height="17px"
                        />
                        <img src="./assets/vectors/bin-1.svg" alt="bin" />
                      </div>
                      <div className="btn p-0">
                        <img
                          className="arrow"
                          src="./assets/vectors/arrow-down-1.svg"
                          alt="arrow-down"
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="body">
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="name1"
                            name="name1"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.name1}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku1"
                            name="sku1"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity1"
                            name="quantity1"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability1"
                            name="availability1"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice1"
                            name="unitPrice1"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie1"
                            name="categorie1"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie1}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="categorie2"
                            name="categorie2"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku2"
                            name="sku2"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability2"
                            name="availability2"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice2"
                            name="unitPrice2"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie2"
                            name="categorie2"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
            <div className="collapse">
              <Accordion
                headComp={
                  <div className="head">
                    <div className="text-dark-3 text-lato fw-800 fs-12">
                      Unit : 7C Battery
                    </div>
                    <div className="options w-25">
                      <div className="btn p-0 w-100 d-flex justify-content-between">
                        <img src="./assets/vectors/add.svg" alt="bin" />
                        <img
                          src="./assets/vectors/darkeye.svg"
                          alt="bin"
                          height="17px"
                        />
                        <img src="./assets/vectors/bin-1.svg" alt="bin" />
                      </div>
                      <div className="btn p-0">
                        <img
                          className="arrow"
                          src="./assets/vectors/arrow-down-1.svg"
                          alt="arrow-down"
                        />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="body">
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="name1"
                            name="name1"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.name1}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku1"
                            name="sku1"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity1"
                            name="quantity1"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability1"
                            name="availability1"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice1"
                            name="unitPrice1"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice1}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie1"
                            name="categorie1"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie1}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse-section">
                    <div className="container-fluid px-0">
                      <div className="row">
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            icon="vectors/cart.svg"
                            prominantBlue
                            mdPaddingBottom
                            sMargin
                            label="&nbsp;"
                            id="categorie2"
                            name="categorie2"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                        <div className="col-6">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="sku2"
                            name="sku2"
                            label="SKU"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.sku2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Quantity"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.quantity2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="availability2"
                            name="availability2"
                            label="Availability"
                            placeholder="Start typing..."
                            disabled
                            onChange={formChangeHandler}
                            value={formState.availability2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="unitPrice2"
                            name="unitPrice2"
                            label="Unit Price"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.unitPrice2}
                          />
                        </div>
                        <div className="col-6 col-sm-3">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="categorie2"
                            name="categorie2"
                            label="Variant"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.categorie2}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Details"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.details}
                          />
                        </div>
                        <div className="col-4">
                          <FancyInput
                            embossed={false}
                            prominant
                            lightLabel
                            thinlabel
                            mdPaddingBottom
                            sMargin
                            id="quantity2"
                            name="quantity2"
                            label="Discount"
                            placeholder="Start typing..."
                            onChange={formChangeHandler}
                            value={formState.discount}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div> */}
            {/* <div className="collapse closed">
              <div className="head">
                <div className="text">Service : Front Brake Change</div>
                <div className="options">
                  <div className="btn p-0">
                    <img src="./assets/vectors/bin-1.svg" alt="bin" />
                  </div>
                  <div className="btn p-0">
                    <img
                      src="./assets/vectors/arrow-down-1.svg"
                      alt="arrow-down"
                    />
                  </div>
                </div>
              </div>
            </div><div className="collapse closed">
              <div className="head">
                <div className="text">Service : Front Brake Change</div>
                <div className="options">
                  <div className="btn p-0">
                    <img src="./assets/vectors/bin-1.svg" alt="bin" />
                  </div>
                  <div className="btn p-0">
                    <img
                      src="./assets/vectors/arrow-down-1.svg"
                      alt="arrow-down"
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="d-flex justify-content-end mt-4 mb-3">
            <button
              className="btn text-white btn-gradient"
              onClick={handleInvoiceUpdate}
            >
              Done, Close card
              <img
                className="ms-3"
                src="./assets/vectors/r-arrow-btn.svg"
                alt="right-arrow"
              />
            </button>
          </div>
        </TabContentItem>

        <TabContentItem target="partners">
          <h3 className="section-title">Partners</h3>

          <div className="continer-fluid px-0 mt-4">
            <div className="row g-4">
              {[
                { img: "./assets/img/partner-1.png", maxWidth: 79 },
                { img: "./assets/img/partner-2.png", maxWidth: 153 },
                { img: "./assets/img/partner-3.png", maxWidth: 100 },
                { img: "./assets/img/partner-4.png", maxWidth: 190 },
                { img: "./assets/img/partner-5.png", maxWidth: 120 },
              ].map((el, idx) => {
                const { img, maxWidth } = el;

                return (
                  <div
                    key={"partner" + idx}
                    className="col-md-4 col-sm-6 col-12"
                  >
                    <div className="br-16 h-100 d-flex justify-content-center align-items-center p-5 py-4 emboss-white">
                      <img
                        className="w-100"
                        src={img}
                        alt="partner"
                        style={{ maxWidth }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabContentItem>

        <TabContentItem target="brakeService">
          <div className="odometer d-flex justify-content-between mb-5">
            <div className="meter d-flex justify-content-between align-items-center">
              <p>Odometer</p>
              <div className="odo-input d-flex justify-content-between">
                <input
                  type="text"
                  placeholder="78 098"
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                  onBlur={handleOdometerBlur}
                />
                <span>KM</span>
              </div>
            </div>
            <div className="meter d-flex justify-content-around align-items-center">
              <img
                src="./assets/vectors/play.svg"
                onClick={() => setRunning(true)}
                className="odo-btn"
                alt="vector"
              />

              <img
                src="./assets/vectors/pause .png"
                onClick={handleProfileTimerUpdate}
                width="18px"
                height="18px"
                className="odo-btn"
                alt="vector"
              />
              <img
                src="./assets/vectors/reload.png"
                onClick={() => setTime(0)}
                width="20px"
                height="20px"
                className="odo-btn"
                alt="vector"
              />
              <div className="odo-input d-flex justify-content-between">
                <input type="text" />
                <span>
                  <div className="numbers">
                    <span>
                      {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span>
                      {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
                    </span>
                    <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
          {/* {FormItem?} */}
          <ServicesSection services={services} />

          {/* <h3 className="section-title">Brake Services</h3>
          <div className="mt-3 br-16 emboss-white px-3 py-4">
            <div className="fs-10 text-manrope text-light-7">Client Note</div>
            <Input
              rootClassName="mt-2"
              value="The best study I could find found nothing particularly Another small study looked at sedentary individuals without diabetes who were overweight or obese."
              textArea
              rows={3}
            />
            <div className="mt-4 mb-3 fs-10 text-manrope text-light-7">
              Picture of Brake
            </div>
            <div className="file-uploader">
              <label htmlFor="file-upload"></label>
              <input type="file" name="" id="file-upload" />

              <div className="text-center text">
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src="./assets/vectors/clip.svg"
                    className="me-3"
                    alt="clip"
                  />
                  <div className="text-inter fw-600">Add your file here</div>
                </div>
                <div className="text-light-6 text-inter mt-1">
                  Max size 10MB
                </div>
              </div>
            </div>
          </div>
          <h3 className="section-title mt-5 mb-2">Inspection</h3>
          <div className="mt-3 br-16 emboss-white px-3 py-4">
            <div className="fs-10 text-manrope text-light-7">Next Due Date</div>
            <Input
              // withToggler
              // label="Next Due date"
              // type="date"
              id="date"
              name="date"
              onChange={inputChangeHandler}
              placeholder="22/02/2021"
              value={formState.date}
              icon="vectors/calender-2.svg"
            />

            <div className="fs-10 text-manrope text-light-7 mb-2">
              Exterior is good?
            </div>
            <div className="d-flex px-2">
              <Switch className="ml-3" />
              <div className="fs-10 text-manrope  mb-2 mx-3">yes</div>
            </div>
          </div> */}
        </TabContentItem>
      </TabContents>
    </WorkshopWorkorderLayout>
  );
};

// MEEEEE
const ServicesSection = ({ services }) => {
  // Get all the form templates of a service

  const [hasSubmission, setHasSubmission] = useState();

  const [fields, setFields] = useState([]);
  const [form, setForm] = useState([]);

  // const [curInvoice, setCurInvoice] = useState();
  // const [formIDsOfAllServices, setFormIDsOfAllServices] = useState([]);
  // const [fieldsOfAllForms, setFieldsOfAllForms] = useState([]);

  useEffect(() => {
    // if (services?.length > 0) {
    CheckInvoice();
    // }
  }, [services]);

  //CHECING INVOICE
  const invoice_id = window.localStorage.getItem("invoiceId");
  const [target_entity_id, setTarget_entity_id] = useState();

  const CheckInvoice = () => {
    sendNetworkRequest(`${BASEURL}/invoice/${invoice_id}`, "GET")
      .then((res) => {
        setTarget_entity_id(res?.data?.target_entity_id?.id);

        if (res.data?.metadata?.formSubmissionID) {
          setHasSubmission(res.data?.metadata?.formSubmissionID);
          // alert("WE HAVE A SUBMISIION", res.data?.metadata?.formSubmissionID);
        } else {
          setHasSubmission(false);
          // WE DON'T HAVE A SUBMISSIONS
          // setFieldsOfAllForms([]);
          // setFormIDsOfAllServices([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let gotData = "false";
  const reloadTime = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      if (gotData === "false") {
        gotData = "true";
        handleSaveEmptyData();
      }
    }, reloadTime);

    return () => clearInterval(interval);
  }, [fields]);

  const handleSaveEmptyData = () => {
    if (!hasSubmission) {
      let lvPair = [];

      fields?.map((item) => {
        if (item?.choices) {
          lvPair.push({
            value: "x",
            label: item?.name,
            fieldType: "choice",
            fieldId: item?.id,
          });
        } else {
          lvPair.push({
            value: "x",
            label: item?.name,
            fieldType: item?.type,
            fieldId: item?.id,
          });
        }
      });

      // formTemplateId: formId,
      const data = {
        entityId: target_entity_id,
        invoiceId: invoice_id,
        labelValuePair: lvPair,
      };

      // sendNetworkRequest(`${BASEURL}/FormsSubmissions/forms`, "POST", data)
      sendNetworkRequest(
        `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/FormsSubmissions/forms`,
        "POST",
        data
      )
        .then((res) => {
          sendNetworkRequest(`${BASEURL}/invoice/${invoice_id}`, "PATCH", {
            metadata: {
              formSubmissionID: res?.data?.formSubmissionId,
            },
          })
            .then((res) => {
              console.log(res.data);
              CheckInvoice();
            })
            .catch((err) => {
              alert("Form not successfully submitted");
              console.log(err.response.data);
            });
        })
        .catch((err) => {
          console.log("FORM SUBMITED ERROR ", err.response.data);
        });
    }
  };

  return (
    <>
      {/* <button
        onClick={() => {
          console.log("fields : ", fields);
          console.log("form : ", form);
        }}
      >
        CHECK STHE STATE
      </button> */}

      {hasSubmission ? (
        <SubmissionView id={hasSubmission} />
      ) : (
        <>
          {services?.map((service) => (
            <div style={{ marginBottom: 40 }}>
              {/* <h3 className="section-title">{service?.name}</h3> */}
              <FormsSection
                serviceId={service?.metadata?.id}
                setFields={setFields}
                fields={fields}
                form={form}
                setForm={setForm}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

const SubmissionView = ({ id }) => {
  const [submissionData, setSubmissionData] = useState();
  const [fields, setFields] = useState();
  const [invoice, setInvoice] = useState([]);

  /*   const handleClick = async () => {
    const sendingData = {
      entityId: "26077808-1863-4e5f-9780-dea078427f00",
      invoiceId: "59c2fb7d-243f-4216-80b1-0c34143166c8",
      labelValuePair: [
        {
          fieldType: "text",
          label: "What's your name?",
          value: "Rupok Koiry",
          fieldId: "b6190c56-a86b-4d9a-b48a-6a8cfd5bef41",
        },
        {
          fieldType: "text",
          label: "What's your age?",
          value: "16",
          fieldId: "b6190c56-a86b-4d9a-b48a-6a8cfd5bef41",
        },
      ],
    };
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    const response = await axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        refresh_token: tokens.refreshToken,
        idToken: tokens.idToken,
      },
      url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/FormsSubmissions/forms`,
      data: sendingData,
    });

    console.log(response, "-----------------):");
  }; */
  useEffect(() => {
    // FormsSubmissions/forms/{id}
    sendNetworkRequest(
      `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/FormsSubmissions/forms/${id}`,
      "GET"
    )
      .then((res) => {
        console.log("SubmissionView : ", res.data?.requestFormData);
        setSubmissionData(res.data?.requestFormData);
        setFields(res.data?.requestFormData?.labelValuePair);
      })
      .catch((err) => {
        console.log("SubmissionView ERROR ", err.response.data);
      });
  }, [id]);

  useEffect(() => {
    (async () => {
      const invoice = await nodeAxios(
        "GET",
        `invoice/${localStorage.getItem("invoiceId")}`
      );
      setInvoice(invoice);
    })();
  }, []);
  return (
    <>
      <div
        className="mt-3 br-16 emboss-white px-3 py-4"
        style={{ marginBottom: 40 }}
      >
        {fields?.map((field, index) => {
          const handleChange = async (e) => {
            field["value"] = e.target.value;
            setFields([...fields]);
            const sendingData = {
              entityId: invoice.origin_invoicing_profile.id,
              invoiceId: invoice.id,
              labelValuePair: [...fields],
            };
            const tokens = JSON.parse(localStorage.getItem("tokens"));

            console.log(invoice.metadata.formSubmissionID);
            const response = await axios({
              method: "PUT",
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
                refresh_token: tokens.refreshToken,
                idToken: tokens.idToken,
              },
              url: `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/FormsSubmissions/forms/${invoice.metadata.formSubmissionID}`,
              data: sendingData,
            });
            console.log(response);
          };

          const fieldDatas = {
            key: index,
            curIndex: index,
            field: field,
            fields: fields,
            setFields: setFields,
            handleChange,
          };

          return (
            (field?.fieldType === "text" && <TextSubField {...fieldDatas} />) ||
            (field?.fieldType === "number" && (
              <NumberSubField {...fieldDatas} />
            )) ||
            (field?.fieldType === "file" && <FileSubField {...fieldDatas} />) ||
            (field?.fieldType === "date" && <DateSubField {...fieldDatas} />) ||
            ((field?.fieldType === "choice" || field?.choices) && <div />)
          );
        })}
      </div>
    </>
  );
};

const FormsSection = ({ serviceId, setFields, fields, form, setForm }) => {
  const [formObjects, setFormObjects] = useState([]);
  useEffect(() => {
    sendNetworkRequest(`${BASEURL}/service/forms/${serviceId}/0`, "GET")
      .then((res) => {
        console.log("FormsSection data : ", res.data?.forms);
        setFormObjects(res.data?.forms);
      })
      .catch((err) => {
        console.log("FormsSection Form ERROR ", err.response.data, serviceId);
      });
  }, [serviceId]);

  return (
    <>
      {formObjects?.map((formObject) => (
        <div
          className="mt-3 br-16 emboss-white px-3 py-4"
          style={{ marginBottom: 40 }}
        >
          <div className="fs-10 text-manrope text-light-7">
            {formObject?.form_id?.name}
          </div>
          <FormItem
            formId={formObject?.form_id?.id}
            fields={fields}
            setFields={setFields}
            form={form}
            setForm={setForm}
          />
        </div>
      ))}
    </>
  );
  // return <div>{serviceId}</div>;
};

const FormItem = ({ formId, fields, setFields, form, setForm }) => {
  const [loading, setLoading] = useState(false);

  // const [form, setForm] = useState();
  // const [fields, setFields] = useState([]);

  useEffect(() => {
    sendNetworkRequest(`${BASEURL}/form/single/${formId}`, "GET")
      .then((res) => {
        console.log("Form Items : ", res.data);

        setFields((oldArray) => [
          ...oldArray,
          ...res?.data?.formFields,
          ...res?.data?.formChoices,
        ]);
        setForm((o) => [...o, res.data]);
      })
      .catch((err) => {
        console.log("FormItem ERROR ", err.response.data);
      });
  }, [formId]);

  // console.log("fields : ", fields);

  // const [inputs, setInputs] = useState();

  // const CheckInvoice = () => {
  //   setLoading(true);
  //   const invoice_id = window.localStorage.getItem("invoiceId");
  //   sendNetworkRequest(`${BASEURL}/invoice/${invoice_id}`, "GET")
  //     .then((res) => {
  //       console.log("CheckInvoice : ", res.data);
  //       handleSubmiteForm(res?.data?.target_entity_id?.id, invoice_id);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // };

  // const handleSubmiteForm = (target_entity_id, invoice_id) => {
  //   let lvPair = [];

  //   fields?.map((item) => {
  //     if (item.value) {
  //       if (item?.choices) {
  //         lvPair.push({
  //           value: item?.value,
  //           label: item?.name,
  //           fieldType: "choice",
  //           fieldId: item?.id,
  //         });
  //       } else {
  //         lvPair.push({
  //           value: item?.value,
  //           label: item?.name,
  //           fieldType: item?.type,
  //           fieldId: item?.id,
  //         });
  //       }
  //     } else {
  //       return;
  //     }
  //   });

  //   const data = {
  //     entityId: target_entity_id,
  //     formTemplateId: formId,
  //     invoiceId: invoice_id,
  //     labelValuePair: lvPair,
  //   };

  //   // sendNetworkRequest(`${BASEURL}/FormsSubmissions/forms`, "POST", data)
  //   sendNetworkRequest(
  //     `https://cx32j1n0k7.execute-api.us-east-2.amazonaws.com/prod/FormsSubmissions/forms`,
  //     "POST",
  //     data
  //   )
  //     .then((res) => {
  //       console.log("FORM SUBMITED : ", res);
  //     })
  //     .catch((err) => {
  //       console.log("FORM SUBMITED ERROR ", err.response.data);
  //     });
  // };

  return (
    <>
      {fields?.map((field, index) => {
        const handleChange = (e) => {
          field["value"] = e.target.value;
          setFields([...fields]);
        };

        const fieldDatas = {
          key: index,
          curIndex: index,
          field: field,
          fields: fields,
          setFields: setFields,
          handleChange,
        };

        return (
          (field?.type === "text" && <TextSubField {...fieldDatas} />) ||
          (field?.type === "number" && <NumberSubField {...fieldDatas} />) ||
          (field?.type === "file" && <FileSubField {...fieldDatas} />) ||
          (field?.type === "date" && <DateSubField {...fieldDatas} />) ||
          ((field?.type === "choice" || field?.choices) && (
            <ChoiceSubField {...fieldDatas} />
          ))
        );
      })}

      <div className="d-flex justify-content-end mt-5">
        <button className="btn btn-gradient">
          {/* <button className="btn btn-gradient" onClick={() => CheckInvoice()}> */}
          {loading ? "Please wait" : `Submit`}
        </button>
      </div>
    </>
  );
};

export default WorkshopArticles;

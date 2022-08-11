import React, { useState, useEffect } from "react";
import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import MainLayout from "../layouts/MainLayout";
import ModalArticle from "../modals/ModalServicesInventory";
import ModalForm from "../modals/ModalForm";
import ModalPasses from "../modals/ModalPasses";
import ModalNewVarient from "../modals/ModalNewVarient";
import ModalSchedule from "../modals/ModalSchedule";
import FancyInput from "../components/FancyInput";
import clsx from "clsx";
import { inputDateFormate } from "../utilities/CommonUtilities";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



const servicesOfferData = [
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: true,
    price: 2700,
  },
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: true,
    price: 2700,
  },
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: true,
    price: 2700,
  },
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: false,
    price: 2700,
  },
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: false,
    price: 2700,
  },
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: false,
    price: 2700,
  },
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: true,
    price: 2700,
  },
  {
    name: "Brake Service",
    completeBrake: 3,
    isLocation: true,
    price: 2700,
  },
];

const inventoryData = [
  {
    name: "Macbook Pro 15’ 2019",
    number: "SKU 345-091",
    quantity: 4890,
    price: 2642,
    isBrake: true,
    isChecked: true,
  },
  {
    name: "Macbook Pro 15’ 2019",
    number: "SKU 345-091",
    quantity: 4890,
    price: 2642,
    isBrake: false,
    isChecked: true,
  },
  {
    name: "Macbook Pro 15’ 2019",
    number: "SKU 345-091",
    quantity: 4890,
    price: 2642,
    isBrake: true,
    isChecked: false,
  },
  {
    name: "Macbook Pro 15’ 2019",
    number: "SKU 345-091",
    quantity: 4890,
    price: 2642,
    isBrake: true,
    isChecked: false,
  },
  {
    name: "Macbook Pro 15’ 2019",
    number: "SKU 345-091",
    quantity: 4890,
    price: 2642,
    isBrake: false,
    isChecked: false,
  },
  {
    name: "Macbook Pro 15’ 2019",
    number: "SKU 345-091",
    quantity: 4890,
    price: 2642,
    isBrake: true,
    isChecked: false,
  },
  {
    name: "Macbook Pro 15’ 2019",
    number: "SKU 345-091",
    quantity: 4890,
    price: 2642,
    isBrake: true,
    isChecked: false,
  },
];

const Inventory = () => {
  const [articleModalOpenState, setArticleModalOpenState] = useState(false);
  const [variantModalOpenState, setVariantModalOpenState] = useState(false);
  const [formModalOpenState, setFormModalOpenState] = useState(false);
  const [scheduleModalOpenState, setScheduleModalOpenState] = useState(false);
  const [passesModalOpenState, setPassesModalOpenState] = useState(false);
  const [serviceBrakeSelected, setServiceBrakeSelected] = useState(false);
  const [NodedForms, setNodedForms] = useState([]);
  const [service, setService] = useState({
    availableToBook: false,
    schedule: [],
  });
  const [serviceType, setServiceType] = useState(0);

  const [allServices, setAllServices] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [Passes, setPasses] = useState([]);
  const [checked, setChecked] = useState();
  const [categories, setCategories] = useState([]);

  const handeServiceTypeChange = (e) => {
    if (serviceType === 0) setServiceType(1);
    if (serviceType === 1) setServiceType(0);
  };

  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };

  const changeHandler = (event) => {
    let { name, value, checked } = event.target;
    if (name === "availableToBook") value = checked;
    setService({
      ...service,
      [name]: value,
    });
  };

  const deleteService = (id) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod
			/service/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      }
    )
      .then((response) => {
        console.log(response);
        setAllServices([]);
        fetchServices(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewArticle = (article) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/node/service/${service.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        body: JSON.stringify({ article_ids: [article?.object_id?.id] }),
      }
    )
      .then((response) => {
        console.log(response);
        getArticles();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getArticles = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/articles/${service?.id}/0`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllArticles(data.articles);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchServices = (pageIndex) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/all/${pageIndex}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        totalServices = [...totalServices, ...data.services];

        if (data.services.length > 1) {
          fetchServices(pageIndex + 1);
        } else {
          setAllServices(totalServices);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createService = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    if (service.id) {
      // Update Existing

      let obj = {
        ...service,
        serviceType: serviceType,
        price: Number(service.price),
        duration: Number(service.duration),
        deleted_at: null,
      };
      delete obj.id;
      // delete obj.name;
      if (serviceType === 0) {
        delete obj.startDate;
        delete obj.endDate;
      }
      console.log(service.id);
      fetch(
        `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod
				/service/${service.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          body: JSON.stringify(obj),
        }
      )
        .then((response) => {
          console.log(response);
          setService({
            availableToBook: false,
            schedule: [],
          });
          setServiceBrakeSelected(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Create New

      let obj = {
        ...service,
        serviceType: serviceType,
        price: Number(service.price),
        duration: Number(service.duration),
      };

      if (serviceType === 0) {
        delete obj.startDate;
        delete obj.endDate;
      }

      fetch(
        `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.accessToken}`,
            refresh_token: tokens.refreshToken,
            idToken: tokens.idToken,
          },
          body: JSON.stringify(obj),
        }
      )
        .then((response) => {
          console.log(response);
          setService({
            availableToBook: false,
            schedule: [],
          });
          setServiceBrakeSelected(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onChangedChecked = async (serviceId) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: 'PATCH',
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/${serviceId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        data: {
          is_featured: !checked,
        }
      };

      await axios(options).then((res) => {
        console.log(res);
        setChecked(!checked);
      })
      
    } catch(err){
      console.log(err);
    }
  }

  const nodeServiceForm = (id) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/node/form/${service.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        body: JSON.stringify({ form_ids: [id] }),
      }
    )
      .then((response) => {
        console.log(response);
        getNodedForms();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getNodedForms = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    fetch(
      `
			https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/forms/${service.id}/0`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.forms, 'Hxxxxxx');
        setNodedForms(data?.forms);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPasses = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/passes/${service.id}/0`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPasses(data.passes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteComponent = async (articleId) => {
    console.log(articleId, service.id)
    try{
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: 'DELETE',
        url: `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/unnode/article/${service.id}/${articleId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        }
      };
      await axios(options).then((res) => {
        console.log(res);
        
      })
    } catch(err){
      console.log(err);
    }
  } /// only that's not working

  const addNewPass = (passDetails) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    passDetails = {
      ...passDetails,
      service_id: service.id,
    };
    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/service/pass/manual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
        body: JSON.stringify(passDetails),
      }
    )
      .then((response) => {
        console.log(response);
        getPasses();
      })
      .catch((err) => {
        console.error(err);
      });
  };
   
  const fetchCategories = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const options = {
        method: 'GET',
        url: 'https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/core/category/0',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken
        }
      };
      await axios(options).then((res) => {
        console.log(res);
        let data = [{
          text: "Select a Category",
          disabled: true,
          selected: true,
        }]
        res?.data?.categories.map((item) => {
          let value = {
            text : item?.name,
            value : item?.id,
          }
          data.push(value);
        })
        setCategories(data);
      })
    } catch(err){
      console.log(err);
      let data = [{
        text: "Select a Category",
        disabled: true,
        selected: true,
      }]
      setCategories(data);
    }
  } 

  useEffect(() => {
    fetchCategories();
  }, []);


  let totalServices = [];

  useEffect(() => {
    service.serviceType != undefined &&
      setServiceType(Number(service.serviceType));
    service.id != undefined && getArticles();
    service.id != undefined && getNodedForms();
  }, [serviceBrakeSelected]);

  useEffect(() => {
    serviceType === 1 && service.id !== undefined && getPasses();
  }, [serviceType]);

  useEffect(() => {
    setAllServices([]);
    totalServices.length === 0 && fetchServices(0);
  }, totalServices);

  useEffect(() => {
      setChecked(service?.is_featured)
  }, [service])
  console.log(service);
  return (
    <MainLayout
      headVector="./assets/vectors/inventory.svg"
      sideNavVector="./assets/vectors/sidenav-right-8.svg"
      title="Services"
      activeLink={"inventory"}
      tabData={{
        img: true,
        tabLinks: true,
        tabGroupName: "finances-tabs",
        data: [
          {
            icon: "./assets/vectors/tab-inventory-services.svg",
            iconActive: "./assets/vectors/tab-inventory-services-active.svg",
            to: "/inventory",
          },
          {
            icon: "./assets/vectors/tab-inventory-articles.svg",
            iconActive: "./assets/vectors/tab-inventory-articles-active.svg",
            to: "/inventory-articles",
          },
        ],
      }}
    >
      <div id="inventory-main-content">
        <ModalArticle
          isOpen={articleModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setArticleModalOpenState)}
          addArticle={addNewArticle}
          selectedServiceId={service.id}
        />
        <ModalNewVarient
          isOpen={variantModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setVariantModalOpenState)}
        />
        <ModalForm
          isOpen={formModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setFormModalOpenState)}
          addFormToService={nodeServiceForm}
        />
        <ModalSchedule
          isOpen={scheduleModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setScheduleModalOpenState)}
        />
        <ModalPasses
          isOpen={passesModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setPassesModalOpenState)}
          savePass={addNewPass}
        />
        {!serviceBrakeSelected ? (
          <div className="container-fluid">
            <div className="row py-4">
              <div className="col-1 d-flex justify-content-center align-items-center">
                <img src="./assets/vectors/filter-contained.svg" alt="" />
              </div>
              <div className="col-11 col-md-4">
                <SearchInput placeholder="Search name" />
              </div>
              <div className="col-12 col-md-7 py-md-0 py-2 d-flex justify-content-end align-items-center">
                <AddBtn
                  onClick={() => {
                    setServiceBrakeSelected(true);
                  }}
                  pale
                  title="New"
                />
              </div>
            </div>
            <div className="table-wrapper short-vertical-scrollbar">
              <div className="table px-2">
                {allServices?.map((data, idx) => {
                  return (
                    <div
                      key={"services-offer-data" + idx}
                      className=" table-hover row my-1 align-items-center py-1 mb-4 gx-0 services-offer-record"
                    >
                      <div
                        onClick={() => {
                          setService(data?.service_id);
                          setServiceBrakeSelected(true);
                        }}
                        className="col-3 d-flex gap-3 ps-4 align-items-center"
                      >
                        {/* <div className="box"></div> */}
                        {/* <input type="checkbox" name="" id="" /> 
                        <label className="checkbox-container-5">
                          <input type="checkbox" />
                          <div className="checkmark"></div>
                        </label>*/}
                        <div className="col-6 text fw-600 fs-16">
                          {data?.service_id?.name}
                        </div>
                      </div>
                      <div className="col-3 d-flex text fw-400 fs-15">
                        {data?.service_id?.duration} min.
                      </div>
                      <div className="col-1 d-flex text fw-400 fs-15">
                        {/*    {data?.service_id?.category}*/}
                      </div>
                      <div className="col-2 d-flex text fw-400 fs-15">
                        {data?.service_id?.price}h (billable)
                      </div>
                      <div className="col-2 price fw-400">
                        <button className=" inventry-btn py-2 px-3 fw-600 fs-15">
                          {data?.service_id?.category}
                        </button>
                      </div>
                      <div
                        onClick={() => deleteService(data.service_id.id)}
                        className="col-1 d-flex justify-content-center align-items-center"
                      >
                        <div className="services-offer-menu">
                          <img src="./assets/vectors/delete.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="container-fluid service-brake">
            <div className="row pt-5 gx-sm-8">
              <div className="col-7 col-lg-7">
                <div className="row">
                  <div className="input d-flex">
                    <input
                      className="col-lg-5 gradient-text pb-4 fw-600 bg-transparent border-0 fs-22"
                      id="Service"
                      name="name"
                      placeholder="Service name"
                      value={service?.name}
                      onChange={changeHandler}
                    />
                   <Checkbox 
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />} 
                    onChange={() => onChangedChecked(service.id)}
                    defaultChecked={checked}
                    key={Math.random()}
                    className='mb-4'
                   />
                    <FancyInput
                      select
                      options={categories}
                      onChange={changeHandler}
                      id="category"
                      name="category"
                      placeholder="Select Category"
                      rootClassName="appointment-select mb-3"
                      inputClassName="custom-select"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <div className="custom-form-control my-3">
                      <label className="text fs-14" htmlFor="">
                        Billable hours
                      </label>
                      <div className="input">
                        <input
                          className="text-dark-3 fs-18 fw-600 pt-3 pb-4"
                          type="number"
                          value={service.price}
                          name="price"
                          placeholder="ex. 2h"
                          onChange={changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="custom-form-control my-3">
                      <label className="text fs-14" htmlFor="">
                        Duration (min.)
                      </label>
                      <div className="input">
                        <input
                          className="text-dark-3 fs-18 fw-600 pt-3 pb-3"
                          type="number"
                          value={service.duration}
                          name="duration"
                          placeholder="ex. 60 min"
                          onChange={changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="row">
                      {/* <div className="col-4 d-flex flex-column align-items-start justify-content-end">
                          <div className="fs-14 text-dark-3 fw-600 text-poppins pb-2">
                            Add Variant
                          </div>
                          <div
                            onClick={() =>
                              modalOpenHandler(setVariantModalOpenState)
                            }
                            className="rounded c-pointer d-flex justify-content-center align-items-center fs-16 text-manrope fw-600 box"
                          >
                            +
                          </div>
                        </div> */}

                      <div className="mt-3  ms-5">
                        <FancyInput
                          select
                          options={[
                            {
                              text: "Hourly service",
                              disabled: false,
                              selected: service.serviceType === 0,
                            },
                            {
                              text: "Recurring Service",
                              disabled: false,
                              selected: service.serviceType === 1,
                            },
                          ]}
                          id="category"
                          name="serviceType"
                          placeholder="Select Category"
                          rootClassName="appointment-select"
                          inputClassName="custom-select"
                          onChange={(event) => {
                            changeHandler(event);
                            handeServiceTypeChange();
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-10 mt-3 mb-4">
                    <div className="row">
                      {serviceType === 1 && (
                        <>
                          <div className="col-8">
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <p className="text mt-2">Start date</p>
                                <FancyInput
                                  sMargin
                                  id="date"
                                  type="date"
                                  name="startDate"
                                  value={inputDateFormate(service?.startDate)}
                                  onChange={changeHandler}
                                  placeholder="DD/MM/AA   at 00:000"
                                  inputClassName="dateInput"
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <p className="text mt-2">End date</p>
                                <FancyInput
                                  sMargin
                                  id="date"
                                  type="date"
                                  name="endDate"
                                  value={inputDateFormate(service?.endDate)}
                                  onChange={changeHandler}
                                  placeholder="start time"
                                  inputClassName="dateInput"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-2 mb-3">
                            <div className="custom-form-control my-3">
                              <label className="text fs-14" htmlFor="">
                                Capacity
                              </label>
                              <div className="input">
                                <input
                                  className="text-dark-3 fs-18 fw-600 pt-3 pb-3"
                                  type="text"
                                  value="10"
                                  onChange={() => {}}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-2 mb-3">
                            <div className="custom-form-control my-3">
                              <label className="text fs-14" htmlFor="">
                                Schedule
                              </label>
                              <div
                                onClick={() =>
                                  modalOpenHandler(setScheduleModalOpenState)
                                }
                                className="rounded c-pointer d-flex justify-content-center align-items-center fs-16 text-manrope fw-600 box"
                              >
                                +
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {allArticles?.map((article, i) => {
                  let data = JSON.parse(article?.profile_id?.data);
                  console.log(allArticles, service);
                  return (
                    <div key={i} className="emboss-inner mt-5 br-16 px-5">
                      <div className="row pt-3">
                        <div className="d-flex justify-content-end">
                            <img
                              src="./assets/vectors/delete.svg"
                              alt="delete"
                              className="hover"
                              onClick={() => deleteComponent(article.id)}
                            />
                          
                        </div>
                        <div className="col-6">
                          <div className="custom-form-control my-3">
                            <label className="text-light-5 fs-14" htmlFor="">
                              Article Name
                            </label>
                            <div className="input">
                              <img
                                className="icon"
                                src="./assets/vectors/add-basket.svg"
                                alt=""
                              />
                              <input
                                className="text-dark-3 fs-14 pt-2 pb-2 ps-5 text-blue"
                                type="text"
                                value={data.name}
                                onChange={() => {}}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="custom-form-control my-3">
                            <label className="text-light-5 fs-14" htmlFor="">
                              SKU
                            </label>
                            <div className="input">
                              <input
                                className="text-dark-3 fs-14 pt-2 pb-2"
                                type="text"
                                value={data.sku}
                                onChange={() => {}}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-6">
                              <div className="custom-form-control my-3">
                                <label
                                  className="text-light-5 fs-14"
                                  htmlFor=""
                                >
                                  Quantity
                                </label>
                                <div className="input">
                                  <input
                                    className="text-dark-3 fs-14 pt-2 pb-3"
                                    type="text"
                                    value={data.quantity}
                                    onChange={() => {}}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="custom-form-control my-3">
                                <label
                                  className="text-light-5 fs-14"
                                  htmlFor=""
                                >
                                  Cost
                                </label>
                                <div className="input">
                                  <input
                                    className="text-dark-3 fs-14 pt-2 pb-3"
                                    type="text"
                                    placeholder="37"
                                    value={data.cost}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="custom-form-control my-3">
                            <label className="text-light-5 fs-14" htmlFor="">
                              Retail Price
                            </label>
                            <div className="input">
                              <input
                                className="text-dark-3 fs-14 pt-2 pb-3"
                                type="text"
                                value={data.price}
                                onChange={() => {}}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="row gx-0 py-3">
                  <div className="col-10 d-flex justify-content-end mb-5">
                    <AddBtn
                      pale
                      onClick={() => modalOpenHandler(setArticleModalOpenState)}
                      title={"Add"}
                    />
                  </div>
                  <div
                    className="col-10 d-flex justify-content-end mt-5"
                    onClick={createService}
                  >
                    <div className="btn btn-gradient">Save &amp; Return</div>
                  </div>
                </div>
              </div>
              <div className="col-0 col-lg-1"></div>
              <div className="col-12 col-lg-4 custom-border custom-rounded service-details">
                <div className="row mb-2">
                  <div className="d-flex">
                    <h3 className="col-9 service-details-text pt-3 pb-4 section-title">
                      Form Templates
                    </h3>

                    <div className="col-2">
                      <AddBtn
                        pale
                        onClick={() => modalOpenHandler(setFormModalOpenState)}
                        title={"Add"}
                      />
                    </div>
                  </div>
                  <div
                    className="row mt-2 emboss-inner custom-border custom-rounded p-5"
                    style={{
                      height: "350px",
                      overflow: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    <div
                      style={{ height: "100%" }}
                      className="row hover mt-3 emboss-white px-3 py-4 custom-border custom-rounded d-flex justify-content-between align-items-center"
                    >
                      {NodedForms.map((form, i) => {
                        const name  = form?.form_id;
                        // console.log(form , "heeee");
                        return (
                          <div
                            key={i}
                            style={{ textAlign: "center" }}
                            className={"item"}
                          >
                            <img
                              src="./assets/vectors/form-img.svg"
                              alt="form-img"
                            />
                            <div className="hover text-x-small dark">
                              {name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* <div className='col-12'>
										<div className='row'>
											<div className='col-11 d-flex align-items-start gap-3'>
												<div className='box emboss-inner br-16'>
													<img src='./assets/vectors/vehicle.svg' alt='' />
												</div>
												<div>
													<div className='title text-dark-3 text-bold fs-14 pt-1'>
														Right Rear Light
													</div>
													<div className='sub text-light-5 fs-12 '>
														89632472346727834-23
													</div>
												</div>
											</div>
											<div className='col-1 d-flex align-items-center text-blue text-bold'>
												x2
											</div>
										</div>
									</div>
									<div className='col-12'>
										<div className='row'>
											<div className='col-11 d-flex align-items-start gap-3'>
												<div className='box emboss-inner br-16'>
													<img src='./assets/vectors/vehicle.svg' alt='' />
												</div>
												<div>
													<div className='title text-dark-3 text-bold fs-14 pt-1'>
														Filter
													</div>
													<div className='sub text-light-5 fs-12 '>
														B-7C-9762
													</div>
												</div>
											</div>
											<div className='col-1 d-flex align-items-center text-blue text-bold'>
												x1
											</div>
										</div>
									</div> */}
                </div>
                <div className="row pt-5">
                  <div className="col-9">
                    <h3 className="service-details-text pt-3 pb-4 section-title">
                      Passes
                    </h3>
                  </div>
                  <div className="col-2">
                    {serviceType === 1 && (
                      <AddBtn
                        pale
                        onClick={() =>
                          modalOpenHandler(setPassesModalOpenState)
                        }
                        title={"Add"}
                      />
                    )}
                  </div>
                </div>
                <div
                  className="row mt-2 emboss-inner custom-border custom-rounded p-5"
                  style={{
                    height: "350px",
                    overflow: "hidden",
                    overflowY: "auto",
                  }}
                >
                  {Passes?.map((pass, i) => {
                    console.log(pass);
                    return (
                      <div
                        key={i}
                        className="row hover mt-3 emboss-white px-3 py-4 custom-border custom-rounded d-flex justify-content-between align-items-center"
                      >
                        <div className="col-9">
                          <h2 className="fs-14 text-dark fw-600 text-poppins m-0">
                            {pass?.name}
                          </h2>
                          <p className="text-light-5 fs-12 m-0">
                            {inputDateFormate(pass?.endDate)}
                          </p>
                        </div>
                        <div className="col-3 d-flex justify-content-between">
                          <img
                            width="30px"
                            src="./assets/vectors/np_credit.svg"
                            alt=""
                          />
                          <img
                            width="23px"
                            src="./assets/vectors/np_message.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Inventory;

import axios from "axios";
import React, { useState, useEffect } from "react";
import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import { BASEURL } from "../http/http-request";
import MainLayout from "../layouts/MainLayout";
import ModalArticle from "../modals/ModalArticle";
import ModalForm from "../modals/ModalForm";
import ModalNewVarient from "../modals/ModalNewVarient";
import ModalSchedule from "../modals/ModalSchedule";
// import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScroll from "react-infinite-scroller";

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
  const [serviceBrakeSelected, setServiceBrakeSelected] = useState(false);
  const [selectedArticle, setselectedArticle] = useState();
  const [Page, setPage] = useState(0);
  const [Categories, setCategories] = useState([]);

  // STATE
  const [articles, setArticles] = useState([]);
  let totalArticles = [];
  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };

  const fetchMoreArticles = async (pageIndex) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));

    try {
      const res = await axios({
        method: "GET",
        url: `${BASEURL}/profile/entity/artiles/${pageIndex}`,
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          refresh_token: tokens.refreshToken,
          idToken: tokens.idToken,
        },
      });
      totalArticles = [...totalArticles, ...res.data.articles];
      console.log(res);

      if (res.data.length > 1) {
        fetchMoreArticles(pageIndex + 1);
      } else {
        setArticles(totalArticles);
      }
    } catch (error) {}
  };

  const getCategories = (page) => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    fetch(
      `https://qz8jew41ki.execute-api.us-east-2.amazonaws.com/prod/core/category/${page}`,
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
        setCategories(data.categories);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getCategories(0);
    setArticles([]);
    // fetchMoreArticles(0);
    totalArticles.length === 0 && fetchMoreArticles(0);
  }, totalArticles);

  return (
    <MainLayout
      headVector="./assets/vectors/inventory.svg"
      sideNavVector="./assets/vectors/sidenav-right-8.svg"
      title="Inventory"
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
      <div id="inventory-articles-main-content">
        <ModalArticle
          isOpen={articleModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setArticleModalOpenState)}
          setArticles={setArticles}
          article={selectedArticle}
          allArticles={articles}
          fetchArticles={() => {
            setArticles([]);
            fetchMoreArticles(0);
          }}
        />
        <ModalNewVarient
          isOpen={variantModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setVariantModalOpenState)}
        />
        <ModalForm
          isOpen={formModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setFormModalOpenState)}
        />
        <ModalSchedule
          isOpen={scheduleModalOpenState}
          modalCloseHandler={() => modalCloseHandler(setScheduleModalOpenState)}
        />
        <div className="container-fluid">
          <div className="row py-4">
            <div className="col-1 d-flex justify-content-center align-items-center">
              <img src="./assets/vectors/filter-contained.svg" alt="" />
            </div>
            <div className="col-11 col-md-4">
              <SearchInput placeholder="Search name" />
            </div>
            <div className="col-12 col-md-7 py-md-0 py-3 d-flex justify-content-end align-items-center">
              <AddBtn
                onClick={() => {
                  setselectedArticle(undefined);
                  modalOpenHandler(setArticleModalOpenState);
                }}
                pale
                title="New"
              />
            </div>
          </div>
          <div className="table-wrapper short-vertical-scrollbar">
            <div className="table px-3">
              {articles?.map((data, idx) => {
                const parsedData = JSON.parse(data.object_id.data);

                return (
                  <div
                    onClick={() => {
                      setServiceBrakeSelected(true);
                    }}
                    key={"articles" + idx}
                    className={` table-hover row my-2 align-items-center  py-1 mb-4 gx-0 services-offer-record${
                      data.isChecked ? "checked" : ""
                    }`}
                  >
                    <div className="col-5 d-flex align-items-center ps-2 gap-4 info">
                      <img src="./assets/img/inventory-1.png" alt="" />
                      <div className="col-7 text fw-600 fs-16">
                        <div
                          className="title c-pointer"
                          onClick={() => {
                            setselectedArticle(data);
                            modalOpenHandler(setArticleModalOpenState);
                          }}
                        >
                          {parsedData.name}
                        </div>
                        <div className="text fw-400 py-1">{parsedData.sku}</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="text fw-400">
                        {parsedData.quantity}
                        <div className="text-light-5">Qty.</div>
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="text fw-400">
                        {parsedData.price}$
                        <div className="text-light-5">Price</div>
                      </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                      <button className="inventry-btn py-2 px-4 fw-600">
                        {data?.object_id?.category?.name ? data?.object_id?.category?.name : ""}
                        {/* {
                          Categories?.find(
                            (category) => category.id === parsedData.category
                          )?.name
                        } */}
                      </button>
                    </div>
                    <div className="col-1 d-flex justify-content-center align-items-center">
                      <div className="inventory-menu">
                        <img 
                        src="./assets/vectors/delete.svg"
                        alt=""
                        onClick={() => console.log('HELLO')}
                        />
                        
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Inventory;

import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import { BASEURL, sendNetworkRequest } from "../../http/http-request";
import AddBtn from "../../components/AddBtn";

import Loader from "../../components/Loader";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

export default function FormCards() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState();

  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState([]);

  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    getForms();
  }, [curPage]);
  const getForms = () => {
    setLoading(true);
    sendNetworkRequest(`${BASEURL}/form/all/${curPage}`, "GET")
      .then((res) => {
        console.log(res.data);
        setForms(res?.data?.forms);

        setTotalPages(Math.ceil(res?.data?.totalRecords / 10));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  const aTagStyle = {
    color: "black",
    float: "left",
    padding: "8px 16px",
    textDecoration: "none",
  };

  return loading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  ) : (
    <MainLayout
      headVector="./assets/vectors/builder.svg"
      sideNavVector="./assets/vectors/builder.svg"
      title="Forms"
      activeLink="manner"
      tabData={{
        img: true,
        tabGroupName: "manner-tabs",
        data: [
          {
            icon: "./assets/vectors/form-notactive.svg",
            iconActive: "./assets/vectors/form-active.svg",
            target: "form",
            active: true,
          },
        ],
      }}
    >
      <div className="w-100 d-flex justify-content-between align-items-center">
        {showCreateForm === true || showUpdateForm === true ? (
          <button
            className="btn m-2 btn-emboss"
            style={{ padding: "1em 2em" }}
            onClick={() => {
              setShowUpdateForm(false);
              setShowCreateForm(false);
              setSelectedFormId();
            }}
          >
            Back
          </button>
        ) : (
          <div />
        )}

        <AddBtn className="mb-4" pale title="New" onClick={() => setShowCreateForm(true)} />
      </div>
      {(showCreateForm && (
        <CreateForm
          open={showCreateForm}
          setOpen={setShowCreateForm}
          getForms={getForms}
        />
      )) ||
        (showUpdateForm && (
          <UpdateForm
            open={showUpdateForm}
            setOpen={setShowUpdateForm}
            selectedFormId={selectedFormId}
            getForms={getForms}
          />
        )) || (
          <div id="form-cards-main-content" className="mt-2 mt-sm-0">
            <div className="container-fluid px-0">
              <div className="row g-6">
                <div className="col">
                  <div className="px-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                      {/* <Tabs
                      tabClassName="mb-4 mb-sm-0 fw-600 text-poppins fs-14"
                      className="mt-4 "
                      tabGroupName="form-cards-tabs"
                      data={[
                        {
                          icon: "./assets/vectors/internal.svg",
                          iconActive: "./assets/vectors/internal.svg",
                          label: "Internal",
                          target: "internal",
                          active: true,
                        },
                        {
                          icon: "./assets/vectors/sms.svg",
                          iconActive: "./assets/vectors/sms-active.svg",
                          label: "Public",
                          target: "public",
                        },
                      ]}
                    />
                    <AddBtn /> */}
                    </div>

                    <div className="cards-container mt-2">
                      <div className="row gy-5 gx-xxl-5">
                        {forms?.map((el, idx) => {
                          const { name, fields, choices, is_internal, id, created_at} = el;

                          return (
                            <div
                              key={"form-card" + idx}
                              className="col-lg-2 col-md-6 col-sm-6"
                            >
                              <div className="card emboss-white br-16 form-card">
                                <div className="main">
                                  <form className="d-flex checkboxes">
                                {/*    <label className="checkbox-container-2">
                                      Internal
                                      <input
                                        name="rd"
                                        type="radio"
                                        readOnly={true}
                                        checked={is_internal ? true : false}
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                    <label className="checkbox-container-2">
                                      Public
                                      <input
                                        name="rd"
                                        type="radio"
                                        readOnly={true}
                                        checked={is_internal ? false : true}
                                      />
                                      <span className="checkmark"></span>
                                   </label> */}
                                  </form>
                                  <img className="mb-3" src="../assets/vectors/form-notactive.svg"/>
                                  <h3
                                    className="gradient-text"
                                    // onClick={() => setCardSelected(true)}
                                  >
                                    {name}
                                  </h3>
                                  <p className="fs-10 mb-2">{created_at}</p>
                                  <div className="text-manrope mt-1 ">
                                    {fields?.length + choices?.length} questions
                                  </div>
                                  <div className="d-flex justify-content-around align-items-center">
                                    <button
                                      className="btn text fs-11"
                                      onClick={() => {
                                        setShowUpdateForm(true);
                                        setSelectedFormId(id);
                                      }}
                                    >
                                      Update
                                    </button>
                                    <button className="btn text fs-11">
                                      <img
                                        id="1"
                                        src="./assets/vectors/delete.svg"
                                        alt="delete"
                                        class="hover"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 30,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "inline-block" }}>
                <a
                  style={aTagStyle}
                  onClick={() => {
                    setCurPage((e) => (e > 0 ? e - 1 : 0));
                  }}
                >
                  &laquo;
                </a>
                {Array.from(new Array(totalPages)).map((item, index) => (
                  <a
                    key={index}
                    style={{
                      ...aTagStyle,
                      fontWeight: curPage === index ? 600 : 500,
                      opacity: curPage === index ? 1 : 0.75,
                    }}
                    onClick={() => setCurPage(index)}
                  >
                    {index + 1}
                  </a>
                ))}
                <a
                  style={aTagStyle}
                  onClick={() => {
                    setCurPage((e) =>
                      e < totalPages - 1 ? e + 1 : totalPages - 1
                    );
                  }}
                >
                  &raquo;
                </a>
              </div>
            </div>
          </div>
        )}
    </MainLayout>
  );
}

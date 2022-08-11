import React, { useState } from "react";
import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import FancyInput from "../components/FancyInput";
import MainLayout from "../layouts/MainLayout";
import ModalInvoice from "../modals/ModalInvoice";

const dummyData = [
  {
    vector: "./assets/img/supplier-1.png",
    circleColor: "#ECA0A0",
    name: "Napa Pièces d’auto",
    email: "(450) 322-2132",
    contact: "Manon Latulippe",
    poste: 23,
    paidDate: "15/APR/2020",
    lastOne: "12/APR/2020",
    amount: 200,
    currency: "CAD",
  },
  {
    vector: "./assets/img/supplier-2.png",
    circleColor: "#4ACBD3",
    name: "WorldPac Parts",
    email: "(450) 322-2132",
    contact: "Francois Coulombe",
    poste: 2,
    paidDate: "15/APR/2020",
    amount: 200,
    currency: "CAD",
  },
  {
    vector: "./assets/img/supplier-3.png",
    circleColor: "#4ACBD3",
    name: "Dagenais Volvo",
    email: "(450) 322-2132",
    contact: "Isabelle Marechal",
    paidDate: "",
    lastOne: "12/APR/2020",
    amount: 200,
    currency: "CAD",
  },
  {
    vector: "./assets/img/supplier-3.png",
    circleColor: "#4ACBD3",
    name: "Dagenais Volvo",
    email: "(450) 322-2132",
    contact: "Isabelle Marechal",
    paidDate: "",
    lastOne: "12/APR/2020",
    amount: 200,
    currency: "CAD",
  },
];

const FinancesIncome = () => {
  const [incomeConvertedSelected, setIncomeConvertedSelected] = useState(false);
  const [paymentModalOpenState, setPaymentModalOpenState] = useState(false);

  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };
  return (
    <MainLayout
      title={"Suppliers"}
      activeLink={"treasury"}
      tabData={{
        img: true,
        tabLinks: true,
        tabGroupName: "finances-tabs",
        data: [
          {
            icon: "./assets/vectors/tab-finances-income.svg",
            iconActive: "./assets/vectors/tab-finances-income-active.svg",
            to: "/finances-income",
          },
          {
            icon: "./assets/vectors/tab-finances-expense.svg",
            iconActive: "./assets/vectors/tab-finances-expense-active.svg",
            to: "/finances-expense",
          },
          {
            icon: "./assets/vectors/tab-finances-suppliers.svg",
            iconActive: "./assets/vectors/tab-finances-suppliers-active.svg",
            to: "/finances-suppliers",
          },
        ],
      }}
    >
      <ModalInvoice
        isOpen={paymentModalOpenState}
        modalCloseHandler={() => modalCloseHandler(setPaymentModalOpenState)}
      />
      <div className="finances-invoice-main-content">
        {!incomeConvertedSelected ? (
          <div className="container-fluid">
            <div className="row pt-5">
              <div className="col-12 ps-sm-4 col-sm-9">
                <SearchInput
                  withFilter
                  placeholder="Search supplier or contact"
                />
              </div>
              <div className="col-12 col-sm-3 py-sm-0 pt-5 d-flex justify-content-start justify-content-sm-end align-items-center">
                <AddBtn
                  onClick={() => setIncomeConvertedSelected(true)}
                  pale
                  title="New"
                />
              </div>
            </div>
            <div className="container-fluid mt-5 px-0">
              <div className="row">
                <div className="col-lg-8">
                  <div className="table-wrapper short-vertical-scrollbar">
                    <div className="table">
                      <div className="container-fluid px-0">
                        <div className="row gx-0 table-heading">
                          <div className="col-1"></div>
                          <div className="col-4">
                            <div className="label">Supplier</div>
                          </div>
                          <div className="col-3">
                            <div className="label">Contact</div>
                          </div>
                          <div className="col-3">
                            <div className="label">Categorie</div>
                          </div>
                          <div className="col-1 text-end">
                            <div className="label">Balance</div>
                          </div>
                        </div>
                      </div>
                      {dummyData.map((data, idx) => {
                        return (
                          <div
                            key={"li" + idx}
                            className="row emboss-row mb-3 align-items-center gx-0 py-2 dummy-data"
                          >
                            <div className="col-1 d-flex justify-content-center align-items-center">
                              <img w="true" src={data.vector} alt={data.name} />
                            </div>
                            <div className="col-4 d-flex flex-column gap-1">
                              <div className="name">{data.name}</div>
                              <div className="email">{data.email}</div>
                            </div>
                            <div className="col-3 d-flex flex-column gap-1">
                              <div className="text-inter fw-600 fs-12 mb-1">
                                {data.contact}
                              </div>
                              <div className="last-login">
                                {data.poste ? <>Post {data.poste}</> : "N/A"}
                              </div>
                            </div>
                            <div className="col-3 d-flex flex-column gap-1">
                              <div className="text-blue text-inter fw-500 fs-12 ps-2">
                                Parts
                              </div>
                              {data.lastOne && (
                                <div className="fs-12 fw-600">
                                  Last one {data.lastOne}
                                </div>
                              )}
                            </div>
                            <div className="col-1 d-flex flex-column gap-1 text-end">
                              <div className="amount">{data.amount}$</div>
                              <div className="currency">{data.currency}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 ps-xxl-5">
                  <div className="ps-xxl-5 pt-5 pt-lg-0">
                    <div className="d-flex align-items-center">
                      <img
                        src="./assets/img/supplier-1.png"
                        alt="Napa Pièces d’auto"
                      />
                      <div class="ms-3">
                        <div className="fw-700">Napa Pièces d’auto</div>

                        <button className="btn mt-2 btn-emboss round me-3">
                          <img src="./assets/vectors/call.svg" alt="call" />
                        </button>
                        <button className="btn btn-emboss round me-3">
                          <img src="./assets/vectors/email-2.svg" alt="email" />
                        </button>
                        <button className="btn btn-emboss round">
                          <img
                            src="./assets/vectors/location.svg"
                            alt="location"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="inputs mt-5">
                      <FancyInput
                        rootClassName="my-3"
                        prominant
                        label="Nom"
                        id="nom"
                        name="nom"
                        placeholder="Start typing..."
                      />
                      <FancyInput
                        rootClassName="my-3"
                        prominant
                        label="Contact"
                        id="contact"
                        name="contact"
                        placeholder="Start typing..."
                      />
                      <FancyInput
                        rootClassName="my-3"
                        prominant
                        label="Email"
                        id="email"
                        name="email"
                        placeholder="Start typing..."
                      />
                      <div className="emboss-input">
                        <div className="container-fluid px-0">
                          <div className="row px-0">
                            <div className="col-9">
                              <FancyInput
                                embossed={false}
                                rootClassName="my-3"
                                prominant
                                label="Téléphone"
                                id="tel"
                                name="tel"
                                placeholder="Start typing..."
                              />
                            </div>
                            <div className="col-3">
                              <FancyInput
                                embossed={false}
                                rootClassName="my-3"
                                prominant
                                label="Ext."
                                id="ext"
                                name="ext"
                                placeholder="Enter"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <FancyInput
                        rootClassName="my-3"
                        prominant
                        label="Addresse"
                        id="address"
                        name="address"
                        placeholder="Start typing..."
                      />

                      <div className="d-flex justify-content-end mt-4">
                        <AddBtn gradient title="SAVE" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div rootClassName="container-fluid">
            <div className="row gx-0 py-5">
              <div className="col-12 col-lg-7">
                <div className="collapses-container">
                  <div className="collapse">
                    <div className="head">
                      <div className="text-dark-3 text-lato fw-800 fs-12">
                        Service: Front Back Change
                      </div>

                      <div className="options">
                        <div className="btn p-0">
                          <img
                            src="./assets/vectors/arrow-down-1.svg"
                            alt="arrow-down"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="body">
                      <div className="collapse-section">
                        <div className="container-fluid px-0">
                          <div className="row">
                            <div className="col-6">
                              <FancyInput
                                vector="./assets/vectors/cart.svg"
                                prominantBlue
                                mdPaddingBottom
                                sMargin
                                label="&nbsp;"
                                id="pad"
                                name="pad"
                                placeholder="Start typing..."
                                value="Front Pad"
                              />
                            </div>
                            <div className="col-6">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="sku"
                                name="sku"
                                label="SKU"
                                placeholder="Start typing..."
                                value="873244424343-32"
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="quantity"
                                name="quantity"
                                label="Quantity"
                                placeholder="Start typing..."
                                value="2"
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="availability"
                                name="availability"
                                label="Availability"
                                placeholder="Start typing..."
                                value="76"
                                disabled
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="price"
                                name="price"
                                label="Unit Price"
                                placeholder="Start typing..."
                                value="20.00%"
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="price"
                                name="price"
                                label="Categorie"
                                placeholder="Start typing..."
                                value="BRAKE"
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
                                vector="./assets/vectors/cart.svg"
                                prominantBlue
                                mdPaddingBottom
                                sMargin
                                label="&nbsp;"
                                id="pad"
                                name="pad"
                                placeholder="Start typing..."
                                value="Front Brake Change with OP"
                              />
                            </div>
                            <div className="col-6">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="sku"
                                name="sku"
                                label="SKU"
                                placeholder="Start typing..."
                                value="L-FBC-OP"
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="quantity"
                                name="quantity"
                                label="Quantity"
                                placeholder="Start typing..."
                                value="1"
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="availability"
                                name="availability"
                                label="Availability"
                                placeholder="Start typing..."
                                value="NA"
                                disabled
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="price"
                                name="price"
                                label="Unit Price"
                                placeholder="Start typing..."
                                value="47.00$"
                              />
                            </div>
                            <div className="col-6 col-sm-3">
                              <FancyInput
                                prominant
                                lightLabel
                                thinlabel
                                mdPaddingBottom
                                sMargin
                                id="price"
                                name="price"
                                label="Categorie"
                                placeholder="Start typing..."
                                value="LABOR"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="foot">
                      <div className="d-flex justify-content-end">
                        <div className="btn btn-dark btn-update">
                          <img
                            className="update"
                            src="./assets/vectors/update-2.svg"
                            alt="update"
                          />
                          Update
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse closed">
                    <div className="head">
                      <div className="text">Unit : Oil - (1L) 5W30 Syn.</div>

                      <div className="options">
                        <div className="btn p-0">
                          <img
                            src="./assets/vectors/arrow-down-1.svg"
                            alt="arrow-down"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="collapse closed">
                    <div className="head">
                      <div className="text">Unit : 7C Battery</div>

                      <div className="options">
                        <div className="btn p-0">
                          <img
                            src="./assets/vectors/arrow-down-1.svg"
                            alt="arrow-down"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row pt-5 gx-0">
                  <div className="col-12 d-flex gap-3">
                    <button className={`btn padding btn-add`}>
                      Add &amp; Pay Later
                    </button>
                    <button
                      onClick={() => modalOpenHandler(setPaymentModalOpenState)}
                      className={`btn padding blue`}
                    >
                      Add Payment
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-0 col-lg-1"></div>
              <div className="col-12 col-lg-4 py-5 py-lg-0 px-xxl-5">
                <div className="row px-xxl-4">
                  <div className="col-12">
                    <div
                      className="circle circle-large"
                      style={{ backgroundColor: "#ECA0A0" }}
                    >
                      <img
                        src="./assets/img/client-vector-8.png"
                        alt="client"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="text-blue text-poppins fs-22 fw-600">
                      Bryandy Boyd
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="text-dark-3 text-manrope fs-14 user-address">
                      3452 av. de la Tour, Québec (QC) G1V 9J3 Canada
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="text-dark-3 text-poppins fw-700 fs-14 lh-1">
                      ernest.mason@gmail.com
                    </div>
                    <div className="text-light-5 text-manrope fs-12 pb-4">
                      Email
                    </div>
                  </div>
                  <div className="col-12 pb-5">
                    <div className="text-dark-3 text-poppins fw-700 fs-14 lh-1">
                      561-303-6106
                    </div>
                    <div className="text-light-5 text-manrope fs-12 pb-5">
                      Phone
                    </div>
                  </div>
                  <div className="col-12 pb-3">
                    <div className="text-dark-3 text-manrope fw-800 fs-18">
                      Work Order
                    </div>
                    <div className="text-light-5 text-manrope fw-200 fs-20">
                      #329878316-23
                    </div>
                  </div>
                  <div className="col-12 pb-4 d-flex gap-3">
                    <img src="./assets/vectors/paste.svg" alt="client" />
                    <div>
                      <div className="text-dark-3 text-manrope fs-14">
                        Noded with <b>2 profiles</b>
                      </div>
                      <div className="text-light-5 text-manrope fs-12">
                        Acura MDX 2020
                      </div>
                    </div>
                  </div>
                  <div className="col-12 pb-5 d-flex gap-3">
                    <img src="./assets/vectors/calender-3.svg" alt="calender" />
                    <div className="text-dark-3 user-location">
                      <span className="text-manrope fs-14">Appointment </span>
                      <b>September 8, 2022 14:00 </b>
                      <span className="text-manrope fw-300 fs-14">
                        Location 2
                      </span>
                    </div>
                  </div>
                  <div className="col-12 pt-5">
                    <div className="row pt-5">
                      <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-12">
                        Subtotal
                      </div>
                      <div className="col-6 pb-3 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                        100.00$
                      </div>
                      <div className="col-6 text-dark-4 text-manrope fw-800 fs-12">
                        TPS
                      </div>
                      <div className="col-6 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                        5.00$
                      </div>
                      <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-12">
                        TVQ
                      </div>
                      <div className="col-6 pb-3 text-dark-4 text-manrope fs-12 d-flex justify-content-end">
                        9.98$
                      </div>
                      <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-14">
                        Total
                      </div>
                      <div className="col-6 pb-3 text-dark-4 text-manrope fw-800 fs-14 d-flex justify-content-end">
                        114.98$
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FinancesIncome;

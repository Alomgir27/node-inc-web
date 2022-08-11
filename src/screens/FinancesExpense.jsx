import React, { useState } from "react";
import AddBtn from "../components/AddBtn";
import SearchInput from "../components/SearchInput";
import MainLayout from "../layouts/MainLayout";

const dummyData = [
  {
    circleColor: "rgba(125, 133, 154, 0.08)",
    invoiceNumber: "AA-23242-3231",
    username: "Napa Pièces D’auto",
    createdAt: "14/04/2020",
    dueOn: "14/05/2020",
    paidDate: "15/APR/2020",
    amount: 200,
    currency: "CAD",
  },
  {
    circleColor: "rgba(125, 133, 154, 0.08)",
    invoiceNumber: "AA-23242-3231",
    username: "Napa Pièces D’auto",
    createdAt: "14/04/2020",
    dueOn: "14/05/2020",
    paidDate: "",
    amount: 200,
    currency: "CAD",
  },
  {
    circleColor: "rgba(125, 133, 154, 0.08)",
    invoiceNumber: "AA-23242-3231",
    username: "Napa Pièces D’auto",
    createdAt: "14/04/2020",
    dueOn: "14/05/2020",
    paidDate: "15/APR/2020",
    amount: 200,
    currency: "CAD",
  },
];
const dummySuppliersData = [
  {
    imgUrl: "./assets/img/suppliers-1.png",
    name: "Napa Pièce Auto",
    phoneNo: "(450) 322-2134",
    contact: "Manon Latulippe",
    poste: 23,
    lastOne: "15/APR/2020",
    balance: 1200,
  },
  {
    imgUrl: "./assets/img/suppliers-1.png",
    name: "Napa Pièce Auto",
    phoneNo: "(450) 322-2134",
    contact: "Manon Latulippe",
    poste: 0,
    lastOne: "",
    balance: 1200,
  },
  {
    imgUrl: "./assets/img/suppliers-1.png",
    name: "Napa Pièce Auto",
    phoneNo: "(450) 322-2134",
    contact: "Manon Latulippe",
    poste: 23,
    lastOne: "15/APR/2020",
    balance: 1200,
  },
  {
    imgUrl: "./assets/img/suppliers-1.png",
    name: "Napa Pièce Auto",
    phoneNo: "(450) 322-2134",
    contact: "Manon Latulippe",
    poste: 23,
    lastOne: "15/APR/2020",
    balance: 1200,
  },
  {
    imgUrl: "./assets/img/suppliers-1.png",
    name: "Napa Pièce Auto",
    phoneNo: "(450) 322-2134",
    contact: "Manon Latulippe",
    poste: 23,
    lastOne: "15/APR/2020",
    balance: 1200,
  },
];
const dummypurchase = [
  {
    name: "CarQuest",
    status: "Processing",
    date: "23/02/2022",
    purchaseNo: "8936746752-23",
    quantity: 2,
    invoice: "FACTURE9872.pdf",
  },
  {
    name: "CarQuest",
    status: "Done",
    date: "23/02/2022",
    processNum: "FHS34324-2",
    purchaseNo: "8936746752-23",
    quantity: 3,
    numOfItems: 1,
    invoice: "FACTURE9871.pdf",
  },
];
const purchases = [
  {
    name: "Rear Brake Pad",
    highPrice: 1495,
    lowPrice: 795,
    chipName: "Parts to sell",
    purchaseNo: "8936746752-23",
    quantity: 2,
    purchaseId: "TPS/TVQ QC - 9,975",
  },
  {
    name: "Rear Brake Pad",
    highPrice: 1495,
    lowPrice: 795,
    chipName: "Parts to sell",
    purchaseNo: "8936746752-23",
    quantity: 2,
    purchaseId: "TPS/TVQ QC - 9,975",
  },
  {
    name: "Rear Brake Pad",
    highPrice: 1495,
    lowPrice: 795,
    chipName: "Parts to sell",
    purchaseNo: "8936746752-23",
    quantity: 2,
    purchaseId: "TPS/TVQ QC - 9,975",
  },
];

const FinancesExpense = () => {
  const [purchaseAddSelected, setPurchaseAddSelected] = useState(false);
  return (
    <MainLayout
      title={"Expenses"}
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
      <div className="finances-invoice-main-content">
        <div className="container-fluid px-0">
          <div className="row pt-5">
            <div className="col-12 col-lg-7">
              <SearchInput
                withFilter
                placeholder="Search supplier, invoice number or amount"
              />
            </div>
            <div className="col-12 col-lg-5 pt-5 pt-lg-0 d-flex justify-content-lg-end align-items-center">
              <AddBtn
                pale
                onClick={() =>
                  setPurchaseAddSelected((prevState) => !prevState)
                }
                className={purchaseAddSelected && "upload-btn"}
                title={purchaseAddSelected ? "UPLOAD" : "New"}
              />
              <button className="ms-2 ms-sm-4 btn btn-emboss">
                or New from scratch
              </button>
            </div>
          </div>
          {!purchaseAddSelected ? (
            <>
              <div className="table-wrapper short-vertical-scrollbar">
                <div className="table px-3">
                  <div className="container-fluid px-0 mt-3">
                    <div className="row table-heading gx-0">
                      <div className="col-1"></div>
                      <div className="col-3">
                        <div className="label">Name</div>
                      </div>
                      <div className="col-3">
                        <div className="label">Dates</div>
                      </div>
                      <div className="col-2">
                        <div className="label">Payment Status</div>
                      </div>
                      <div className="col-1 text-end">
                        <div className="label">Amount</div>
                      </div>
                    </div>
                  </div>
                  {dummyData.map((data, idx) => {
                    return (
                      <div
                        key={"li" + idx}
                        className="row align-items-center emboss-row mb-4 py-2 gx-0 dummy-data"
                      >
                        <div className="col-1 d-flex justify-content-center align-items-center">
                          <div
                            className="circle"
                            style={{ backgroundColor: data.circleColor }}
                          ></div>
                        </div>
                        <div className="col-3 d-flex flex-column gap-1">
                          <div className="invoice-number">
                            {data.invoiceNumber}
                          </div>
                          <div className="username">{data.username}</div>
                        </div>
                        <div className="col-3 d-flex flex-column gap-1">
                          <div className="created-at">
                            Created: {data.createdAt}
                          </div>
                          <div className="due-on">Due On: {data.dueOn}</div>
                        </div>
                        <div className="col-2 d-flex flex-column gap-1">
                          <div
                            className={`chip ${data.paidDate ? "" : "unpaid"}`}
                          >
                            <div className="chip-circle"></div>
                            <div className="chip-text">
                              {data.paidDate ? "Paid" : "Unpaid"}
                            </div>
                          </div>
                          <div className="paid-date">
                            {data.paidDate ? `Paid on ${data.paidDate}` : " "}
                          </div>
                        </div>
                        <div className="col-1 d-flex flex-column gap-1 text-end">
                          <div className="amount">{data.amount}$</div>
                          <div className="currency">{data.currency}</div>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center gap-3 pe-2 more-menu">
                          <img
                            src="./assets/vectors/vertical-menu.svg"
                            alt="menu"
                          />
                          Open
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="table-wrapper mt-5 short-vetical-scrollbar expense-add">
                <div className="table" style={{ minWidth: 900 }}>
                  <div className="container-fluid py-3">
                    {dummypurchase.map((data, idx) => {
                      return (
                        <div
                          className="row emboss-row py-3 mb-3 custom-border-bottom"
                          key={"dummypurchase" + idx}
                        >
                          <div className="col-2 d-flex align-items-center">
                            <div className="text-poppins text-dark-3 fs-14 fw-600 ps-3">
                              {data.name}
                            </div>
                          </div>
                          <div className="col-1">
                            <div className="text-dark-3 text-manrope fs-12">
                              {data.status}
                            </div>
                          </div>
                          <div className="col-1">
                            <div className="text-dark-3 text-manrope fs-12">
                              {data.date}
                            </div>
                          </div>
                          <div className="col-2 ps-5">
                            <div className="text-dark-3 text-manrope fs-12">
                              {data.purchaseNo}
                            </div>
                          </div>
                          <div className="col-2">
                            <div className="text-dark-3 text-manrope fs-12">
                              Number of items: {data.numOfItems || "-"}
                            </div>
                          </div>
                          <div className="col-2">
                            <div className="text-dark-3 text-manrope fs-12">
                              {data.invoice}
                            </div>
                          </div>
                          <div className="col-1"></div>
                          <div className="col-1">
                            <div className="text-blue d-flex text-inter fw-500 fs-12">
                              Open
                              <img
                                className="ms-4"
                                src="./assets/vectors/vertical-menu.svg"
                                alt="menu"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="table-wrapper short-vertical-scrollbar">
                <div className="table" style={{ minWidth: 900 }}>
                  <div className="main-sec">
                    <div className="head-sec">
                      <div className="row gx-0 px-4">
                        <div className="col-11">
                          <div className="row gx-0 px-0">
                            <div className="col-3 custom-border-bottom d-flex flex-column gap-2">
                              <div className="text-light-5 text-manrope fs-14">
                                Supplier
                              </div>
                              <div className="text-dark-3 text-poppins fs-14 fw-700">
                                CarQuest
                              </div>
                            </div>
                            <div className="col-2 custom-border-bottom d-flex flex-column gap-2">
                              <div className="text-light-5 text-manrope fs-14">
                                Date
                              </div>
                              <div className="text-dark-3 text-poppins fs-14 fw-700">
                                02-11-2022
                              </div>
                            </div>
                            <div className="col-2 ps-3 custom-border-bottom d-flex flex-column gap-2">
                              <div className="text-light-5 text-manrope fs-14">
                                Refrence Number
                              </div>
                              <div className="text-dark-3 text-poppins fs-14 fw-700">
                                877346234
                              </div>
                            </div>
                            <div className="col-2 custom-border-bottom d-flex flex-column gap-2">
                              <div className="text-light-5 text-manrope fs-14">
                                Terms (days)
                              </div>
                              <div className="text-dark-3 text-poppins fs-14 fw-700">
                                14
                              </div>
                            </div>
                            <div className="col-2 custom-border-bottom d-flex flex-column gap-2">
                              <div className="text-light-5 text-manrope fs-14">
                                Payment Source
                              </div>
                              <div className="text-dark-3 text-poppins fs-14 fw-700">
                                Banking **7362
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1 d-flex flex-column gap-2">
                          <div className="text-light-5 text-manrope fs-14">
                            Invoice
                          </div>
                          <div className="fs-16 text-underline fw-500">
                            34253135.pdf
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid pt-5 px-4">
                      <div className="row px-4">
                        <div className="col-11">
                          {purchases.map((data, idx) => {
                            return (
                              <div
                                className="row px-0 py-3 gx-0 align-items-center custom-border-bottom"
                                key={"purchase" + idx}
                              >
                                <div className="col-3">
                                  <div className="text-dark-3 fs-14 fw-800 text-poppins">
                                    {data.name}
                                  </div>
                                </div>
                                <div className="col-1">
                                  <div className="text-dark-3 text-manrope fs-12">
                                    {data.highPrice}$
                                  </div>
                                </div>
                                <div className="col-1">
                                  <div className="text-dark-3 text-manrope fs-12">
                                    {data.lowPrice}$
                                  </div>
                                </div>
                                <div className="col-1 d-flex justify-content-end pe-4 chip-text-container">
                                  <div className="chip">
                                    <div className="chip-text text-blue me-2">
                                      {data.chipName}
                                    </div>
                                    <img
                                      src="./assets/vectors/chip-close-blue.svg"
                                      alt="close"
                                    />
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="text-dark-3 text-manrope fs-12">
                                    {data.purchaseNo}
                                  </div>
                                </div>
                                <div className="col-1">
                                  <div className="text-dark-3 text-manrope fs-12">
                                    Qt. {data.quantity}
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="text-dark-3 text-manrope fs-12">
                                    {data.purchaseId}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="col-1 d-flex align-items-center">
                          <img src="./assets/img/invoice.png" alt="invoice" />
                        </div>
                      </div>
                      <div className="row py-4 px-0 gx-0">
                        <div className="col-11">
                          <div className="row px-0 gx-0">
                            <div className="col-3">
                              <AddBtn blue small />
                            </div>
                            <div className="col-1">
                              <div className="text-dark-3 text-manrope fw-800 fs-12">
                                53,45$
                              </div>
                            </div>
                            <div className="col-1">
                              <div className="text-dark-3 text-manrope fw-800 fs-12">
                                23,45$
                              </div>
                            </div>
                            <div className="d-flex justify-content-between mt-5 gap-3">
                              <button className={`btn btn-emboss`}>
                                Add &amp; Pay Later
                              </button>
                              <button
                                onClick={() => setPurchaseAddSelected(false)}
                                className={`btn btn-gradient`}
                              >
                                Add Payment adsf
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FinancesExpense;

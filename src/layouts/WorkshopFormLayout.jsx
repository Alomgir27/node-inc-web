import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ModalNode from "../modals/ModalNode";

import MainLayout from "../layouts/MainLayout";

const WorkshopFormLayout = ({ children }) => {
  const [nodeOpenState, setNodeOpenState] = useState(false);

  const modalOpenHandler = (func) => {
    func(true);
  };

  const modalCloseHandler = (func) => {
    func(false);
  };

  return (
    <MainLayout
      headVector="./assets/vectors/workshop.svg"
      title="workshop"
      subLg
    >
      <ModalNode
        isOpen={nodeOpenState}
        modalCloseHandler={() => modalCloseHandler(setNodeOpenState)}
      />
      <div id="workshop-forms-main-content">
        <div className="container-fluid px-0">
          <div className="row gy-5">
            <div className="col-xxl-8 col-lg-7">
              <div className="wrap">{children}</div>
            </div>
            <div className="col-xxl-4 col-lg-5">
              <div className="card bordered">
                <h3 className="section-title mb-5">Details</h3>

                <div className="details-main">
                  <div className="item">
                    <div
                      className="c-pointer img"
                      onClick={() => modalOpenHandler(setNodeOpenState)}
                    >
                      <img src="./assets/vectors/details-img.svg" alt="img" />
                    </div>
                    <div className="text">
                      <div className="line">
                        <div className="fw-600">Front Brake Change</div>
                        <h4 className="sub-title">87.00$</h4>
                      </div>
                      <div className="line">
                        <div className="sub-title text-light-5 fs-12">
                          Front Brake Change
                        </div>
                        <div className="fw-600 text-blue">x1</div>
                      </div>
                      <h5 className="mt-3 sub-title fw-500 text-blue mb-1">
                        Front brake change with original parts
                      </h5>
                      <div className="line">
                        <div className="radio-container">
                          <label className="custom-radio">
                            Front Pad X2
                            <input
                              defaultChecked={true}
                              type="checkbox"
                              name="gender"
                              defaultValue={"checked"}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <h5 className="sub-title">40.00$</h5>
                      </div>
                      <div className="line">
                        <div className="radio-container">
                          <label className="custom-radio">
                            Labor X1
                            <input
                              defaultChecked={true}
                              type="checkbox"
                              name="gender"
                              defaultValue={"checked"}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <h5 className="sub-title">47.00$</h5>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="c-pointer img"
                      onClick={() => modalOpenHandler(setNodeOpenState)}
                    >
                      <img src="./assets/vectors/details-img.svg" alt="img" />
                    </div>
                    <div className="text">
                      <div className="line">
                        <div className="fw-600">Oil - (1L) 5W30 Syn.</div>
                        <h4 className="sub-title">5.49$</h4>
                      </div>
                      <div className="line">
                        <div className="sub-title text-light-5 fs-12">
                          5W30-23
                        </div>
                        <div className="fw-600 text-blue">x2</div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div
                      className="c-pointer img"
                      onClick={() => modalOpenHandler(setNodeOpenState)}
                    >
                      <img src="./assets/vectors/details-img.svg" alt="img" />
                    </div>
                    <div className="text">
                      <div className="line">
                        <div className="fw-600">7C Battery</div>
                        <h4 className="sub-title">2.00$</h4>
                      </div>
                      <div className="line">
                        <div className="sub-title text-light-5 fs-12">
                          B-7C-9762
                        </div>
                        <div className="fw-600 text-blue">x1</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-foot">
                  <div className="col-12">
                    <div className="row px-3 pt-4">
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
        </div>
      </div>
    </MainLayout>
  );
};

export default WorkshopFormLayout;

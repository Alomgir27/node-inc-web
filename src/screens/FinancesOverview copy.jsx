import React from "react";
// import { Line } from 'react-chartjs-2';
// import { NavLink } from 'react-router-dom';
import ExploreNavItemWithIcon from "../components/ExploreNavItemWithIcon";
import MainLayout from "../layouts/MainLayout";

const FinancesOverview = () => {
  return (
    <MainLayout
      headVector="./assets/vectors/wallet.svg"
      sideNavVector="./assets/vectors/sidenav-right-2.svg"
      title={"wallet"}
    >
      <div id="finances-overview" className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-12">
                <div className="overview-chart">
                  <div className="row gx-2">
                    <div className="col-6">
                      <div className="overview-title">Overview Chart</div>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center gap-3 pt-3">
                      <div className="text-dark-3 text-poppins text-bold fs-14 year-overview">
                        Year
                      </div>
                      <div className="text-light-5 text-manrope fs-14 month-overview">
                        Month
                      </div>
                      <div className="d-flex justify-content-center align-items center calendar-icon">
                        <img src="./assets/vectors/calendar.svg" alt="" />
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-start px-4 mx-2 py-3">
                      <div className="profit-loss-overview">
                        <div className="text-poppins text-bold fs-26 text-blue">
                          + 1000$
                        </div>
                        <div className="text-manrope text-dark-3 text-bold fs-12">
                          Profit/Loss
                        </div>
                      </div>
                    </div>
                  </div>
                  <svg
                    width="100%"
                    height="157"
                    viewBox="0 0 572 157"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M634.02 74.3466C634.02 74.3466 598.851 102.854 580.097 91.356C561.342 79.8581 555.632 43.1708 504.32 43.1708C453.008 43.1708 383.049 115.485 342.91 115.485C302.771 115.485 261.006 45.9669 201.192 80.4945C141.378 115.022 152.528 137.309 105.03 137.309C57.5326 137.309 16.1857 0.360895 -37.6721 1.02136C-77.8297 1.02136 -93.2441 131.037 -106.633 151.208C-120.022 171.379 -157.434 115.485 -223.543 115.485C-281.893 115.485 -337.228 7.87191 -393.882 7.87191C-450.537 7.87191 -473.552 121.993 -523.814 121.993C-574.076 121.993 -573.332 80.4945 -613.267 80.4945"
                      stroke="#4ACBD3"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="row py-3">
                    <div className="col-4 d-flex justify-content-center align-items-center">
                      <div className="d-flex flex-column align-items-end">
                        <div className="text-poppins text-dark-3 fs-22">
                          342$
                        </div>
                        <div className="text-manrope text-light-5 fs-10">
                          Sales
                        </div>
                      </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center">
                      <div className="d-flex flex-column align-items-end">
                        <div className="text-poppins text-dark-3 fs-22">
                          200$
                        </div>
                        <div className="text-manrope text-light-5 fs-10">
                          Spendings
                        </div>
                      </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center">
                      <div className="d-flex flex-column align-items-end">
                        <div className="text-poppins text-dark-3 fs-22">
                          143$
                        </div>
                        <div className="text-manrope text-light-5 fs-10">
                          Income
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-grid">
              <div className="p-4 d-flex flex-column align-items-start justify-content-center gap-2 quick-report">
                <div className="text-dark-3 text-manrope fw-800 fs-18 pb-3">
                  Quick Reports
                </div>
                <div className="text-poppins fs-12 text-dark-3">
                  Transactions of the day Transactions of the month Suppliers
                  who must be paid Receivable invoices from Clients
                </div>
              </div>
              <div className="p-4 d-flex flex-column align-items-center text-center justify-content-center gap-2 average">
                <div className="text-manrope fw-800 fs-18">
                  Average customer value
                </div>
                <div className="text-manrope fw-600 fs-34">2389.64$</div>
              </div>
              <div className="p-4 d-flex flex-column align-items-center text-center justify-content-center gap-2 upcomming">
                <div className="text-manrope fs-18 fw-800">
                  Upcoming CC funds
                </div>
                <div className="text-poppins fw-600 fs-34 ">10283.64$</div>
                <div>
                  <div className="text-poppins fs-8 ">In your account by</div>
                  <div className="text-poppins fs-12">February 02, 2022</div>
                </div>
              </div>
              <div className="p-4 d-flex flex-column align-items-center text-center justify-content-center gap-2 refund">
                <div className="text-manrope fs-18 fw-800">
                  CC Refund to be made
                </div>
                <div className="text-poppins fs-34 fw-600">872.12$</div>
                <div>
                  <div className="text-poppins fs-8">Payment by</div>
                  <div className="text-poppins fs-13">February 05, 2022</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row gy-4">
              <div className="col-12">
                <div className="row mt-3">
                  <div className="col-6 text-manrope text-dark-3 fs-18 text-bold">
                    Incomes <br /> Breakdown
                  </div>
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <div className="text-light-5 text-manrope fs-14 month-overview">
                      September
                    </div>
                    <div className="d-flex justify-content-center align-items center calendar-icon">
                      <img src="./assets/vectors/calendar.svg" alt="" />
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center align-items-center position-relative">
                    <div className="total-price">5102$</div>
                    <svg
                      width="278"
                      height="239"
                      viewBox="0 0 278 239"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_29033_4215)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M137.809 201.082C192.803 201.082 237.741 156.145 237.741 101.15C237.741 45.2786 192.803 0.341232 137.809 0.341232C81.9373 0.341232 37 45.2786 37 101.15C37 156.145 81.9373 201.082 137.809 201.082Z"
                          fill="#4B40D1"
                        />
                        <mask
                          id="mask0_29033_4215"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="37"
                          y="0"
                          width="201"
                          height="202"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M137.809 201.082C192.803 201.082 237.741 156.145 237.741 101.15C237.741 45.2786 192.803 0.341232 137.809 0.341232C81.9373 0.341232 37 45.2786 37 101.15C37 156.145 81.9373 201.082 137.809 201.082Z"
                            fill="white"
                          />
                        </mask>
                        <g mask="url(#mask0_29033_4215)"></g>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M161.857 63.1003L134.629 99.474L28.2209 75.6423C21.892 103.309 26.3121 133.348 42.9452 158.96C50.5964 170.742 60.1544 180.544 70.9566 188.227C71.5656 188.66 72.1785 189.087 72.7953 189.506L140.919 99.0443C140.919 99.0443 149.72 82.5732 161.857 63.1003Z"
                          fill="#4ACBD3"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M76.555 182.606C109.425 207.415 155.83 210.28 192.628 186.383C239.525 155.928 253.06 93.5396 222.859 47.0345C216.148 36.7004 207.842 28.0202 198.467 21.1034L137.91 102.291L76.555 182.606Z"
                          fill="#1E55A9"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M114 199.39C121.84 201.318 130.045 202.341 138.499 202.341C193.807 202.341 239 157.122 239 101.782C239 45.5605 193.807 0.341232 138.499 0.341232C137.974 0.341232 137.451 0.345174 136.928 0.353029L138.499 101.341L114 199.39Z"
                          fill="#ECA0A0"
                        />
                        <path
                          d="M45.245 132.046V133.341H39.645V132.046H41.696V126.145C41.696 125.912 41.703 125.672 41.717 125.424L40.261 126.642C40.177 126.708 40.093 126.75 40.009 126.768C39.9297 126.782 39.8527 126.782 39.778 126.768C39.708 126.754 39.645 126.731 39.589 126.698C39.533 126.661 39.491 126.621 39.463 126.579L38.917 125.83L42.004 123.205H43.425V132.046H45.245ZM49.7751 126.894L49.4251 127.328C49.6211 127.23 49.8311 127.156 50.0551 127.104C50.2838 127.048 50.5288 127.02 50.7901 127.02C51.1728 127.02 51.5438 127.083 51.9031 127.209C52.2671 127.335 52.5868 127.527 52.8621 127.783C53.1374 128.035 53.3591 128.35 53.5271 128.728C53.6951 129.106 53.7791 129.547 53.7791 130.051C53.7791 130.523 53.6928 130.966 53.5201 131.381C53.3474 131.792 53.1048 132.151 52.7921 132.459C52.4794 132.767 52.1014 133.01 51.6581 133.187C51.2194 133.365 50.7341 133.453 50.2021 133.453C49.6608 133.453 49.1754 133.367 48.7461 133.194C48.3168 133.022 47.9504 132.781 47.6471 132.473C47.3438 132.161 47.1104 131.787 46.9471 131.353C46.7884 130.915 46.7091 130.429 46.7091 129.897C46.7091 129.421 46.8048 128.934 46.9961 128.434C47.1921 127.93 47.4931 127.408 47.8991 126.866L50.3141 123.625C50.3981 123.513 50.5194 123.418 50.6781 123.338C50.8414 123.259 51.0281 123.219 51.2381 123.219H52.7781L49.7751 126.894ZM50.1671 132.039C50.4424 132.039 50.6944 131.993 50.9231 131.899C51.1564 131.806 51.3548 131.675 51.5181 131.507C51.6861 131.339 51.8168 131.143 51.9101 130.919C52.0034 130.691 52.0501 130.443 52.0501 130.177C52.0501 129.888 52.0058 129.629 51.9171 129.4C51.8284 129.167 51.7024 128.971 51.5391 128.812C51.3758 128.649 51.1798 128.525 50.9511 128.441C50.7224 128.357 50.4704 128.315 50.1951 128.315C49.9198 128.315 49.6701 128.362 49.4461 128.455C49.2221 128.549 49.0308 128.679 48.8721 128.847C48.7134 129.011 48.5898 129.207 48.5011 129.435C48.4124 129.659 48.3681 129.902 48.3681 130.163C48.3681 130.443 48.4054 130.7 48.4801 130.933C48.5594 131.162 48.6738 131.358 48.8231 131.521C48.9771 131.685 49.1661 131.813 49.3901 131.906C49.6141 131.995 49.8731 132.039 50.1671 132.039ZM59.4572 125.669C59.4572 126.052 59.3919 126.397 59.2612 126.705C59.1352 127.013 58.9649 127.277 58.7502 127.496C58.5355 127.711 58.2859 127.877 58.0012 127.993C57.7165 128.11 57.4202 128.168 57.1122 128.168C56.7762 128.168 56.4659 128.11 56.1812 127.993C55.8965 127.877 55.6492 127.711 55.4392 127.496C55.2339 127.277 55.0729 127.013 54.9562 126.705C54.8395 126.397 54.7812 126.052 54.7812 125.669C54.7812 125.277 54.8395 124.923 54.9562 124.605C55.0729 124.288 55.2339 124.02 55.4392 123.8C55.6492 123.581 55.8965 123.413 56.1812 123.296C56.4659 123.175 56.7762 123.114 57.1122 123.114C57.4482 123.114 57.7585 123.175 58.0432 123.296C58.3325 123.413 58.5822 123.581 58.7922 123.8C59.0022 124.02 59.1655 124.288 59.2822 124.605C59.3989 124.923 59.4572 125.277 59.4572 125.669ZM58.1272 125.669C58.1272 125.399 58.0992 125.172 58.0432 124.99C57.9919 124.808 57.9195 124.661 57.8262 124.549C57.7375 124.437 57.6302 124.358 57.5042 124.311C57.3829 124.26 57.2522 124.234 57.1122 124.234C56.9722 124.234 56.8415 124.26 56.7202 124.311C56.5989 124.358 56.4939 124.437 56.4052 124.549C56.3212 124.661 56.2535 124.808 56.2022 124.99C56.1509 125.172 56.1252 125.399 56.1252 125.669C56.1252 125.931 56.1509 126.15 56.2022 126.327C56.2535 126.5 56.3212 126.64 56.4052 126.747C56.4939 126.855 56.5989 126.932 56.7202 126.978C56.8415 127.025 56.9722 127.048 57.1122 127.048C57.2522 127.048 57.3829 127.025 57.5042 126.978C57.6302 126.932 57.7375 126.855 57.8262 126.747C57.9195 126.64 57.9919 126.5 58.0432 126.327C58.0992 126.15 58.1272 125.931 58.1272 125.669ZM62.8242 123.492C62.8849 123.422 62.9549 123.359 63.0342 123.303C63.1182 123.247 63.2349 123.219 63.3842 123.219H64.6442L57.1262 133.082C57.0655 133.157 56.9932 133.22 56.9092 133.271C56.8252 133.318 56.7225 133.341 56.6012 133.341H55.3132L62.8242 123.492ZM65.1762 130.961C65.1762 131.344 65.1109 131.689 64.9802 131.997C64.8542 132.305 64.6839 132.569 64.4692 132.788C64.2545 133.003 64.0049 133.171 63.7202 133.292C63.4355 133.409 63.1392 133.467 62.8312 133.467C62.4952 133.467 62.1849 133.409 61.9002 133.292C61.6155 133.171 61.3682 133.003 61.1582 132.788C60.9529 132.569 60.7919 132.305 60.6752 131.997C60.5585 131.689 60.5002 131.344 60.5002 130.961C60.5002 130.569 60.5585 130.215 60.6752 129.897C60.7919 129.58 60.9529 129.312 61.1582 129.092C61.3682 128.873 61.6155 128.705 61.9002 128.588C62.1849 128.467 62.4952 128.406 62.8312 128.406C63.1672 128.406 63.4775 128.467 63.7622 128.588C64.0515 128.705 64.2989 128.873 64.5042 129.092C64.7142 129.312 64.8775 129.58 64.9942 129.897C65.1155 130.215 65.1762 130.569 65.1762 130.961ZM63.8392 130.961C63.8392 130.691 63.8135 130.464 63.7622 130.282C63.7109 130.1 63.6385 129.953 63.5452 129.841C63.4565 129.729 63.3492 129.65 63.2232 129.603C63.1019 129.552 62.9712 129.526 62.8312 129.526C62.6912 129.526 62.5605 129.552 62.4392 129.603C62.3179 129.65 62.2129 129.729 62.1242 129.841C62.0355 129.953 61.9655 130.1 61.9142 130.282C61.8675 130.464 61.8442 130.691 61.8442 130.961C61.8442 131.223 61.8675 131.442 61.9142 131.619C61.9655 131.797 62.0355 131.939 62.1242 132.046C62.2129 132.154 62.3179 132.231 62.4392 132.277C62.5605 132.324 62.6912 132.347 62.8312 132.347C62.9712 132.347 63.1019 132.324 63.2232 132.277C63.3492 132.231 63.4565 132.154 63.5452 132.046C63.6385 131.939 63.7109 131.797 63.7622 131.619C63.8135 131.442 63.8392 131.223 63.8392 130.961Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M138 171.341C176.66 171.341 208 140.001 208 101.341C208 62.6813 176.66 31.3412 138 31.3412C99.3401 31.3412 68 62.6813 68 101.341C68 140.001 99.3401 171.341 138 171.341Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_29033_4215">
                          <rect
                            width="278"
                            height="238"
                            fill="white"
                            transform="translate(0 0.341232)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="row gx-5 gy-3 mt-0">
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div
                          style={{ borderColor: "#4ACBD3" }}
                          className="circle"
                        ></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Labor
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div
                          style={{ borderColor: "#ECA0A0" }}
                          className="circle"
                        ></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Services
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div
                          style={{ borderColor: "#1E55A9" }}
                          className="circle"
                        ></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Services
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div
                          style={{ borderColor: "#1E55A9" }}
                          className="circle"
                        ></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Accessories
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6 text-manrope text-dark-3 fs-18 text-bold">
                    Incomes <br /> Breakdown
                  </div>
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <div className="text-light-5 text-manrope fs-14 month-overview">
                      September
                    </div>
                    <div className="d-flex justify-content-center align-items center calendar-icon">
                      <img src="./assets/vectors/calendar.svg" alt="" />
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center align-items-center position-relative">
                    <div className="total-price">4102$</div>
                    <svg
                      width="278"
                      height="239"
                      viewBox="0 0 278 239"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_29033_4170)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M137.809 201.082C192.803 201.082 237.741 156.145 237.741 101.15C237.741 45.2786 192.803 0.341248 137.809 0.341248C81.9373 0.341248 37 45.2786 37 101.15C37 156.145 81.9373 201.082 137.809 201.082Z"
                          fill="#4ACBD3"
                        />
                        <mask
                          id="mask0_29033_4170"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="37"
                          y="0"
                          width="201"
                          height="202"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M137.809 201.082C192.803 201.082 237.741 156.145 237.741 101.15C237.741 45.2786 192.803 0.341248 137.809 0.341248C81.9373 0.341248 37 45.2786 37 101.15C37 156.145 81.9373 201.082 137.809 201.082Z"
                            fill="white"
                          />
                        </mask>
                        <g mask="url(#mask0_29033_4170)"></g>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M161.857 63.1003L134.629 99.474L28.2209 75.6423C21.892 103.309 26.3121 133.348 42.9452 158.96C50.5964 170.742 60.1544 180.544 70.9566 188.227C71.5656 188.66 72.1785 189.087 72.7953 189.506L140.919 99.0443C140.919 99.0443 149.72 82.5732 161.857 63.1003Z"
                          fill="#3E4244"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M76.555 182.606C109.425 207.415 155.83 210.28 192.628 186.383C239.525 155.928 253.06 93.5396 222.859 47.0345C216.148 36.7004 207.842 28.0203 198.467 21.1034L137.91 102.291L76.555 182.606Z"
                          fill="#1E55A9"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M114 199.39C121.84 201.318 130.045 202.341 138.499 202.341C193.807 202.341 239 157.122 239 101.782C239 45.5605 193.807 0.341248 138.499 0.341248C137.974 0.341248 137.451 0.345189 136.928 0.353044L138.499 101.341L114 199.39Z"
                          fill="#1E55A9"
                        />
                        <path
                          d="M45.245 132.046V133.341H39.645V132.046H41.696V126.145C41.696 125.912 41.703 125.672 41.717 125.424L40.261 126.642C40.177 126.708 40.093 126.75 40.009 126.768C39.9297 126.782 39.8527 126.782 39.778 126.768C39.708 126.754 39.645 126.731 39.589 126.698C39.533 126.661 39.491 126.621 39.463 126.579L38.917 125.83L42.004 123.205H43.425V132.046H45.245ZM49.7751 126.894L49.4251 127.328C49.6211 127.23 49.8311 127.156 50.0551 127.104C50.2838 127.048 50.5288 127.02 50.7901 127.02C51.1728 127.02 51.5438 127.083 51.9031 127.209C52.2671 127.335 52.5868 127.527 52.8621 127.783C53.1374 128.035 53.3591 128.35 53.5271 128.728C53.6951 129.106 53.7791 129.547 53.7791 130.051C53.7791 130.523 53.6928 130.966 53.5201 131.381C53.3474 131.792 53.1048 132.151 52.7921 132.459C52.4794 132.767 52.1014 133.01 51.6581 133.187C51.2194 133.365 50.7341 133.453 50.2021 133.453C49.6608 133.453 49.1754 133.367 48.7461 133.194C48.3168 133.022 47.9504 132.781 47.6471 132.473C47.3438 132.161 47.1104 131.787 46.9471 131.353C46.7884 130.915 46.7091 130.429 46.7091 129.897C46.7091 129.421 46.8048 128.934 46.9961 128.434C47.1921 127.93 47.4931 127.408 47.8991 126.866L50.3141 123.625C50.3981 123.513 50.5194 123.418 50.6781 123.338C50.8414 123.259 51.0281 123.219 51.2381 123.219H52.7781L49.7751 126.894ZM50.1671 132.039C50.4424 132.039 50.6944 131.993 50.9231 131.899C51.1564 131.806 51.3548 131.675 51.5181 131.507C51.6861 131.339 51.8168 131.143 51.9101 130.919C52.0034 130.691 52.0501 130.443 52.0501 130.177C52.0501 129.888 52.0058 129.629 51.9171 129.4C51.8284 129.167 51.7024 128.971 51.5391 128.812C51.3758 128.649 51.1798 128.525 50.9511 128.441C50.7224 128.357 50.4704 128.315 50.1951 128.315C49.9198 128.315 49.6701 128.362 49.4461 128.455C49.2221 128.549 49.0308 128.679 48.8721 128.847C48.7134 129.011 48.5898 129.207 48.5011 129.435C48.4124 129.659 48.3681 129.902 48.3681 130.163C48.3681 130.443 48.4054 130.7 48.4801 130.933C48.5594 131.162 48.6738 131.358 48.8231 131.521C48.9771 131.685 49.1661 131.813 49.3901 131.906C49.6141 131.995 49.8731 132.039 50.1671 132.039ZM59.4572 125.669C59.4572 126.052 59.3919 126.397 59.2612 126.705C59.1352 127.013 58.9649 127.277 58.7502 127.496C58.5355 127.711 58.2859 127.877 58.0012 127.993C57.7165 128.11 57.4202 128.168 57.1122 128.168C56.7762 128.168 56.4659 128.11 56.1812 127.993C55.8965 127.877 55.6492 127.711 55.4392 127.496C55.2339 127.277 55.0729 127.013 54.9562 126.705C54.8395 126.397 54.7812 126.052 54.7812 125.669C54.7812 125.277 54.8395 124.923 54.9562 124.605C55.0729 124.288 55.2339 124.02 55.4392 123.8C55.6492 123.581 55.8965 123.413 56.1812 123.296C56.4659 123.175 56.7762 123.114 57.1122 123.114C57.4482 123.114 57.7585 123.175 58.0432 123.296C58.3325 123.413 58.5822 123.581 58.7922 123.8C59.0022 124.02 59.1655 124.288 59.2822 124.605C59.3989 124.923 59.4572 125.277 59.4572 125.669ZM58.1272 125.669C58.1272 125.399 58.0992 125.172 58.0432 124.99C57.9919 124.808 57.9195 124.661 57.8262 124.549C57.7375 124.437 57.6302 124.358 57.5042 124.311C57.3829 124.26 57.2522 124.234 57.1122 124.234C56.9722 124.234 56.8415 124.26 56.7202 124.311C56.5989 124.358 56.4939 124.437 56.4052 124.549C56.3212 124.661 56.2535 124.808 56.2022 124.99C56.1509 125.172 56.1252 125.399 56.1252 125.669C56.1252 125.931 56.1509 126.15 56.2022 126.327C56.2535 126.5 56.3212 126.64 56.4052 126.747C56.4939 126.855 56.5989 126.932 56.7202 126.978C56.8415 127.025 56.9722 127.048 57.1122 127.048C57.2522 127.048 57.3829 127.025 57.5042 126.978C57.6302 126.932 57.7375 126.855 57.8262 126.747C57.9195 126.64 57.9919 126.5 58.0432 126.327C58.0992 126.15 58.1272 125.931 58.1272 125.669ZM62.8242 123.492C62.8849 123.422 62.9549 123.359 63.0342 123.303C63.1182 123.247 63.2349 123.219 63.3842 123.219H64.6442L57.1262 133.082C57.0655 133.157 56.9932 133.22 56.9092 133.271C56.8252 133.318 56.7225 133.341 56.6012 133.341H55.3132L62.8242 123.492ZM65.1762 130.961C65.1762 131.344 65.1109 131.689 64.9802 131.997C64.8542 132.305 64.6839 132.569 64.4692 132.788C64.2545 133.003 64.0049 133.171 63.7202 133.292C63.4355 133.409 63.1392 133.467 62.8312 133.467C62.4952 133.467 62.1849 133.409 61.9002 133.292C61.6155 133.171 61.3682 133.003 61.1582 132.788C60.9529 132.569 60.7919 132.305 60.6752 131.997C60.5585 131.689 60.5002 131.344 60.5002 130.961C60.5002 130.569 60.5585 130.215 60.6752 129.897C60.7919 129.58 60.9529 129.312 61.1582 129.092C61.3682 128.873 61.6155 128.705 61.9002 128.588C62.1849 128.467 62.4952 128.406 62.8312 128.406C63.1672 128.406 63.4775 128.467 63.7622 128.588C64.0515 128.705 64.2989 128.873 64.5042 129.092C64.7142 129.312 64.8775 129.58 64.9942 129.897C65.1155 130.215 65.1762 130.569 65.1762 130.961ZM63.8392 130.961C63.8392 130.691 63.8135 130.464 63.7622 130.282C63.7109 130.1 63.6385 129.953 63.5452 129.841C63.4565 129.729 63.3492 129.65 63.2232 129.603C63.1019 129.552 62.9712 129.526 62.8312 129.526C62.6912 129.526 62.5605 129.552 62.4392 129.603C62.3179 129.65 62.2129 129.729 62.1242 129.841C62.0355 129.953 61.9655 130.1 61.9142 130.282C61.8675 130.464 61.8442 130.691 61.8442 130.961C61.8442 131.223 61.8675 131.442 61.9142 131.619C61.9655 131.797 62.0355 131.939 62.1242 132.046C62.2129 132.154 62.3179 132.231 62.4392 132.277C62.5605 132.324 62.6912 132.347 62.8312 132.347C62.9712 132.347 63.1019 132.324 63.2232 132.277C63.3492 132.231 63.4565 132.154 63.5452 132.046C63.6385 131.939 63.7109 131.797 63.7622 131.619C63.8135 131.442 63.8392 131.223 63.8392 130.961Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M138 171.341C176.66 171.341 208 140.001 208 101.341C208 62.6813 176.66 31.3412 138 31.3412C99.3401 31.3412 68 62.6813 68 101.341C68 140.001 99.3401 171.341 138 171.341Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_29033_4170">
                          <rect
                            width="278"
                            height="238"
                            fill="white"
                            transform="translate(0 0.341248)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="row gx-5 gy-3 mt-0">
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="circle"></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Office supplies
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div
                          style={{ borderColor: "#1E55A9" }}
                          className="circle"
                        ></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Parts
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div
                          style={{ borderColor: "#1E55A9" }}
                          className="circle"
                        ></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Services
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-between align-items center">
                      <div className="d-flex gap-3 align-items-center">
                        <div
                          style={{ borderColor: "#4ACBD3" }}
                          className="circle"
                        ></div>
                        <div className="text-manrope text-dark-3 fs-14">
                          Accessories
                        </div>
                      </div>
                      <div className="text-manrope text-dark-3 fs-14 fw-800">
                        200$
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

export default FinancesOverview;

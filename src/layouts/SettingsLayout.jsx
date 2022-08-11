import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import TabContentItem from "../components/TabContentItem";
import TabContents from "../components/TabContents";

import MainLayout from "../layouts/MainLayout";

const SettingsLayout = ({ children }) => {
  const location = useLocation();
  return (
    <MainLayout
      title="Settings"
      titleClassName="ms-2"
      tabData={{
        tabLinks: true,
        img: true,
        tabGroupName: "settings-tabs",
        data: [
          {
            icon: "./assets/vectors/settings-profile.svg",
            iconActive: "./assets/vectors/settings-profile-active.svg",
            // target: "profile",
            to: "/settings",
            // active: true,
            // active: location.pathname === "/settings",
          },
          {
            icon: "./assets/vectors/settings-bank.svg",
            iconActive: "./assets/vectors/settings-bank-active.svg",
            // target: "bank",
            to: "/business-settings",
          },
        ],
      }}
    >
      <div id="settings-main-content" className="mt-4 mt-sm-0">
        <div className="container-fluid right">
          <div className="row">
            <div className="col-lg-8">
              {/* <div className="emboss-white br-16"> */}
              {children}
              {/* </div> */}
            </div>
            <div className="col-lg-4">
              <div className="card settings-wrap emboss-c pb-1">
                {/* <TabContents tabGroupName="settings-tabs"> */}
                {location.pathname !== "/settings" ? (
                  <>
                    {[
                      {
                        title: "General Information",
                        subTitle: "Specs foto, name & language",
                        link: "/settings",
                      },
                      {
                        title: "Business Settings",
                        subTitle: "Connected tools & services",
                        link: "/business-settings",
                      },
                      {
                        title: "Users & Permissions",
                        subTitle: "Manage Employees & Admin",
                        link: "/users",
                      },
                      {
                        title: "Billing",
                        subTitle: "Invoices & Plans",
                        link: "/billing",
                      },
                      {
                        title: "Reports",
                        subTitle: "View & Export your Data",
                        link: "/reports",
                      },
                    ].map((el, idx) => {
                      return <SideLink key={"sidelink-" + idx} {...el} />;
                    })}
                  </>
                ) : (
                  <>
                    {[
                      {
                        title: "General Information",
                        subTitle: "Specs foto, name & language",
                        link: "/settings",
                      },
                      {
                        title: "Wallet & Nodes",
                        subTitle: "Profiles & Connections",
                        link: "/wallets",
                      },
                    ].map((el, idx) => {
                      return (
                        <SideLink key={"sidelink-wallet-" + idx} {...el} />
                      );
                    })}
                  </>
                )}
                {/* </TabContents> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsLayout;

const SideLink = ({ title, subTitle, link }) => {
  return (
    <NavLink to={link}>
      <div className="text-lato fw-700">{title}</div>
      <div className="text-lato fw-400 fs-12 text-light-5 mt-1">{subTitle}</div>
    </NavLink>
  );
};

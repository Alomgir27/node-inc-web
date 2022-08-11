import React from "react";

import MainLayout from "./MainLayout";

const WorkshopLayout = ({ title, children, ...rest }) => {
  return (
    <MainLayout
      headVector="./assets/vectors/workshop.svg"
      activeLink="courses"
      title={title || "Live Passes Management"}
      titleClassName="ms-2"
      tabData={{
        tabLinks: true,
        img: true,
        groupName: "courses-tabs",
        tabs: [
          {
            to: "/courses-live",
            icon: "./assets/vectors/realtime.svg",
            iconActive: "./assets/vectors/realtime-active.svg",
          },
          {
            to: "/courses-schedule",
            icon: "./assets/vectors/appointment.svg",
            iconActive: "./assets/vectors/appointment-active.svg",
          },
          {
            to: "/workshop-requests",
            icon: "./assets/vectors/requests-2.svg",
            iconActive: "./assets/vectors/requests-2-active.svg",
          },
          {
            to: "/courses-registration",
            icon: "./assets/vectors/registration.svg",
            iconActive: "./assets/vectors/registration-active.svg",
          },
          {
            to: "/courses-discounts",
            icon: "./assets/vectors/discount.svg",
            iconActive: "./assets/vectors/discount-active.svg",
          },
        ],
      }}
      {...rest}
    >
      <div id="workshop-main-content" className="mt-4 mt-sm-0">
        <div className="container-fluid px-0">
          {/* <WorkshopTabs /> */}

          {children}
        </div>
      </div>
    </MainLayout>
  );
};

export default WorkshopLayout;

import React from "react";
import WorkshopWorkorderLayout from "../layouts/WorkshopWorkorderLayout";

const WorkorderDetails = () => {
  return (
    <WorkshopWorkorderLayout
      headVector="./assets/vectors/workshop.svg"
      activeLink="workshop"
      title="Real-Time"
      titleClassName="ms-2"
      tabData={{
        tabLinks: true,
        img: true,
        groupName: "workshop-tabs",
        tabs: [
          {
            to: "/workshop-realtime",
            icon: "./assets/vectors/realtime.svg",
            iconActive: "./assets/vectors/realtime-active.svg",
            target: "realtime",
          },
          {
            to: "/workshop-appointment",
            icon: "./assets/vectors/appointment.svg",
            iconActive: "./assets/vectors/appointment-active.svg",
            target: "appointment",
          },
          {
            to: "/workshop-requests",
            icon: "./assets/vectors/requests-2.svg",
            iconActive: "./assets/vectors/requests-2-active.svg",
            target: "requests",
          },
        ],
      }}
    ></WorkshopWorkorderLayout>
  );
};

export default WorkorderDetails;

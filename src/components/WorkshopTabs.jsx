import React from "react";

import Tabs from "../components/Tabs";

const WorkshopTabs = () => {
  return (
    <Tabs
      tabLinks
      verticalButtons
      tabClassName="mb-4 mb-sm-0"
      className="mt-4 flex-column flex-sm-row w-100"
      tabGroupName="workshop-tabs"
      data={[
        {
          to: "/workshop-realtime",
          icon: "./assets/vectors/realtime.svg",
          iconActive: "./assets/vectors/realtime-active.svg",
          label: "Realtime",
          target: "realtime",
        },
        {
          to: "/workshop-appointment",
          icon: "./assets/vectors/appointment.svg",
          iconActive: "./assets/vectors/appointment-active.svg",
          label: "Appointment",
          target: "appointment",
        },
        {
          to: "/workshop-requests",
          icon: "./assets/vectors/requests-2.svg",
          iconActive: "./assets/vectors/requests-2-active.svg",
          label: "Requests",
          target: "requests",
        },
        {
          to: "/workshop-storage",
          icon: "./assets/vectors/storage.svg",
          iconActive: "./assets/vectors/storage-active.svg",
          label: "Storage",
          target: "storage",
        },
      ]}
    />
  );
};

export default WorkshopTabs;

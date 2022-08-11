import React from "react";

import SettingsLayout from "../layouts/SettingsLayout";

const Settings1 = () => {
  return (
    <SettingsLayout>
      <div className="lamba-section">
        <h3 className="section-title">Current Modules &amp; Costs</h3>
      </div>

      <div className="lamba-section">
        <h3 className="section-title">Invoices</h3>
      </div>

      <div className="lamba-section">
        <h3 className="section-title">Credits</h3>
      </div>
    </SettingsLayout>
  );
};

export default Settings1;

import React from "react";

const TabContents = ({ children, tabGroupName }) => {
  return <div className={`tabContents ${tabGroupName}`}>{children}</div>;
};

export default TabContents;

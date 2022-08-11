import React from "react";

const TabContentItem = ({ children, target }) => {
  return <div className={`tabContent ${target}`}>{children}</div>;
};

export default TabContentItem;

import React from "react";
import $ from "jquery";

const Accordion = ({ headComp, children }) => {
  const toggleAccordion = (e) => {
    const $this = $(e.target);

    $this.parents(".accordion").children(".accordion-body").slideToggle();
    $this.parents(".accordion").toggleClass("open");
  };

  return (
    <div className="accordion w-100">
      <div className="accordion-head" onClick={toggleAccordion}>
        {headComp}
      </div>
      <div className="accordion-body" style={{ display: "none" }}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;

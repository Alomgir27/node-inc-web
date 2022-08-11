import React from "react";
import Input from "../../../components/Input";

export default function DateSubField({ field, handleChange }) {
  return (
    <div>
      <p className="text-dark-3 fs-14 pt-2 pb-2 fw-600 bg-transparent border-0">
        {field?.label}
      </p>
      <Input
        // withToggler
        // icon="vectors/calender-2.svg"
        type="date"
        id="date"
        name="due_date"
        onChange={handleChange}
        // handelDelete={() => handleDelete(curIndex)}
        // switchState={handleIsRequired}
        // defaultTogglerClose={!field?.required}
      />
    </div>
  );
}

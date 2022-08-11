import React from "react";
import Input from "../../../components/Input";

export default function DateField({
  curIndex,
  field,
  fields,
  setFields,
  handleDelete,
  handleChange,
  handleIsRequired,
}) {
  return (
    <div>
      <input
        className="text-dark-3 fs-14 pt-2 pb-2 fw-600 bg-transparent border-0"
        type="text"
        defaultValue="Next Due date"
        value={field?.name}
        onChange={handleChange}
      />
      <Input
        withToggler
        // icon="vectors/calender-2.svg"
        type="date"
        id="date"
        name="due_date"
        onChange={()=> {}}
        handelDelete={()=> handleDelete(curIndex)}
        switchState={handleIsRequired}
        defaultTogglerClose={!field?.required}
        />
    </div>
  );
}

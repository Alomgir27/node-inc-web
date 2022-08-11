import React from "react";
import Input from "../../../components/Input";

export default function NumberField({
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
        value={field?.name}
        onChange={handleChange}
      />
      <Input
        Id={curIndex}
        withToggler
        //icon="vectors/calender-2.svg"
        id="number"
        type="number"
        name="number"
        onChange={()=> {}}
        placeholder=""
        handelDelete={()=> handleDelete(curIndex)}
        switchState={handleIsRequired}
        defaultTogglerClose={!field?.required}
      />
    </div>
  );
}

import React from "react";
import Input from "../../../components/Input";

export default function TextField({
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
        // defaultValue="Label"
        value={field?.name}
        onChange={handleChange}
      />
      <Input
        withToggler
        id="text"
        name="name"
        onChange={() => {}}
        placeholder=""
        handelDelete={() => handleDelete(curIndex)}
        switchState={handleIsRequired}
        defaultTogglerClose={!field?.required}
      />
    </div>
  );
}

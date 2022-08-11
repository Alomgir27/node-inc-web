import React from "react";
import Input from "../../../components/Input";

export default function FileSubField({
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
        defaultValue="Picture of Problem"
        value={field?.label}
        onChange={handleChange}
      />
      <Input
        withToggler
        fileUpload
        id="file"
        type="file"
        name="file"
        onChange={() => {}}
        handelDelete={() => handleDelete(curIndex)}
        switchState={handleIsRequired}
        defaultTogglerClose={!field?.required}
      />
    </div>
  );
}

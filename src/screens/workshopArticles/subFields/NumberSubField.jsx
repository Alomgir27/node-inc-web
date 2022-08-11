import React from "react";
import Input from "../../../components/Input";

export default function NumberSubField({ curIndex, field, handleChange }) {
  return (
    <div>
      <p className="text-dark-3 fs-14 pt-2 pb-2 fw-600 bg-transparent border-0">
        {field?.label}
      </p>

      <Input
        Id={curIndex}
        id="number"
        type="number"
        name="number"
        onChange={handleChange}
        placeholder={field?.placeholder}
        // handelDelete={() => handleDelete(curIndex)}
        // switchState={handleIsRequired}
        // defaultTogglerClose={!field?.required}
      />
    </div>
  );
}

import React from "react";
import Switch from "../../../components/Switch";

export default function ChoiceField({
  curIndex,
  field,
  fields,
  setFields,
  handleDelete,
  handleChange,
  handleIsRequired,
}) {
  const handleChoiceChange = (e, fieldName) => {
    field[fieldName] = e?.target?.value;
    setFields([...fields]);
  };

  return (
    <div>
      <input
        className="text-dark-3 fs-14 pt-2 pb-2 fw-600 bg-transparent border-0"
        type="text"
        value={field?.name}
        onChange={handleChange}
      />

      <div className={`custom-form-control normalized`}>
        <div
          className={`input d-flex align-items-start justify-content-between`}
        >
          <div className="d-flex checkboxes mt-2">
            <div className="d-flex flex-row align-items-center ">
              <label className="checkbox-container-2 me-0 pe-0">
                {/* {text} */}
                <input
                  className="position-static custom-radio-btn "
                  type="radio"
                />

                <span className="checkmark "></span>
              </label>
              <input
                type={"text"}
                defaultValue={
                  field?.choices ? field?.choices[0] : "Good condition"
                }
                className="shadow-none"
                value={field?.choice1}
                onChange={(e) => handleChoiceChange(e, "choice1")}
              />
            </div>

            <div className="d-flex flex-row align-items-center ">
              <label className="checkbox-container-2 me-0 pe-0">
                {/* {text} */}
                <input
                  className="position-static custom-radio-btn "
                  type="radio"
                />
                <span className="checkmark"></span>
              </label>
              <input
                type={"text"}
                defaultValue={
                  field?.choices ? field?.choices[1] : "To be watched"
                }
                className="shadow-none "
                value={field?.choice2}
                onChange={(e) => handleChoiceChange(e, "choice2")}
              />
            </div>

            <div
              className="options"
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <Switch
                defaultChecked={field?.required}
                onChange={(event) =>
                  handleIsRequired(event.currentTarget.checked)
                }
              />
              <button className="btn delete">
                <img
                  src="./assets/vectors/bin.svg"
                  onClick={() => handleDelete(curIndex)}
                  alt="bin"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Switch from "../../../components/Switch";

export default function ChoiceSubField({
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
      {/* onChange={handleChange} */}
      <p className="text-dark-3 fs-14 pt-2 pb-2 fw-600 bg-transparent border-0">
        {field?.label}
      </p>

      {/* <input type="radio" id="age1" name="age" value="30">
      <label for="age1">0 - 30</label><br>
      <input type="radio" id="age2" name="age" value="60">
      <label for="age2">31 - 60</label><br>  
      <input type="radio" id="age3" name="age" value="100">
      <label for="age3">61 - 100</label><br><br>
      <input type="submit" value="Submit"> */}

      <div className={`custom-form-control normalized`}>
        <div
          className={`input d-flex align-items-start justify-content-between`}
        >
          <div
            className="checkboxes mt-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              width: "100%",
              // backgroundColor: "red",
            }}
          >
            <div
              className="d-flex flex-row align-items-center"
              style={{ gap: 10 }}
            >
              <input
                className="position-static custom-radio-btn"
                style={{
                  width: 15,
                  borderRadius: 7.5,
                  overflow: "hidden",
                  backgroundColor: "red",
                }}
                type="radio"
                id={`age1${curIndex}`}
                name={field?.choices[0]}
                value={field?.choices[0]}
                onChange={handleChange}
              />
              <label for={`age1${curIndex}`}>{field?.choices[0]}</label>
            </div>

            <div
              className="d-flex flex-row align-items-center"
              style={{ gap: 10 }}
            >
              <input
                className="position-static custom-radio-btn"
                style={{
                  width: 15,
                  borderRadius: 7.5,
                  overflow: "hidden",
                  backgroundColor: "red",
                }}
                type="radio"
                id={`age2${curIndex}`}
                name={field?.choices[1]}
                value={field?.choices[1]}
                onChange={handleChange}
              />
              <label for={`age2${curIndex}`}>{field?.choices[1]}</label>
            </div>

            {/* <div className="d-flex flex-row align-items-center">
              <label className="checkbox-container-2 me-0 pe-0">
                <input className="position-static" type="radio" />
                <span className="checkmark"></span>
              </label>

              <p className="text-dark-3 fs-14 pt-2 pb-2 fw-600 bg-transparent border-0">
                {field?.choices[0]}
              </p>
            </div>

            <div className="d-flex flex-row align-items-center ">
              <label className="checkbox-container-2 me-0 pe-0">
                <input className="position-static" type="radio" />
                <span className="checkmark"></span>
              </label>

              <p className="text-dark-3 fs-14 pt-2 pb-2 fw-600 bg-transparent border-0">
                {field?.choices[1]}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

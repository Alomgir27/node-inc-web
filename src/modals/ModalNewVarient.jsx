import React, { useState } from "react";

import Modal from "./Modal";
import FancyInput from "../components/FancyInput";
import AddBtn from "../components/AddBtn";
import Select, { ActionMeta } from "react-select";
import CreatableSelect from "react-select/creatable";
const ModalNewVarient = (props) => {
  const [variant, setVariant] = useState([]);

  const handelAddVarient = () => {
    let newVariants = (
      <div className="row d-flex align-items-center">
        <div className="col-11 item mr-4">
          <div className="mr-1">
            <CreatableSelect
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <CreatableSelect
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
              onInputChange={handleInputChange}
            />
          </div>
          <div>
            <CreatableSelect
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
              onInputChange={handleInputChange}
            />
          </div>
          <img src="./assets/vectors/right-arrow.svg" alt="right-arrow" />
          <FancyInput
            select
            options={[
              {
                text: "Select in the menu",
                value: "",
                selected: true,
              },
            ]}
            // onChange={handleSelectChange}
            id="assignedTo"
            name="nodeclient"
            placeholder="Select in the menu"
            rootClassName="appointment-select"
            inputClassName="custom-select"
          />
        </div>
        <div className="col-1 align-items-center">
          <img
            className=" hover ml-2"
            src="./assets/vectors/delete.svg"
            alt=""
            id={variant.length + 1}
            onClick={deleteVariant}
          />
        </div>
      </div>
    );

    let allVariants = [...variant, newVariants];

    setVariant(allVariants);
  };

  const deleteVariant = (e) => {
    console.log(e.target.id);
    variant.splice(e.target.id);
    setVariant(variant);
  };

  const options = [
    {
      value: "Option 1",
      label: "Option 1",
    },
    {
      value: "Option 2",
      label: "Option 2",
    },
    {
      value: "Option 3",
      label: "Option 3",
    },
  ];
  const handleChange = (
    newValue: OnChangeValue<ColourOption, false>,
    actionMeta: ActionMeta<ColourOption>
  ) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  const handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  return (
    <div>
      <Modal
        className="varient-modal"
        titleVector="./assets/vectors/modal-new-variant.svg"
        title="New variant"
        forText="Brake Change"
        buttonText="SAVE"
        {...props}
      >
        <div className="varient-modal-body position-relative">
          <div className="container-fluid px-0 pb-3">
            <div
              className="col-sm-6 position-absolute"
              style={{ top: "-80%", right: "0%" }}
            >
              <p className="mt-2"> Category</p>
              <FancyInput
                select
                options={[
                  {
                    text: "Categories",
                    value: "",
                    selected: true,
                  },
                ]}
                // onChange={handleSelectChange}
                id="assignedTo"
                name="nodeclient"
                placeholder="Select in the menu"
                rootClassName="appointment-select"
                inputClassName="custom-select"
              />
            </div>
          </div>

          {variant}

          <AddBtn pale small onClick={handelAddVarient} />
        </div>
      </Modal>
    </div>
  );
};

export default ModalNewVarient;

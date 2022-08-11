import React, { useEffect, useState } from "react";
import TextField from "../fields/TextField";
import NumberField from "../fields/NumberField";
import FileField from "../fields/FileField";
import DateField from "../fields/DateField";
import ChoiceField from "../fields/ChoiceField";
import { BASEURL, sendNetworkRequest } from "../../../http/http-request";

export default function CreateForm({ open, setOpen, getForms }) {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("Type a Form Name here");

  const addField = (name, type, required) => {
    setFields((oldArray) => [
      ...oldArray,
      { name, type, required: required || true },
    ]);
  };
  const removeField = (fieldId) => {
    setFields((e) => e?.filter((x, i) => i !== fieldId));
  };

  const [submitting, setFormSubmission] = useState(false);

  const createForm = async function createForm(event) {
    event.preventDefault();
    setFormSubmission(true);

    try {
      let formattedFields = [];
      let formattedchoices = [];

      fields?.map((f) => {
        if (f?.type !== "choice") {
          formattedFields?.push(f);
        } else {
          formattedchoices.push({
            name: f.name,
            choices: [f?.choice1 || "choice 1", f?.choice2 || "choice 2"],
            required: f?.required,
          });
        }
      });

      sendNetworkRequest(`${BASEURL}/form`, "POST", {
        name: formName,
        is_internal: true,
        fields: formattedFields,
        choices: formattedchoices,
      })
        .then((res) => {
          if (res.status == 201) {
            console.log(res);
            setFormSubmission(false);
            alert("Form successfully submitted");

            setOpen(false);
            getForms();
          }
        })
        .catch((err) => {
          setFormSubmission(false);
          alert("Form not successfully submitted");
          console.log(err.response.data);
        });
    } catch (error) {
      setFormSubmission(false);
    }
  };

  return (
    <form action="" onSubmit={createForm}>
      <div id="form-builder-main-content" className="mt-4 mt-sm-0">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-8 col-md-6">
              <div className="form-builder mt-5">
                <div className="head">
                  <div className="title">
                    {/* <h3 className="section-title">Form name</h3> */}
                    <input
                      className="col-8 gradient-text pt-3 pb-1 fw-600 bg-transparent border-0"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>
                  <div className="node"></div>
                </div>
                <div className="body">
                  <div className="emboss-white">
                    Add Components here...
                    {fields?.map((field, index) => {
                      const handleChange = (e) => {
                        field["name"] = e.target.value;
                        setFields([...fields]);
                      };
                      const handleIsRequired = (e) => {
                        field["required"] = e;
                        setFields([...fields]);
                      };
                      const fieldDatas = {
                        key: index,
                        curIndex: index,
                        field: field,
                        fields: fields,
                        setFields: setFields,
                        handleDelete: removeField,
                        handleChange,
                        handleIsRequired,
                      };

                      return (
                        ((field?.type === "text" ||
                          field?.type === "string") && (
                          <TextField {...fieldDatas} />
                        )) ||
                        (field?.type === "number" && (
                          <NumberField {...fieldDatas} />
                        )) ||
                        (field?.type === "file" && (
                          <FileField {...fieldDatas} />
                        )) ||
                        (field?.type === "date" && (
                          <DateField {...fieldDatas} />
                        )) ||
                        (field?.type === "choice" && (
                          <ChoiceField {...fieldDatas} />
                        ))
                      );
                    })}
                    {/* {dropDownFields} */}
                  </div>

                  <div className="d-flex justify-content-end mt-5">
                    <button className="btn btn-gradient">
                      {submitting ? "Please wait" : `Save & Return`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 composents-container">
              <div className="card bordered px-0">
                <h3 className="section-title mb-4">Components</h3>

                <div className="sections-wrap br-16 p-4">
                  <div className="sections br-16">
                    <div className="section">
                      <div className="imgs">
                        <img
                          src="./assets/vectors/composents-1.svg"
                          alt="composents"
                          onClick={() => addField("Label", "text")}
                          className="hover"
                        />
                        <img
                          src="./assets/vectors/composents-2.svg"
                          alt="composents"
                          onClick={() => addField("Number", "number")}
                          className="hover"
                        />
                      </div>
                    </div>
                    <div className="section">
                      <div className="fw-600">CHOICES</div>
                      <div className="imgs">
                        <div className="img">
                          <div className="text">Single Choice</div>
                          <img
                            className="hover"
                            onClick={() => addField("Single Choice", "choice")}
                            src="./assets/vectors/composents-3.svg"
                            alt="composents"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="section">
                      <div className="fw-600">ATTACHMENT</div>
                      <div className="imgs">
                        <div className="img">
                          <div className="text">Picture or File</div>
                          <img
                            onClick={() =>
                              addField("Picture of Problem", "file")
                            }
                            src="./assets/vectors/composents-5.svg"
                            alt="composents"
                            className="hover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="section">
                      <div className="fw-600">DATE</div>
                      <div className="imgs">
                        <img
                          onClick={() => addField("Next Due date", "date")}
                          src="./assets/vectors/composents-6.svg"
                          alt="composents"
                          className="hover"
                        />
                      </div>
                    </div>
                    {/* <div className="section">
                      <div className="fw-600">Drop down Field</div>
                      <div className="imgs">
                        <img
                          onClick={addDropDownField}
                          src="./assets/vectors/composents-6.svg"
                          alt="composents"
                          className="hover"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

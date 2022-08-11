import React, { useEffect, useState } from "react";
import TextField from "../fields/TextField";
import NumberField from "../fields/NumberField";
import FileField from "../fields/FileField";
import DateField from "../fields/DateField";
import ChoiceField from "../fields/ChoiceField";
import { BASEURL, sendNetworkRequest } from "../../../http/http-request";
import Loader from "../../../components/Loader";

export default function Updateorm({ open, setOpen, selectedFormId, getForms }) {
  const [loading, setLoading] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("New Form");
  useEffect(() => {
    setLoading(true);
    sendNetworkRequest(`${BASEURL}/form/single/${selectedFormId}`, "GET")
      .then((res) => {
        console.log("GET FORM : ", res?.data);
        setSelectedForm(res.data);
        setFormName(res.data?.form?.name);
        setFields([...res?.data?.formFields, ...res?.data?.formChoices]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.response?.data);
        setLoading(false);
      });
  }, [selectedFormId]);
  const addField = (name, type, required) => {
    setFields((oldArray) => [
      ...oldArray,
      { name, type, required: required || true },
    ]);
  };
  const removeField = (fId) => {
    const field = fields[fId];

    console.log("removeField : ", fId);
    if (field?.choices) {
      console.log("field : ", field);
      setLoading(true);
      sendNetworkRequest(
        `${BASEURL}/form/choice/${selectedForm?.form?.id}/${field?.id}`,
        "DELETE",
        {}
      )
        .then((res) => {
          setFields((e) => e?.filter((x) => x?.id !== field?.id));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err?.response?.data);
          setLoading(false);
        });
    } else {
      console.log("field : ", field?.id, selectedForm?.form?.id);
      setLoading(true);
      sendNetworkRequest(
        `${BASEURL}/form/field/${selectedForm?.form?.id}/${field?.id}`,
        "DELETE",
        {}
      )
        .then((res) => {
          setFields((e) => e?.filter((x) => x?.id !== field?.id));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err?.response?.data);
          setLoading(false);
        });
    }
    // setFields((e) => e?.filter((x) => x?.id !== field?.id));
  };

  const [submitting, setFormSubmission] = useState(false);
  // const [formState, setFormState] = useState({
  //   label: "jmait",
  //   note_id: "",
  //   due_date: "",
  //   name: "",
  // });

  const updateForm = (event) => {
    event.preventDefault();
    setFormSubmission(true);

    try {
      // const { label, due_date, note_id, name } = formState;
      let formattedFields = [];
      let formattedchoices = [];
      fields?.map((f) => {
        if (f?.type !== "choice") {
          formattedFields?.push(f);
        } else {
          formattedchoices.push({
            name: f.name,
            choices: [f?.choice1, f?.choice2],
            required: f?.required,
          });
        }
      });

      sendNetworkRequest(`${BASEURL}/form/${selectedForm?.form?.id}`, "PATCH", {
        name: formName,
        // is_internal: true,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          setFormSubmission(false);
          alert("Form not successfully submitted");
          console.log(err.response.data);
        });

      fields?.map((f) => {
        console.log({ f });
        if (f?.choices) {
          // console.log("XXXS ======> ", f?.choices[0], f?.choice1);

          let choicesArray = [];

          if (f?.choice1 && f?.choice1 !== "" && f?.choice1 !== f?.choices[0]) {
            choicesArray?.push({ old: f?.choices[0], new: f?.choice1 });
          }
          if (f?.choice2 && f?.choice2 !== "" && f?.choice2 !== f?.choices[0]) {
            choicesArray?.push({ old: f?.choices[1], new: f?.choice2 });
          }

          console.log({ choicesArray });

          sendNetworkRequest(
            `${BASEURL}/form/choice/${selectedForm?.form?.id}/${f?.id}`,
            "PATCH",
            {
              name: f?.name,
              choices: choicesArray,
              required: f?.required,
            }
          )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              setFormSubmission(false);
              alert("Form not successfully submitted");
              console.log(err.response.data);
            });
        } else {
          console.log("FFFF : ", f);
          sendNetworkRequest(
            `${BASEURL}/form/field/${selectedForm?.form?.id}/${f?.id}`,
            "PATCH",
            {
              name: f?.name,
              placeholder: f?.placeholder,
              required: f?.required,
              type: f?.type,
            }
          )
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              setFormSubmission(false);
              alert("Form not successfully submitted");
              console.log(err.response.data);
            });
        }
      });

      getForms();
      // sendNetworkRequest(`${BASEURL}/form`, "PATCH", {
      //   name: formName,
      //   is_internal: true,
      //   fields: formattedFields,
      //   choices: formattedchoices,
      //   id: selectedForm?.form?.id,
      //   // name: name,
      //   // note_id: note_id,
      //   // due_date: new Date(due_date),
      //   // label: label,
      // })
      //   .then((res) => {
      //     if (res.status == 201) {
      //       console.log(res);
      //       setFormSubmission(false);
      //       alert("Form successfully submitted");

      //       setOpen(false);
      //       getForms();
      //     }
      //   })
      //   .catch((err) => {
      //     setFormSubmission(false);
      //     alert("Form not successfully submitted");
      //     console.log(err.response.data);
      //   });
    } catch (error) {
      setFormSubmission(false);
    }
  };

  return loading ? (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  ) : (
    <form action="" onSubmit={updateForm}>
      <div id="form-builder-main-content" className="mt-4 mt-sm-0">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-8 col-md-6">
              <div className="form-builder mt-5">
                <div className="head">
                  <div className="title">
                    {/* <h3 className="section-title">Form name</h3> */}
                    <input
                      className="text-dark-3 pt-2 pb-2 fw-600 bg-transparent border-0"
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
                        ((field?.type === "choice" || field?.choices) && (
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
                <h3 className="section-title mb-4">Composents</h3>

                <div className="sections-wrap br-16 p-4">
                  <div className="sections br-16">
                    <div className="section">
                      <div className="imgs">
                        <img
                          src="./assets/vectors/composents-1.svg"
                          alt="composents"
                          // onClick={addTextField}
                          onClick={() => addField("Label", "text")}
                          className="hover"
                        />
                        <img
                          src="./assets/vectors/composents-2.svg"
                          alt="composents"
                          // onClick={addNumberField}
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
                            // onClick={addChoiceField}
                            onClick={() => addField("Single Choice", "choice")}
                            src="./assets/vectors/composents-3.svg"
                            alt="composents"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="section">
                      <div className="fw-600">MULTIMEDIA</div>
                      <div className="imgs">
                        <div className="img">
                          <div className="text">Photo</div>
                          <img
                            // onClick={(addFileField)}
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
                          // onClick={addDateField}
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

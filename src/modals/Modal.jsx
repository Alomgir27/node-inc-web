import React from "react";
import clsx from "clsx";

import FancyInput from "../components/FancyInput";
import AddBtn from "../components/AddBtn";

const Modal = ({
  isOpen,
  modalCloseHandler,
  bottomAligned,
  className,
  headClassName,
  bodyClassName,
  headRightComp,
  titleVector,
  title,
  subTitle,
  forText,
  headInput,
  buttonText,
  children,
  addTask,
  addSubTask,
  formID,
  addFormToService,
  addArticle,
  addPass,
  handleEmployeeUpdate,
  ...rest
}) => {
  return (
    <>
      <div
        onClick={modalCloseHandler}
        className={clsx("modal-overlay", isOpen && "show")}
      ></div>
      <div
        className={clsx(
          "custom-modal",
          "br-16",
          "short-scrollbar",
          className,
          isOpen && "show",
          bottomAligned && "bottom-aligned"
        )}
        {...rest}
      >
        {title && (
          <div
            className={`modal-head${headClassName ? " " + headClassName : ""}`}
          >
            <div className="text">
              {titleVector && <img src={titleVector} alt={title} />}
              <h3 className="section-title">{title}</h3>
              <div className="title-label fs-10">{subTitle}</div>
              {forText && (
                <div className="fs-12 mt-1 text-neum">
                  For :<span className="fs-12 fw-600 text-neum">{forText}</span>
                </div>
              )}
            </div>
            <div className="d-flex">
              {headInput && <FancyInput {...headInput} />}
              {headRightComp && headRightComp}
            </div>
          </div>
        )}
        <div
          className={`modal-body${bodyClassName ? " " + bodyClassName : ""}`}
        >
          {children}
        </div>
        {buttonText && (
          <div className="modal-foot">
            {"Sub-task" === buttonText ? (
              <AddBtn
                onClick={() => {
                  addSubTask();
                  modalCloseHandler();
                }}
                gradient
                title={buttonText}
              />
            ) : (
              <AddBtn
                onClick={() => {
                  switch (title) {
                    case "New Request":
                      addTask();
                      modalCloseHandler();
                      break;
                    case "Forms":
                      addFormToService(formID);
                      modalCloseHandler();
                      break;
                    case "Article":
                      addArticle();
                      modalCloseHandler();
                      break;
                    case "Passes":
                      addPass();
                      modalCloseHandler();
                      break;
                    case "Update Employee":
                      handleEmployeeUpdate();
                      modalCloseHandler();
                      break;
                    default:
                      modalCloseHandler();
                  }
                }}
                gradient
                title={buttonText}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;

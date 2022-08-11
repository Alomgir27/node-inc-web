import Switch from "./Switch";
import isEmpty from "../utils/is-empty";

const Input = ({
  Id,
  checkbox,
  greenCheckbox,
  radio,
  select,
  defaultChecked,
  options,
  textArea,
  fileUpload,
  defaultTogglerClose,
  withToggler,
  id,
  name,
  label,
  value,
  icon,
  alt,
  type,
  handelDelete,
  placeholder,
  rootClassName,
  subRootClassName,
  className,
  switchState,
  ...rest
}) => {
  return (
    <div
      className={`custom-form-control normalized${
        rootClassName ? " " + rootClassName : ""
      }${withToggler ? " with-toggler" : ""}`}
    >
      {!isEmpty(label) && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <div
        className={`input d-flex align-items-start justify-content-between${
          subRootClassName ? " " + subRootClassName : ""
        }`}
      >
        {checkbox ? (
          <>
            {!isEmpty(options) &&
              options.map((el, idx) => {
                const { text } = el;

                return (
                  <label
                    key={name + idx}
                    className={
                      greenCheckbox
                        ? "checkbox-container-4"
                        : "checkbox-container-3"
                    }
                  >
                    <input
                      name={name}
                      type="checkbox"
                      defaultChecked={defaultChecked}
                    />
                    {greenCheckbox ? (
                      <span className="text">{text}</span>
                    ) : (
                      text
                    )}
                    <span className="checkmark"></span>
                  </label>
                );
              })}
          </>
        ) : radio ? (
          <div className="d-flex checkboxes mt-2">
            {options &&
              options.map((el, idx) => {
                const { text, ...rest } = el;

                return (
                  <div className="d-flex flex-row align-items-center ">
                    <label
                      key={name + idx}
                      className="checkbox-container-2 me-0 pe-0"
                    >
                      {/* {text} */}
                      <input
                        name={name}
                        className="position-static"
                        type="radio"
                        {...rest}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <input
                      type={"text"}
                      defaultValue={text}
                      className="shadow-none"
                    />
                  </div>
                );
              })}
          </div>
        ) : select ? (
          <select
            className={`custom-input${className ? " " + className : ""}`}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder || ""}
            {...rest}
          >
            {options &&
              options.map((el, idx) => {
                const { text, value } = el;

                return (
                  <option key={"op" + Math.random() + idx} value={value}>
                    {text}
                  </option>
                );
              })}
          </select>
        ) : textArea ? (
          <textarea
            className={`custom-input${className ? " " + className : ""}`}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder || ""}
            {...rest}
          />
        ) : fileUpload ? (
          <div className="file-uploader">
            <label htmlFor="file-upload"></label>
            <input type="file" name="" id="file-upload" />

            <div className="text-center text">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src="./assets/vectors/clip.svg"
                  className="me-3"
                  alt="clip"
                />
                <div className="text-inter fw-600">
                  Drop your file here, or{" "}
                  <span className="text-blue">Browse</span>
                </div>
              </div>
              <div className="text-light-6 text-inter mt-1">Max size 10MB</div>
            </div>
          </div>
        ) : (
          <input
            {...rest}
            className={`custom-input${className ? " " + className : ""}`}
            type={type || "text"}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder || ""}
          />
        )}

        {icon && (
          <img
            className="icon"
            src={`./assets/${icon}`}
            alt={alt}
            style={{ marginLeft: "90%" }}
          />
        )}

        {withToggler && (
          <div className="options">
            <Switch
              defaultChecked={!defaultTogglerClose}
              onChange={(event) => switchState(event.currentTarget.checked)}
            />
            <button className="btn delete">
              <img
                id={id}
                src="./assets/vectors/bin.svg"
                onClick={handelDelete}
                alt="bin"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

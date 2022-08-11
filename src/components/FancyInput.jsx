import clsx from "clsx";

const FancyInput = ({
  id,
  vector,
  labelClassName,
  label,
  label2,
  smallLabel,
  lightLabel,
  thinlabel,
  value,
  icon,
  alt,
  textArea,
  type,
  add,
  select,
  options,
  placeholder,
  sMargin,
  small,
  largePaddingBottom,
  mdPaddingBottom,
  embossed = true,
  prominant,
  prominantBlue,
  rootStyle,
  rootClassName,
  bMargin,
  inputClassName,
  maxlength,
  ...rest
}) => {
  return (
    <div
      style={rootStyle}
      className={clsx(
        "custom-form-control",
        { embossed },
        { prominant },
        { small },
        { "s-margin": sMargin },
        { "mb-4": bMargin },
        { "prominant-blue": prominantBlue },
        { "large-padding-bottom": largePaddingBottom },
        { "md-padding-bottom": mdPaddingBottom },
        rootClassName
      )}
    >
      <label
        className={clsx(
          { "text-light-5": lightLabel },
          { "fw-400 text-manrope": thinlabel },
          { "fs-10": smallLabel },
          labelClassName
        )}
        htmlFor={id}
      >
        {label}
      </label>
      {label2 && (
        <label
          className="d-block pt-3 pb-4 upload-label text-light-5 fw-300 text-manrope ps-4"
          htmlFor={id}
        >
          {label2 || "Upload your attachment"}
        </label>
      )}
      <div className="input fancy-select">
        {select ? (
          <select
            className={clsx("custom-input", inputClassName)}
            placeholder={placeholder || ""}
            {...rest}
          >
            {options.map((el, idx) => {
              return (
                <option
                  key={"select" + idx}
                  value={el.value}
                  disabled={el.disabled ? "disabled" : ""}
                  selected={el.selected ? "selected" : ""}
                >
                  {el.text}
                </option>
              );
            })}
          </select>
        ) : add ? (
          <img
            className="add-placeholder"
            src="./assets/vectors/add-placeholder.svg"
            alt="add"
            height="51px"
          />
        ) : textArea ? (
          <textarea
            {...rest}
            className={clsx("custom-input custom-text-area", inputClassName)}
            type={type || "text"}
            id={id}
            value={value}
            rows="4"
            cols="50"
            placeholder={placeholder || ""}
          />
        ) : (
          <>
            {icon && (
              <img className="icon" src={`./assets/${icon}`} alt={alt} />
            )}
            <input
              {...rest}
              className={clsx("custom-input", inputClassName)}
              type={type || "text"}
              id={id}
              value={value}
              placeholder={placeholder || ""}
              maxlength={maxlength}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FancyInput;

import React from "react";
import clsx from "clsx";

const AddBtn = ({
  small,
  smallHeight,
  pale,
  black,
  blue,
  title,
  className,
  gradient,
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        maxWidth: small ? "35px" : "unset",
        minHeight: smallHeight ? "20px" : "unset",
      }}
      className={clsx(
        "btn btn-add",
        { blue, black, pale },
        { "btn-gradient": gradient },
        { "p-0": small },
        { "justify-content-center": small },
        className
      )}
      {...rest}
    >
      {blue || black || pale || gradient ? (
        <img
          className={clsx("add", { "m-0": small })}
          src="../assets/vectors/add-blue.svg"
          alt="add"
        />
      ) : (
        <img
          className={clsx("add", { "m-0": small })}
          src="../assets/vectors/add.svg"
          alt="add"
        />
      )}
      {!small && <> {title || "ADD"}</>}
    </button>
  );
};

export default AddBtn;

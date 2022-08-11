import React from "react";

const SearchInput = ({
  onQrClick,
  withFilter,
  icon,
  placeholder,
  options = [],
  onClickSuggestion = () => {},
  ...rest
}) => {
  return (
    <div className="main-search">
      <div className="custom-form-control d-flex w-100">
        {withFilter && (
          <button className="btn">
            <img
              src="../assets/vectors/search-filter.svg"
              className="icon"
              alt="filter"
            />
          </button>
        )}
        <div className="input">
          <img
            src="../assets/vectors/search.svg"
            alt="search"
            className="icon magnifier"
          />
          <input
            className="custom-input"
            type="text"
            id="search"
            data-toggle="dropdown"
            placeholder={placeholder || "Start typing.."}
            {...rest}
          />

          {icon && (
            <img
              onClick={onQrClick}
              src={icon}
              className="icon qr c-pointer"
              alt="qr"
            />
          )}
        </div>
      </div>
      {options.length > 0 && (
        <div className="main-search-suggestion">
          {options.map((option) => {
            return (
              <div
                onClick={() => onClickSuggestion(option)}
                className="name fw-600"
              >{`${option.human_identity_id.first_name} ${option.human_identity_id.last_name}`}</div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;

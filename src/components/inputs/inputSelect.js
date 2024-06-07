import React, { memo } from "react";
import "./inputselect.css";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select
      className="form-select text-sm mobile-form-select"
      name={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="">Random</option>
      {options?.map((el) => (
        <option className="mobile-form-options" key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);

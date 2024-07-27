/* eslint-disable react/display-name */
import { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(
  ({ onChange, placeholder, type, value, onBlur, className, error }, ref) => {
    return (
      <div className="input-wrapper">
        <input
          value={value}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          placeholder={placeholder}
          className={className}
        />
        {error && <p className="error-message">{error.message}</p>}
      </div>
    );
  }
);

export default Input;

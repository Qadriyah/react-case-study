import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="input-wrapper">
      <div>
        {label && (
          <label htmlFor={props.id} className="label">
            {label}
          </label>
        )}
        <input {...props} className="input" />
      </div>
    </div>
  );
};

export default Input;

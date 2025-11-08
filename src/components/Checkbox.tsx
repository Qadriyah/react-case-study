import React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div>
      <input {...props} type="checkbox" className="checkbox" />
      {label && (
        <label htmlFor={props.id} className="label">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <div className="input-wrapper ">
      <button {...props} className="button">
        {children}
      </button>
    </div>
  );
};

export default Button;

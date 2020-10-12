import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  //if the isGoogleSignIn property is true then we can change this class name accordingly.
  <button
    className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button `}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;

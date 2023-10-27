/* eslint-disable no-unused-vars */
import React from "react";

const Oauth = () => {
  const handleClick = () => {
    try {
      console.log("confirm google");
    } catch (error) {
      console.log(`could not sing in`, error);
    }
  };
  return (
    <button onClick={handleClick} type="button">
      Continue with google
    </button>
  );
};

export default Oauth;

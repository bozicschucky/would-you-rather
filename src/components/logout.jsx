import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LogOut = () => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state) => {
    return state.counter.loggedInUser.loggedIn;
  });

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
    console.log("logging the user out");
  };

  if (!isUserLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default LogOut;

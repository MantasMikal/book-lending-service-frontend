import React from "react";
import { render } from "@testing-library/react";
import UserContext from "../contexts/user";

const renderWithUserContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

export default renderWithUserContext;

import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import LoginLayout from ".";
import UserContext from "../../../contexts/user";
import { authenticate } from "../../../utilities/fetch-helpers";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    authenticate: jest.fn()
  };
});

describe("Correctly renders LoginLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders LoginLayout", async () => {
    authenticate.mockResolvedValueOnce(true);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
        }}
      >
        <LoginLayout />
      </UserContext.Provider>,
      {
        route: "/login",
        path: "/login",
      }
    );

    expect(await screen.findByText("Log In")).toBeInTheDocument();
  });
});


describe("Authentication", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Authenticates user", async () => {
    authenticate.mockResolvedValueOnce(true);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
          login: () => true
        }}
      >
        <LoginLayout />
      </UserContext.Provider>,
      {
        route: "/",
        path: "/",
      }
    );
      
    const username = await screen.findByLabelText('Username')
    fireEvent.change(username, {
      target: {
        value: 'username'
      }
    })

    const password = await screen.findByLabelText('Password')
    fireEvent.change(password, {
      target: {
        value: 'password'
      }
    })

    const loginButton = await screen.findByText("Login");
    fireEvent.submit(loginButton);

    await waitFor (async () => expect(authenticate).toHaveBeenCalled())
    await waitFor(async () => expect(await screen.findByText("Successfully logged in")).toBeInTheDocument())
  });

  test("Provides feedback if login failed", async () => {
    authenticate.mockResolvedValueOnce(false);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
          login: () => false
        }}
      >
        <LoginLayout />
      </UserContext.Provider>,
      {
        route: "/",
        path: "/",
      }
    );

    const username = await screen.findByLabelText('Username')
    fireEvent.change(username, {
      target: {
        value: 'username'
      }
    })

    const password = await screen.findByLabelText('Password')
    fireEvent.change(password, {
      target: {
        value: 'password'
      }
    })
    
    const loginButton = await screen.findByText("Login");
    fireEvent.submit(loginButton);

    await waitFor(async () => expect(await screen.findByText("Could not log in")).toBeTruthy())
    await waitFor (async () => expect(authenticate).toHaveBeenCalledTimes(1))
  });
});
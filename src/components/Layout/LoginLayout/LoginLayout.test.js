import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import BookLayout from ".";
import UserContext from "../../../contexts/user";
import { authenticate } from "../../../utilities/fetch-helpers";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    authenticate: jest.fn(),
    searchBooks: jest.fn()
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
        <BookLayout />
      </UserContext.Provider>,
      {
        route: "/",
        path: "/",
      }
    );

    expect(await screen.findByText("Log In")).toBeInTheDocument();

    // Renders inputs
    expect(await screen.findByText("Username")).toBeInTheDocument();
    expect(await screen.findByText("Password")).toBeInTheDocument();
    expect(await screen.findByText("Login")).toBeInTheDocument();
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
        <BookLayout />
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

    await waitFor (() => expect(authenticate).toHaveBeenCalled())
    await waitFor(async () => expect(await screen.findAllByText("Successfully logged in")).toBeTruthy())
  });

  test("Errors if any of the inputs empty", async () => {
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
        <BookLayout />
      </UserContext.Provider>,
      {
        route: "/",
        path: "/",
      }
    );
    
    const loginButton = await screen.findByText("Login");
    fireEvent.submit(loginButton);

    expect(await screen.findByText("Please input your username!")).toBeTruthy()
    expect(await screen.findByText("Please input your password!")).toBeTruthy()
    await waitFor (() => expect(authenticate).toHaveBeenCalledTimes(0))
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
        <BookLayout />
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

    await waitFor(async () => expect(await screen.findAllByText("Could not log in")).toBeTruthy())
    await waitFor (() => expect(authenticate).toHaveBeenCalledTimes(1))
  });
});
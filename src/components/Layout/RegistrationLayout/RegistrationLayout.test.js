import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import RegistrationLayout from ".";
import UserContext from "../../../contexts/user";
import { registerUser } from "../../../utilities/fetch-helpers";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    registerUser: jest.fn()
  };
});

describe("Correctly renders RegistrationLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders RegistrationLayout", async () => {
    registerUser.mockResolvedValueOnce(true);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
        }}
      >
        <RegistrationLayout />
      </UserContext.Provider>,
      {
        route: "/register",
        path: "/register",
      }
    );
    // Only testing for title, because the form is tested in its own component
    expect(await screen.findByText("Registration")).toBeInTheDocument();
  });
});


describe("Registration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Registers user", async () => {
    registerUser.mockResolvedValueOnce(true);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
          register: () => true
        }}
      >
        <RegistrationLayout />
      </UserContext.Provider>,
      {
        route: "/register",
        path: "/register",
      }
    );
      
    const username = await screen.findByLabelText('Username')
    fireEvent.change(username, {
      target: {
        value: 'username'
      }
    })

    const email = await screen.findByLabelText('E-mail')
    fireEvent.change(email, {
      target: {
        value: 'email@email.com'
      }
    })

    const password = await screen.findByLabelText('Password')
    fireEvent.change(password, {
      target: {
        value: 'password'
      }
    })

    const passwordConfirm = await screen.findByLabelText('Confirm Password')
    fireEvent.change(passwordConfirm, {
      target: {
        value: 'password'
      }
    })

    const fullName = await screen.findByLabelText('Full Name')
    fireEvent.change(fullName, {
      target: {
        value: 'fullName'
      }
    })

    const country = await screen.findByLabelText('Country')
    fireEvent.change(country, {
      target: {
        value: 'country'
      }
    })

    const city = await screen.findByLabelText('City')
    fireEvent.change(city, {
      target: {
        value: 'city'
      }
    })

    const postcode = await screen.findByLabelText('Postcode')
    fireEvent.change(postcode, {
      target: {
        value: 'postcode'
      }
    })

    const address = await screen.findByLabelText('Address')
    fireEvent.change(address, {
      target: {
        value: 'address'
      }
    })

    const registerButton = await screen.findByText("Register");
    fireEvent.submit(registerButton);

    await waitFor (async () => expect(registerUser).toHaveBeenCalled())
    await waitFor (async () => expect(await screen.findByText("Successfully registered. Please log in")).toBeInTheDocument())
  });

  test("Provides feedback if registration failed", async () => {
    registerUser.mockResolvedValueOnce(false);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
          register: () => false
        }}
      >
        <RegistrationLayout />
      </UserContext.Provider>,
      {
        route: "/register",
        path: "/register",
      }
    );

    const username = await screen.findByLabelText('Username')
    fireEvent.change(username, {
      target: {
        value: 'username'
      }
    })

    const email = await screen.findByLabelText('E-mail')
    fireEvent.change(email, {
      target: {
        value: 'email@email.com'
      }
    })

    const password = await screen.findByLabelText('Password')
    fireEvent.change(password, {
      target: {
        value: 'password'
      }
    })

    const passwordConfirm = await screen.findByLabelText('Confirm Password')
    fireEvent.change(passwordConfirm, {
      target: {
        value: 'password'
      }
    })

    const fullName = await screen.findByLabelText('Full Name')
    fireEvent.change(fullName, {
      target: {
        value: 'fullName'
      }
    })

    const country = await screen.findByLabelText('Country')
    fireEvent.change(country, {
      target: {
        value: 'country'
      }
    })

    const city = await screen.findByLabelText('City')
    fireEvent.change(city, {
      target: {
        value: 'city'
      }
    })

    const postcode = await screen.findByLabelText('Postcode')
    fireEvent.change(postcode, {
      target: {
        value: 'postcode'
      }
    })

    const address = await screen.findByLabelText('Address')
    fireEvent.change(address, {
      target: {
        value: 'address'
      }
    })

    const registerButton = await screen.findByText("Register");
    fireEvent.submit(registerButton);

    await waitFor (async () => expect(registerUser).toHaveBeenCalled())
    await waitFor(async () => expect(await screen.findByText("Could not register")).toBeInTheDocument())
  });
});
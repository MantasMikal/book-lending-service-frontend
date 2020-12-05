import React from "react";
import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import RegistrationForm from ".";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    registerUser: jest.fn()
  };
});

describe("Correctly renders RegistrationForm", () => {

  test("Correctly renders RegistrationForm", async () => {
    const mockSubmit = jest.fn(() => true);
    render(<RegistrationForm onSubmit={mockSubmit}/>)

    expect(await screen.findByText("Register")).toBeInTheDocument();

    // Renders inputs
    expect(await screen.findByText("Username")).toBeInTheDocument();
    expect(await screen.findByText("E-mail")).toBeInTheDocument();
    expect(await screen.findByText("Password")).toBeInTheDocument();
    expect(await screen.findByText("Confirm Password")).toBeInTheDocument();
    expect(await screen.findByText("Full Name")).toBeInTheDocument();
    expect(await screen.findByText("Country")).toBeInTheDocument();
    expect(await screen.findByText("City")).toBeInTheDocument();
    expect(await screen.findByText("Postcode")).toBeInTheDocument();
    expect(await screen.findByText("Address")).toBeInTheDocument();
  });
});


describe("Validation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Errors if any of the inputs empty", async () => {
    const mockSubmit = jest.fn(() => true);
    render(<RegistrationForm onSubmit={mockSubmit}/>)
    
    const registerButton = await screen.findByText("Register");
    fireEvent.submit(registerButton);

    expect(await screen.findByText("Please input your username!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your password!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your E-mail!")).toBeInTheDocument()
    expect(await screen.findByText("Please confirm your password!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your full name!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your country!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your city!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your postcode!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your address!")).toBeInTheDocument()

    await waitFor (() => expect(mockSubmit).toHaveBeenCalledTimes(0))
  });

  test("Errors if two passwords are not the same", async () => {
    const mockSubmit = jest.fn(() => true);
    render(<RegistrationForm onSubmit={mockSubmit}/>)
    
    const loginButton = await screen.findByText("Register");
    fireEvent.submit(loginButton);

    const password = await screen.findByLabelText('Password')
    fireEvent.change(password, {
      target: {
        value: 'password'
      }
    })

    const passwordConfirm = await screen.findByLabelText('Confirm Password')
    fireEvent.change(passwordConfirm, {
      target: {
        value: 'password3'
      }
    })

    expect(await screen.findByText("Please input your username!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your E-mail!")).toBeInTheDocument()
    expect(await screen.findByText("The two passwords that you entered do not match!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your full name!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your country!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your city!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your postcode!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your address!")).toBeInTheDocument()

    await waitFor (() => expect(mockSubmit).toHaveBeenCalledTimes(0))
  });
});
import React from "react";
import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import LoginForm from ".";


describe("Correctly renders LoginForm", () => {

  test("Correctly renders LoginForm", async () => {
    const mockSubmit = jest.fn(() => true);
    render(<LoginForm onSubmit={mockSubmit}/>)
    // Renders inputs
    expect(await screen.findByText("Username")).toBeInTheDocument();
    expect(await screen.findByText("Password")).toBeInTheDocument();
    expect(await screen.findByText("Login")).toBeInTheDocument();
  });
});


describe("Validates input", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Errors if any of the inputs empty", async () => {
    const mockSubmit = jest.fn(x => 42 + x);
    render(<LoginForm onSubmit={mockSubmit}/>)
    
    const loginButton = await screen.findByText("Login");
    fireEvent.submit(loginButton);

    expect(await screen.findByText("Please input your username!")).toBeInTheDocument()
    expect(await screen.findByText("Please input your password!")).toBeInTheDocument()

    await waitFor (() => expect(mockSubmit).toHaveBeenCalledTimes(0))
  });
});
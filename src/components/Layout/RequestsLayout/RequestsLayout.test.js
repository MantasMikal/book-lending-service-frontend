import React from "react";
import { screen, waitFor, render } from "@testing-library/react";
import RequestsLayout from ".";
import UserContext from "../../../contexts/user";
import { fetchUserRequests } from "../../../utilities/fetch-helpers";
import requests from "../../../fixtures/request";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    fetchUserRequests: jest.fn(),
  };
});

describe("Correctly renders RequestsLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders RequestsLayout", async () => {
    fetchUserRequests.mockResolvedValueOnce({
      requests: requests,
    });

    render(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <RequestsLayout />
      </UserContext.Provider>
    );

    expect(await screen.findByText("Incoming requests")).toBeInTheDocument();
    expect(await screen.findByText("Sent requests")).toBeInTheDocument();
    expect(await screen.findByText("Archive")).toBeInTheDocument();
  });

  test("Provides feedback when failed to fetch requests", async () => {
    fetchUserRequests.mockResolvedValueOnce(null);

    render(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <RequestsLayout />
      </UserContext.Provider>
    );
    await waitFor(async () =>
      expect(
        await screen.findByText("Could not retrieve user requests")
      ).toBeInTheDocument()
    );
  });
});

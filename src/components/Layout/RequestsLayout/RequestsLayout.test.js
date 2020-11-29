import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import RequestsLayout from ".";
import UserContext from "../../../contexts/user";
import {
  getUserRequests
} from "../../../utilities/fetch-helpers";
import requests from "../../../fixtures/request";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    getUserRequests: jest.fn(),
  };
});

describe("Correctly renders RequestsLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders RequestsLayout", async () => {
    getUserRequests.mockResolvedValueOnce({
      requests: requests
    });

    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <RequestsLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/",
        path: "/book-requests/",
      }
    );

    expect(await screen.findByText("Incoming requests")).toBeInTheDocument();
    expect(await screen.findByText("Sent requests")).toBeInTheDocument();
    expect(await screen.findByText("Archive")).toBeInTheDocument();
  });

  test("Provides feedback when failed to fetch requests", async () => {
    getUserRequests.mockResolvedValueOnce(null);

    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <RequestsLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/",
        path: "/book-requests/",
      }
    );
    await waitFor(async () => expect(await screen.findByText("Could not retrieve user requests")).toBeInTheDocument())
  });
});

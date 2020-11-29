import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import UserLayout from ".";
import UserContext from "../../../contexts/user";
import { fetchUserById } from "../../../utilities/fetch-helpers";
import users from "../../../fixtures/user";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    fetchUserById: jest.fn(),
  };
});

describe("Correctly renders UserLayout", () => {
  const user = users[0];
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders UserLayout", async () => {
    fetchUserById.mockResolvedValueOnce(user);

    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <UserLayout />
      </UserContext.Provider>,
      {
        route: "/user/1",
        path: "/user/:userID",
      }
    );

    expect(
      await screen.findByText(user.address, { exact: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(user.city, { exact: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(user.country, { exact: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(user.postcode, { exact: false })
    ).toBeInTheDocument();
    expect(await screen.findByText(user.fullName)).toBeInTheDocument();
    expect(
      await screen.findAllByText(user.username, { exact: false })
    ).toBeTruthy();
    expect(await screen.findByText(user.email)).toBeInTheDocument();
  });

  test("Provides feedback when failed to fetch requests", async () => {
    fetchUserById.mockResolvedValueOnce(null);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <UserLayout />
      </UserContext.Provider>,
      {
        route: "/user/1",
        path: "/user/:userID",
      }
    );
    await waitFor(async () =>
      expect(
        await screen.findByText("Error fetching account")
      ).toBeInTheDocument()
    );
  });
});

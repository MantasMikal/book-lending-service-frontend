import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import RequestLayout from ".";
import UserContext from "../../../contexts/user";
import {
  fetchRequestMessages,
  fetchRequestById,
  sendMessage,
  fetchUserById,
  archiveRequest,
} from "../../../utilities/fetch-helpers";
import requests from "../../../fixtures/request";
import messages from "../../../fixtures/message";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    fetchRequestMessages: jest.fn(),
    fetchRequestById: jest.fn(),
    sendMessage: jest.fn(),
    fetchUserById: jest.fn(),
    archiveRequest: jest.fn(),
    deleteBookRequest: jest.fn(),
  };
});

describe("Correctly renders RequestLayout", () => {
  const request = requests[0];
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders RequestLayout", async () => {
    fetchRequestById.mockResolvedValueOnce(request);
    fetchRequestMessages.mockResolvedValueOnce({
      messages: messages,
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
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/1",
        path: "/book-requests/1",
      }
    );

    expect(await screen.findByText("Go to book")).toBeInTheDocument();
    expect(await screen.findByText(request.title)).toBeInTheDocument();
    expect(await screen.findByText(request.status)).toBeInTheDocument();
  });

  test("Renders cancel button if book is requested and request status is 'Open'", async () => {
    fetchRequestById.mockResolvedValueOnce(request);
    fetchRequestMessages.mockResolvedValueOnce({
      messages: messages,
    });

    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 2,
          },
        }}
      >
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/1",
        path: "/book-requests/1",
      }
    );

    expect(await screen.findByText("Cancel")).toBeInTheDocument();
  });

  test("Renders archive button if book is not on request, request status is 'Completed' and it is not been archived", async () => {
    fetchRequestById.mockResolvedValueOnce(requests[1]);
    fetchRequestMessages.mockResolvedValueOnce({
      messages: messages,
    });

    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 2,
          },
        }}
      >
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/2",
        path: "/book-requests/2",
      }
    );

    expect(await screen.findByText("Archive")).toBeInTheDocument();
  });

  test("Renders 'Update status' button if the user is book owner", async () => {
    fetchRequestById.mockResolvedValueOnce(request);
    fetchRequestMessages.mockResolvedValueOnce({
      messages: messages,
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
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/1",
        path: "/book-requests/1",
      }
    );

    expect(await screen.findByText("Update status")).toBeInTheDocument();
  });
});

describe("Correctly carries out user actions", () => {
  const request = requests[0];
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Fetches messages every 3s", async () => {
    fetchRequestById.mockResolvedValue(request);
    fetchRequestMessages.mockResolvedValue({
      messages: messages,
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
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/1",
        path: "/book-requests/1",
      }
    );

    await waitFor(() => expect(fetchRequestMessages).toHaveBeenCalledTimes(2), {
      timeout: 4000,
    });
  });

  test("Archives request", async () => {
    fetchRequestById.mockResolvedValueOnce(requests[1]);
    archiveRequest.mockResolvedValue(true)

    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 2,
          },
        }}
      >
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/2",
        path: "/book-requests/2",
      }
    );

    const sendButton = await screen.findByText("Archive");
    fireEvent.click(sendButton);

    await waitFor(() => expect(archiveRequest).toHaveBeenCalledTimes(1));
  });

  test("Provides error message when could archive the request", async () => {
    fetchRequestById.mockResolvedValueOnce(requests[1]);
    archiveRequest.mockResolvedValue(false)

    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 2,
          },
        }}
      >
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/2",
        path: "/book-requests/2",
      }
    );

    const sendButton = await screen.findByText("Archive");
    fireEvent.click(sendButton);

    await waitFor(() => expect(archiveRequest).toHaveBeenCalledTimes(1));
    await waitFor(async () => expect(await screen.findByText("Could not archive the request")).toBeInTheDocument())
  });

  test("Sends a message", async () => {
    fetchRequestById.mockResolvedValue(request);
    fetchRequestMessages.mockResolvedValue({
      messages: messages,
    });
    sendMessage.mockResolvedValue(true);
    fetchUserById.mockResolvedValue({
      ID: 2,
      username: "mantas",
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
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/1",
        path: "/book-requests/1",
      }
    );

    const messageInput = await screen.findByPlaceholderText(
      "Type your message..."
    );
    fireEvent.change(messageInput, {
      target: {
        value: "some message",
      },
    });

    const sendButton = await screen.findByText("Send");
    fireEvent.click(sendButton);

    await waitFor(() => expect(sendMessage).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(fetchRequestMessages).toHaveBeenCalledTimes(2)); // One on initial render and re-render when sent
  });

  test("Provides error message when message could not be sent", async () => {
    fetchRequestById.mockResolvedValue(request);
    fetchRequestMessages.mockResolvedValue({
      messages: messages,
    });
    sendMessage.mockResolvedValue(false);
    fetchUserById.mockResolvedValue({
      ID: 2,
      username: "mantas",
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
        <RequestLayout />
      </UserContext.Provider>,
      {
        route: "/book-requests/1",
        path: "/book-requests/1",
      }
    );

    const messageInput = await screen.findByPlaceholderText(
      "Type your message..."
    );
    fireEvent.change(messageInput, {
      target: {
        value: "some message",
      },
    });

    const sendButton = await screen.findByText("Send");
    fireEvent.click(sendButton);

    await waitFor(() => expect(sendMessage).toHaveBeenCalledTimes(1));
    await waitFor(async () => expect(await screen.findByText("Could not send message")).toBeInTheDocument())
  });
});

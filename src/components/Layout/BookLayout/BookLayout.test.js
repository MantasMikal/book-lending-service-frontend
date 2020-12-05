import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import BookLayout from ".";
import UserContext from "../../../contexts/user";
import { fetchBookById } from "../../../utilities/fetch-helpers";
import books from "../../../fixtures/book";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    fetchBookById: jest.fn(),
  };
});

describe("Correctly renders BookLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders BookLayout if not logged", async () => {
    const book = books[0]
    fetchBookById.mockResolvedValueOnce(book);
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
        route: "/book/1",
        path: "/book/:bookID",
      }
    );
    expect(
      await screen.findByText(book.title, { exact: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(book.yearPublished, { exact: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(book.summary, { exact: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(book.status, { exact: false })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(book.author, { exact: false })
    ).toBeInTheDocument();
  });

  test("Correctly renders BookLayout if logged in as a book owner", async () => {
    fetchBookById.mockResolvedValueOnce(books[0]);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1
          },
        }}
      >
        <BookLayout />
      </UserContext.Provider>,
      {
        route: "/book/1",
        path: "/book/:bookID",
      }
    );
    expect(await screen.findByText("Update status")).toBeInTheDocument();
    expect(await screen.findByText("Edit")).toBeInTheDocument();
  });

  test("Correctly renders BookLayout if logged in by other user", async () => {
    fetchBookById.mockResolvedValueOnce(books[0]);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 2
          },
        }}
      >
        <BookLayout />
      </UserContext.Provider>,
      {
        route: "/book/1",
        path: "/book/:bookID",
      }
    );
    expect(await screen.findByText("Request")).toBeInTheDocument();
  });
});

describe("Correctly caries out user actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Opens status update modal when click on 'Update Status'", async () => {
    fetchBookById.mockResolvedValueOnce(books[0]);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1
          },
        }}
      >
        <BookLayout />
      </UserContext.Provider>,
      {
        route: "/book/1",
        path: "/book/:bookID",
      }
    );
    const updateButton = await screen.findByText('Update status')
    fireEvent.click(updateButton)
    expect(await screen.findByText('Update book status')).toBeInTheDocument()
  });
});

import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import UserBooksLayout from ".";
import UserContext from "../../../contexts/user";
import { fetchBooksByUserId, searchBooks } from "../../../utilities/fetch-helpers";
import books from "../../../fixtures/book";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    fetchBooksByUserId: jest.fn(),
    searchBooks: jest.fn()
  };
});

describe("Correctly renders UserBooksLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders UserBooksLayout", async () => {
    fetchBooksByUserId.mockResolvedValueOnce({books: books});
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1
          },
        }}
      >
        <UserBooksLayout />
      </UserContext.Provider>,
      {
        route: "/my-books",
        path: "/my-books",
      }
    );

    expect(await screen.findByText("My Books")).toBeInTheDocument();

    // Renders Search
    const searchInput = await screen.findByPlaceholderText("Filter books by Title, author or isbn")  
    expect(searchInput).toBeTruthy()

    // Renders books
    expect(await screen.findByText(books[0].title)).toBeInTheDocument();
    expect(await screen.findByText(books[1].title)).toBeInTheDocument();

    expect(await fetchBooksByUserId).toHaveBeenCalled()
  });
});


describe("Search", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Searches for user books", async () => {
    searchBooks.mockResolvedValueOnce({books: books});
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1
          },
        }}
      >
        <UserBooksLayout />
      </UserContext.Provider>,
      {
        route: "/my-books",
        path: "/my-books",
      }
    );

    // Input into search
    const searchInput = await screen.findByPlaceholderText("Filter books by Title, author or isbn")  
    fireEvent.change(searchInput, {
      target: {
        value: 'book'
      }
    })

    expect(await searchInput.value).toEqual('book')
    expect(await screen.findByText(`Searching your books for "book"`)).toBeInTheDocument();

    // Renders found books
    expect(await screen.findByText(books[0].title)).toBeInTheDocument();
    expect(await screen.findByText(books[1].title)).toBeInTheDocument();

    expect(await searchBooks).toHaveBeenCalled()
  });
});
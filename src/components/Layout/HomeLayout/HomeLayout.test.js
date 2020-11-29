import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import BookLayout from ".";
import UserContext from "../../../contexts/user";
import { fetchAllBooks, searchBooks } from "../../../utilities/fetch-helpers";
import books from "../../../fixtures/book";

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    fetchAllBooks: jest.fn(),
    searchBooks: jest.fn(),
  };
});

describe("Correctly renders HomeLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders HomeLayout if not logged", async () => {
    fetchAllBooks.mockResolvedValueOnce({ books: books });
    render(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
        }}
      >
        <BookLayout />
      </UserContext.Provider>
    );

    expect(await screen.findByText("All books available")).toBeInTheDocument();

    // Renders Search
    const searchInput = await screen.findByPlaceholderText(
      "Filter books by Title, author or isbn"
    );
    expect(searchInput).toBeTruthy();

    // Renders books
    expect(await screen.findByText(books[0].title)).toBeInTheDocument();
    expect(await screen.findByText(books[1].title)).toBeInTheDocument();
    expect(await fetchAllBooks).toHaveBeenCalled();
  });
});

describe("Search", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Searches for books", async () => {
    searchBooks.mockResolvedValueOnce({ books: books });
    render(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: false,
          },
        }}
      >
        <BookLayout />
      </UserContext.Provider>
    );

    // Input into search
    const searchInput = await screen.findByPlaceholderText(
      "Filter books by Title, author or isbn"
    );
    fireEvent.change(searchInput, {
      target: {
        value: "book",
      },
    });

    expect(await searchInput.value).toEqual("book");
    expect(await screen.findByText(`Searching for "book"`)).toBeInTheDocument();

    // Renders found books
    expect(await screen.findByText(books[0].title)).toBeInTheDocument();
    expect(await screen.findByText(books[1].title)).toBeInTheDocument();
    expect(await searchBooks).toHaveBeenCalled();
  });
});

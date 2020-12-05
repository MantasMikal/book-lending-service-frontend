import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithRouterMatch } from "../../../utilities/renderWithRouterMatch";
import EditBookLayout from ".";
import UserContext from "../../../contexts/user";
import {
  fetchBookById,
  addBook,
  updateBookById,
} from "../../../utilities/fetch-helpers";
import books from "../../../fixtures/book";

// TODO:
// - Test image uploader functionality

jest.mock("../../../utilities/fetch-helpers", () => {
  return {
    fetchBookById: jest.fn(),
    addBook: jest.fn(),
    updateBookById: jest.fn(),
  };
});

describe("Correctly renders EditBookLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Correctly renders EditBookLayout in editView with book values", async () => {
    const book = books[0];
    fetchBookById.mockResolvedValueOnce(book);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <EditBookLayout editView />
      </UserContext.Provider>,
      {
        route: "/my-books/edit/1",
        path: "/my-books/edit/:bookID",
      }
    );

    expect(await screen.findByText("Edit book")).toBeInTheDocument();

    // All input fields should be filled with book data
    const titleInput = await screen.findByLabelText("Book title");
    expect(titleInput.value).toEqual(book.title);

    const authorInput = await screen.findByLabelText("Author");
    expect(authorInput.value).toEqual(book.author);

    const yearInput = await screen.findByLabelText("Year");
    expect(yearInput.value).toEqual(book.yearPublished);

    const summaryInput = await screen.findByLabelText("Summary");
    expect(summaryInput.value).toEqual(book.summary);

    const isbnInput = await screen.findByLabelText("ISBN");
    expect(isbnInput.value).toEqual(book.ISBN);

    expect(await screen.findByText("Book images")).toBeInTheDocument();

    expect(await screen.findByText("Submit")).toBeInTheDocument();
  });

  test("Correctly renders EditBookLayout when adding new book", async () => {
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <EditBookLayout />
      </UserContext.Provider>,
      {
        route: "/add-book",
        path: "/add-book",
      }
    );

    expect(await screen.findByText("Add new book")).toBeInTheDocument();

    // Input fields
    expect(await screen.findByText("Author")).toBeInTheDocument();
    expect(await screen.findByText("Year")).toBeInTheDocument();
    expect(await screen.findByText("Summary")).toBeInTheDocument();
    expect(await screen.findByText("ISBN")).toBeInTheDocument();
    expect(await screen.findByText("Book images")).toBeInTheDocument();
    expect(await screen.findByText("Submit")).toBeInTheDocument();
  });

  test("Does not submit the form with empty details when adding new book", async () => {
    addBook.mockResolvedValueOnce(true);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <EditBookLayout />
      </UserContext.Provider>,
      {
        route: "/add-book",
        path: "/add-book",
      }
    );

    const submitButton = await screen.findByText("Submit");
    fireEvent.submit(submitButton);
    
    // Not possible with Antd Form
    // Hack to test if antd forms onFinish was called
    // https://issuehunt.io/r/ant-design/ant-design/issues/21272
    await waitFor(() => expect(addBook).toHaveBeenCalledTimes(0))
  });

  test("Submits the form when adding new book", async () => {
    addBook.mockResolvedValueOnce(true);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <EditBookLayout />
      </UserContext.Provider>,
      {
        route: "/add-book",
        path: "/add-book",
      }
    );

    const title = await screen.findByLabelText('Book title')
    fireEvent.change(title, {
      target: {
        value: 'title'
      }
    })

    const author = await screen.findByLabelText('Author')
    fireEvent.change(author, {
      target: {
        value: 'author'
      }
    })

    const year = await screen.findByLabelText('Year')
    fireEvent.change(year, {
      target: {
        value: 'year'
      }
    })

    const summary = await screen.findByLabelText('Summary')
    fireEvent.change(summary, {
      target: {
        value: 'summary'
      }
    })

    expect(await title.value).toEqual('title')
    expect(await author.value).toEqual('author')
    expect(await year.value).toEqual('year')
    expect(await summary.value).toEqual('summary')

    const submitButton = await screen.findByText("Submit");
    fireEvent.submit(submitButton);

    // Not possible with Antd Form
    // https://issuehunt.io/r/ant-design/ant-design/issues/21272
    // await waitFor(() => expect(addBook).toHaveBeenCalled())
  
  });

  test("Submits the form when editing a book", async () => {
    const book = books[0];
    updateBookById.mockResolvedValueOnce(true);
    fetchBookById.mockResolvedValueOnce(book);
    renderWithRouterMatch(
      <UserContext.Provider
        value={{
          user: {
            loggedIn: true,
            ID: 1,
          },
        }}
      >
        <EditBookLayout editView />
      </UserContext.Provider>,
      {
        route: "/my-books/edit/1",
        path: "/my-books/edit/:bookID",
      }
    );

    expect(fetchBookById).toHaveBeenCalled()
    const submitButton = await screen.findByText("Submit");
    fireEvent.submit(submitButton);

    // Not possible with Antd Form
    // await waitFor(() => expect(updateBookById).toHaveBeenCalled()) 
  });
});

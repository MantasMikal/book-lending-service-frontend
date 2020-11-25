import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input, message } from "antd";
import { Typography } from "antd";
import qs from "query-string";
import {
  deleteBookById,
  fetchBooksByUserId,
  searchBooks,
} from "../../../utilities/fetch-helpers";
import debounce from "../../../utilities/debounce";

import Container from "../../Primitive/Container";
import BookPreview from "../../Common/BookPreview";
import UserContext from "../../../contexts/user";
import Spinner from "../../Primitive/Spinner";

import styles from "./UserBooksLayout.module.scss";

const { Search } = Input;
const { Title } = Typography;

const UserBooksLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);
  const { ID, token } = user;
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Get All or search if no search term given
      if (!searchTerm) {
        const books = await fetchBooksByUserId(ID);
        !books && message.error("Error fetching books");
        setBooks(books);
      } else {
        const query = qs.stringify({
          q: searchTerm,
          userId: ID,
        });
        const books = await searchBooks(query);
        !books && message.error("Error fetching books");
        setBooks(books);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [ID, searchTerm]);

  const handleSearch = debounce((e) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, 150);

  const handleDelete = async (bookID) => {
    if (await deleteBookById(bookID, token)) {
      message.success("Book successfully deleted");
    } else {
      message.error("Error deleting book");
    }
    history.go(0)
  };

  const handleUpdate = (bookID) => {
    history.push(`/my-books/edit/${bookID}`);
  };

  return (
    <Container
      gutter
      fullHeight
      className={styles.UserBooksLayout}
    >
      <div className={styles.SearchWrapper}>
        <Title level={2}>
          {searchTerm ? `Searching your books for "${searchTerm}"` : "My Books"}
        </Title>
        <Search
          placeholder="Filter books by Title, author or isbn"
          allowClear
          enterButton={false}
          size="large"
          defaultValue={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : books && books.length > 0 ? (
        <div className={styles.BooksWrapper}>
          {books.map((book) => (
            <BookPreview
              {...book}
              withOwnerActions
              key={`Book-${book.ID}`}
              onDelete={() => handleDelete(book.ID)}
              onUpdate={() => handleUpdate(book.ID)}
            />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
    </Container>
  );
};

export default UserBooksLayout;
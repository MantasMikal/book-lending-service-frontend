import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input, message } from "antd";
import { Typography } from "antd";

import { deleteBookById, fetchBooksByUserId } from "../../utilities/fetch-helpers";
import Container from "../Container";
import BookPreview from "../BookPreview";
import UserContext from "../../contexts/user";
import Spinner from "../Spinner";

import styles from "./UserBooksLayout.module.scss";

const { Search } = Input;
const { Title } = Typography;

const UserBooksLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);
  const { ID, token } = user;
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const books = await fetchBooksByUserId(ID);
      !books && message.error("Error fetching books")
      setBooks(books);
      setIsLoading(false);
    };
    fetchData();
  }, [ID]);

  const handleDelete = async (bookId) => {
    // Delete
    if(await deleteBookById(bookId, token)) {
      message.success("Book successfully deleted")
    } else {
      message.error("Error deleting book")
    }

    // Update the book list after deleting
    setIsLoading(true);
    const books = await fetchBooksByUserId(ID);
    !books && message.error("Error fetching books")
    setBooks(books);
    setIsLoading(false);
  };

  const handleUpdate = (bookId) => {
    history.push(`/edit-book/${bookId}`);
  };

  return (
    <Container
      center
      gutter
      size="wide"
      fullHeight
      className={styles.UserBooksLayout}
    >
      <div className={styles.SearchWrapper}>
        <Title level={2}>My Books</Title>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={null}
        />
      </div>

      {!isLoading && books && books.length > 0 ? (
        <div className={styles.BooksWrapper}>
          {books.map((book) => (
            <BookPreview
              withOwnerActions
              key={`Book-${book.ID}`}
              {...book}
              onDelete={() => handleDelete(book.ID)}
              onUpdate={() => handleUpdate(book.ID)}
            />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default UserBooksLayout;

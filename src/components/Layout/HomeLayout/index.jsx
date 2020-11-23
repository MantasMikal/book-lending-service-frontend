import React, { useEffect, useState } from "react";
import { Input, message } from "antd";
import { Typography } from "antd";
import qs from "query-string";

import debounce from "../../../utilities/debounce";
import { fetchAllBooks, searchBooks } from "../../../utilities/fetch-helpers";
import Container from "../../Primitive/Container";
import BookPreview from "../../Common/BookPreview";
import Spinner from "../../Primitive/Spinner";

import styles from "./HomeLayout.module.scss";

const { Search } = Input;
const { Title } = Typography;

const HomeLayout = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(null);

  // Fetch all books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      if (!searchTerm) {
        const books = await fetchAllBooks();
        !books && message.error("Error fetching books");
        setBooks(books);
      } else {
        const query = qs.stringify({
          q: searchTerm,
        });
        const books = await searchBooks(query);
        !books && message.error("Error fetching books");
        setBooks(books);
      }
      setIsLoading(false);
    };
    fetchBooks();
  }, [searchTerm]);

  const handleSearch = debounce((e) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, 150);

  return (
    <Container
      gutter
      fullHeight
      className={styles.HomeLayout}
    >
      <div className={styles.SearchWrapper}>
        <Title level={2}>
          {searchTerm ? `Searching for "${searchTerm}"` : "All books available"}
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
            <BookPreview key={`Book-${book.ID}`} {...book} />
          ))}
        </div>
      ) : (
        <p>No books found</p>
      )}
    </Container>
  );
};

export default HomeLayout;

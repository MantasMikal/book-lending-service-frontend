import React, { useEffect, useState } from "react";
import { Input, message } from "antd";
import { Typography } from "antd";

import { fetchAllBooks } from "../../utilities/fetch-helpers";
import Container from "../Container";
import BookPreview from "../BookPreview";
import Spinner from "../Spinner";

import styles from "./HomeLayout.module.scss";

const { Search } = Input;
const { Title } = Typography;

const HomeLayout = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const data = await fetchAllBooks();
      !data && message.error("Error fetching books")
      setBooks(data);
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <Container center gutter size="wide" fullHeight className={styles.HomeLayout}>
      <div className={styles.SearchWrapper}>
        <Title level={2}>All books</Title>
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
            <BookPreview key={`Book-${book.ID}`} {...book} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default HomeLayout;

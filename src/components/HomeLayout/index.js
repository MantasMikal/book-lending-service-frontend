import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Typography } from "antd";
import { status, json } from "../../utilities/requestHandlers";

import styles from "./HomeLayout.module.scss";
import Container from "../Container";
import BookPreview from "../BookPreview";

const { Search } = Input;
const { Title } = Typography;

const HomeLayout = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/v1/books")
      .then(status)
      .then(json)
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.log("Error fetching books"));
  }, []);

  return (
    <Container center gutter size="wide" className={styles.HomeLayout}>
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
      <div className={styles.BooksWrapper}>
        {books.length > 0 ? (
          books.map((book) => <BookPreview key={`Book-${book.ID}`} {...book} />)
        ) : (
          <p>Loading books...</p>
        )}
      </div>
    </Container>
  );
};

export default HomeLayout;

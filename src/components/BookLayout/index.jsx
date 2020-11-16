import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import bookPlaceholder from "../../assets/images/book_placeholder.jpg";
import { status, json } from "../../utilities/requestHandlers";
import { useParams } from "react-router-dom";

import styles from "./BookLayout.module.scss";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import Container from "../Container";
import Badge from "../Badge";

const BookLayout = ({ match }) => {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(match);
    fetch(`http://localhost:3030/api/v1/books/${id}`)
      .then(status)
      .then(json)
      .then((bookData) => {
        setBook(bookData);
      })
      .catch((err) => {
        console.log(`Fetch error for post ${id}`);
      });
  }, []);

  const { imageURL, title, summary, yearPublished } = book;
  const image = imageURL || bookPlaceholder;

  return (
    <Container gutter center size="wide">
      {book ? (
        <div className={styles.BookLayout}>
          <div
            className={styles.Thumbnail}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={styles.BookDetails}>
            <div className={styles.TitleWrapper}>
            <Title className={styles.Title} level={2}>{title}</Title>
            <Badge status="On Loan" />
            </div>
            <Title className={styles.YearPublished} level={4}>{yearPublished}</Title>
            <Paragraph className={styles.Summary}>{summary}</Paragraph>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

BookLayout.propTypes = {};

export default BookLayout;

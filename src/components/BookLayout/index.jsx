import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message, Typography } from "antd";

import Container from "../Container";
import Badge from "../Badge";
import { imageUrlBuilderMany } from "../../utilities/image-builder";
import { fetchBookById } from "../../utilities/fetch-helpers";
import Spinner from "../Spinner";
import BookImages from "../BookImages";

import styles from "./BookLayout.module.scss";

const { Title, Paragraph } = Typography;

const BookLayout = () => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();
  const { title, summary, yearPublished, ISBN, images } = book;
  const bookImages = imageUrlBuilderMany(images);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchBookById(bookId);
      !data && message.error("Error fetching books");
      setBook(data);
      setIsLoading(false);
    };

    fetchData();
  }, [bookId]);

  if (isLoading)
    return (
      <Container gutter center size="wide" fullHeight>
        <Spinner />
      </Container>
    );

  return (
    <Container gutter center size="wide" fullHeight>
      <div className={styles.BookLayout}>
        <div className={styles.TitleWrapper}>
          <Title className={styles.Title} level={2}>
            {title}
          </Title>
          <Badge status="On Loan" />
        </div>
        <div className={styles.BookImages}>
          <BookImages images={bookImages} />
        </div>
        <div className={styles.BookDetails}>
          <Paragraph className={styles.YearPublished}>
            Year published: {yearPublished}
          </Paragraph>
          {ISBN && <Paragraph className={styles.ISBN}>ISBN: {ISBN}</Paragraph>}
          <Paragraph className={styles.Summary}>{summary}</Paragraph>
        </div>
      </div>
    </Container>
  );
};

export default BookLayout;

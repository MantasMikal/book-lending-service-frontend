import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message, Typography } from "antd";

import Container from "../Container";
import Badge from "../Badge";
import {imageUrlBuilderMany} from "../../utilities/image-builder";
import { fetchBookById } from "../../utilities/fetch-helpers";
import Spinner from "../Spinner";

import styles from "./BookLayout.module.scss";
import BookImages from "../BookImages";

const { Title, Paragraph } = Typography;

const BookLayout = () => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchBookById(id);
      !data && message.error("Error fetching books");
      setBook(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const { title, summary, yearPublished, images } = book;

  const bookImages = imageUrlBuilderMany(images)
  return (
    <Container gutter center size="wide" fullHeight>
      {!isLoading ? (
        <div className={styles.BookLayout}>
          <BookImages images={bookImages} />
          <div className={styles.BookDetails}>
            <div className={styles.TitleWrapper}>
              <Title className={styles.Title} level={2}>
                {title}
              </Title>
              <Badge status="On Loan" />
            </div>
            <Title className={styles.YearPublished} level={4}>
              {yearPublished}
            </Title>
            <Paragraph className={styles.Summary}>{summary}</Paragraph>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default BookLayout;

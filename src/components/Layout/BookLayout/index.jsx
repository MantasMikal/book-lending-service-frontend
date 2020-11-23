import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, message, Typography } from "antd";
import { imageUrlBuilderMany } from "../../../utilities/image-builder";
import { fetchBookById } from "../../../utilities/fetch-helpers";


import Container from "../../Primitive/Container";
import Badge from "../../Primitive/Badge";
import Spinner from "../../Primitive/Spinner";
import BookImages from "../../Common/BookImages";

import styles from "./BookLayout.module.scss";
import RequestBookModal from "../../Common/RequestBookModal";
import UserContext from "../../../contexts/user";

const { Title, Paragraph } = Typography;

const BookLayout = () => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();
  const { user } = useContext(UserContext);
  const history = useHistory()
  const {
    ID,
    title,
    summary,
    yearPublished,
    ISBN,
    images,
    requestID,
    status,
    ownerID,
  } = book;
  const bookImages = imageUrlBuilderMany(images);

  useEffect(() => {
    fetchData(bookId);
  }, [bookId]);

  const fetchData = async (bookId) => {
    setIsLoading(true);
    const data = await fetchBookById(bookId);
    !data && message.error("Error fetching books");
    setBook(data);
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <Container gutter fullHeight>
        <Spinner />
      </Container>
    );

  const canMakeARequest = !requestID && user.ID && user.ID !== ownerID;
  const canEdit = user.ID && user.ID === ownerID;
  return (
    <Container gutter fullHeight>
      <div className={styles.BookLayout}>
        <div className={styles.BookWrapper}>
          <div className={styles.BookImages}>
            <BookImages images={bookImages} />
          </div>
          <div className={styles.BookDetails}>
            <div className={styles.TitleWrapper}>
              <Title className={styles.Title} level={2}>
                {title}
              </Title>
              <div className={styles.Badge}>
                <Badge status={status} />
              </div>
              <div className={styles.Actions}>
                {canMakeARequest && (
                  <div className={styles.RequestBookModal}>
                    <RequestBookModal
                      title={`A request for "${title}"`}
                      bookID={ID}
                      onSubmit={() => fetchData(bookId)}
                    />
                  </div>
                )}
                {canEdit && <Button onClick={() => history.push(`/my-books/edit/${ID}`)} className={styles.EditButton}>Edit</Button>}
              </div>
            </div>
            <Paragraph className={styles.YearPublished}>
              Year published: {yearPublished}
            </Paragraph>
            {ISBN && (
              <Paragraph className={styles.ISBN}>ISBN: {ISBN}</Paragraph>
            )}
            <Paragraph className={styles.Summary}>{summary}</Paragraph>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookLayout;

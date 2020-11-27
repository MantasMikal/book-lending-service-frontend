import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { imageUrlBuilderMany } from "../../../utilities/image-builder";
import { fetchBookById, fetchUserById } from "../../../utilities/fetch-helpers";

import { Button, message, Typography } from "antd";
import Container from "../../Primitive/Container";
import Badge from "../../Primitive/Badge";
import Spinner from "../../Primitive/Spinner";
import BookImages from "../../Common/BookImages";
import RequestBookModal from "../../Common/RequestBookModal";
import UserContext from "../../../contexts/user";
import UpdateBookStatusModal from "../../Common/UpdateBookStatusModal";

import styles from "./BookLayout.module.scss";

const { Title, Paragraph } = Typography;

const BookLayout = () => {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bookID } = useParams();
  const { user } = useContext(UserContext);
  const history = useHistory();

  const {
    ID,
    title,
    summary,
    author,
    yearPublished,
    ISBN,
    images,
    requestID,
    status,
    ownerID,
    ownerUsername,
  } = book;
  const bookImages = imageUrlBuilderMany(images);

  useEffect(() => {
    fetchData(bookID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookID]);

  const fetchData = async (bookID) => {
    setIsLoading(true);
    const book = await fetchBookById(bookID);
    !book && message.error("Error fetching books");
    setBook(book);
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <Container gutter fullHeight>
        <Spinner />
      </Container>
    );

  const canMakeARequest =
    !requestID && user.ID && user.ID !== ownerID && status !== "On Loan";
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
                      ownerID={ownerID}
                      onSubmit={() => fetchData(bookID)}
                    />
                  </div>
                )}
                {canEdit && (
                  <>
                    <Button className={styles.EditButton}>
                      <a href={`/my-books/edit/${ID}`}>Edit</a>
                    </Button>
                    <UpdateBookStatusModal
                      bookID={ID}
                      initialStatus={status}
                      onSubmit={() => fetchData(bookID)}
                    />
                  </>
                )}
              </div>
            </div>
            {ownerUsername && (
              <Paragraph className={styles.YearPublished}>
                Book owner: <a href={`/user/${ownerID}`}>{ownerUsername}</a>
              </Paragraph>
            )}
            <Paragraph className={styles.YearPublished}>
              Book author: {author}
            </Paragraph>
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

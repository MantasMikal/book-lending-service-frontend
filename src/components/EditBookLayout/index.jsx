import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import Title from "antd/lib/typography/Title";

import Container from "../Container";
import UserContext from "../../contexts/user";
import {
  addBook,
  fetchBookById,
  updateBookById,
} from "../../utilities/fetch-helpers";
import validateFile from "../../utilities/validate-file";
import imageUrlBuilder from "../../utilities/image-builder";

import styles from "./EditBookLayout.module.scss";

const EditBookLayout = ({ editView }) => {
  console.log("EditBookLayout -> editView", editView)
  const [fileList, setFileList] = useState([]);
  const { user } = useContext(UserContext);
  const { ID, token } = user;
  const history = useHistory();
  const { bookId } = useParams();
  const [form] = Form.useForm();

  // Fetch book data and set it to form fields
  useEffect(() => {
    if (editView) {
      const fetchAndUpdateForm = async () => {
        const book = await fetchBookById(bookId);
        const { title, author, yearPublished, summary, ISBN, imageURL } = book;
        const bookData = {
          title: title,
          author: author,
          yearPublished: moment(yearPublished, "YYYY"),
          summary: summary,
          ISBN: ISBN !== "undefined" ? ISBN : "",
        };
        form.setFieldsValue(bookData); // Sets fetched fields to the form

        // Create a mock file and add it to the image uploader,
        // so you can send it back if it haven't changed
        // The backend will determine if the image already exists
        // from the file name
        imageURL &&
          setFileList([
            {
              uid: "-1",
              name: imageURL,
              status: "done",
              url: imageUrlBuilder(imageURL),
              originFileObj: new File([""], imageURL), // Mock file
            },
          ]);
      };

      fetchAndUpdateForm();
    }
  }, [bookId, editView, form]);

  // Extracts values from form fields and sends the data
  const onFinish = async (values) => {
    const { title, author, summary, ISBN, yearPublished } = values;
    const data = {
      title,
      author,
      summary,
      ISBN,
      yearPublished: moment(yearPublished).format("YYYY"),
      ownerID: ID,
    };

    // Append form data and images
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    fileList &&
      fileList.length > 0 &&
      fileList.forEach((file, i) => {
        formData.append(`image-${i}`, file.originFileObj);
      });

    if (editView) {
      await editBookRequest(bookId, formData, token);
    } else await addBookRequest(formData, token);
  };

  // Validates the file types and size before uploading
  const handleUpload = ({ fileList }) => {
    let goodFiles = [];
    fileList &&
      fileList.length > 0 &&
      fileList.forEach((file) => {
        const { originFileObj } = file;
        const allowedTypes = ["image/jpeg", "image/png"];
        const maxFileSize = 1024 * 1024 * 2; // 2MB
        if (validateFile(originFileObj, allowedTypes, maxFileSize)) {
          goodFiles.push(file);
        } else message.error("The file is too large or incorrect format!");
      });

    setFileList(goodFiles);
  };

  // Adds new book
  const addBookRequest = async (data, token) => {
    if (await addBook(data, token)) {
      message.success("Book has been addded");
      history.push("/my-books");
    } else {
      message.error("There was an error while adding your book");
    }
  };

  // Updates a book
  const editBookRequest = async (bookId, data, token) => {
    if (await updateBookById(bookId, data, token)) {
      message.success("Book has been updated");
      history.push("/my-books");
    } else {
      message.error("Error updating book");
    }
  };

  // Mock a dummy request so antd does not upload images right away
  const dummyRequest = ({ _, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Container center gutter size="wide">
      <Title level={2}>{editView ? "Edit book" : "Add new book"}</Title>
      <Form
        className={styles.Form}
        name="basic"
        form={form}
        onFinish={onFinish}
        labelCol={{ sm: { span: 6 }, lg: { span: 5 } }}
        labelAlign="left"
        encType="multipart/form-data"
      >
        <div className={styles.FormInner}>
          <div className={styles.FormWrapper}>
            <Form.Item
              label="Book title"
              name="title"
              rules={[{ required: true, message: "Please input book title" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                { required: true, message: "Please input the book author!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="yearPublished"
              label="Year"
              rules={[
                {
                  type: "object",
                  required: true,
                  message: "Please select the year",
                },
              ]}
            >
              <DatePicker picker="year" />
            </Form.Item>
            <Form.Item
              label="Summary"
              name="summary"
              rules={[
                {
                  required: true,
                  message: "Please write something about the book!",
                },
              ]}
            >
              <Input.TextArea showCount />
            </Form.Item>
          </div>
          <div className={styles.FormWrapper}>
            <Form.Item label="ISBN" name="ISBN">
              <Input />
            </Form.Item>
            <Form.Item name="images" label="Book images">
              <Upload
                onChange={handleUpload}
                customRequest={dummyRequest}
                listType="picture"
                accept="image/png, image/jpeg"
                fileList={fileList}
                multiple
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

EditBookLayout.propTypes = {
  editView: PropTypes.bool,
};

export default EditBookLayout;

/* istanbul ignore file */

import { message } from "antd";
import { status, json } from "./requestHandlers";
import config from "../config";

const { API_URL } = config;

/**
 * Fetch user by ID
 * @param {Number} ID - user Id
 * @returns {Object} user object
 */
export const fetchUserById = async (userID, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userID}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + token,
      },
    });
    const resStatus = await status(response);
    const resJson = await json(resStatus);
    return resJson;
  } catch (err) {
    message.error("Error fetching user");
  }
};

/**
 * Fetch book by ID
 * @param {Number} ID - book Id
 * @returns {Object} a book
 */
export const fetchBookById = async (ID) => {
  try {
    const response = await fetch(`${API_URL}/books/${ID}`);
    const resStatus = await status(response);
    const resJson = await json(resStatus);
    return resJson;
  } catch (err) {
    message.error("Error fetching books");
  }
};

/**
 * Fetch books by user ID
 * @param {Number} ID - user ID
 * @returns {Array} array of book objects
 */
export const fetchBooksByUserId = async (ID) => {
  try {
    const response = await fetch(`${API_URL}/books/user/${ID}`);
    const resStatus = await status(response);
    const resJson = await json(resStatus);
    return resJson;
  } catch (err) {
    console.log("Error fetching books", err);
  }
};

/**
 * Fetch all books
 * @returns {Array} array of book objects
 */
export const fetchAllBooks = async () => {
  console.log(`${API_URL}/books/user/`);
  try {
    const response = await fetch(`${API_URL}/books/`);
    const resStatus = await status(response);
    const resJson = await json(resStatus);
    return resJson;
  } catch (err) {
    console.log("Error fetching books", err);
  }
};

/**
 * Delete a book
 * @param {Number} bookID ID of the book
 * @param {String} token authorization token
 */
export const deleteBookById = async (bookID, token) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookID}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + token,
        "Content-Type": "application/json",
      },
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Error deleting book", err);
    return false;
  }
};

/**
 * Update a book
 * @param {Number} bookID ID of the book
 * @param {String} token authorization token
 * @param {FormData} data book data as FormData
 */
export const updateBookById = async (bookID, data, token) => {
  try {
    const response = await fetch(`${API_URL}/books/${bookID}`, {
      method: "PUT",
      headers: {
        Authorization: "Basic " + token,
      },
      body: data,
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Error updating book", err);
    return false;
  }
};

/**
 * Add a book
 * @param {String} token authorization token
 * @param {FormData} data book data as FormData
 */
export const addBook = async (data, token) => {
  try {
    const response = await fetch(`${API_URL}/books/`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
      },
      body: data,
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Error updating book", err);
    return false;
  }
};

/**
 * Authenticate user
 * @param {String} token auth token
 * @returns {Object} user object
 */
export const authenticate = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
      },
    });

    const respStatus = await status(response);
    const respJson = await json(respStatus);
    return respJson;
  } catch (err) {
    console.log("Login failed", err);
  }
};

/**
 * Register user
 * @param {Object} data user data
 * @returns {Boolean} true/false if success
 */
export const registerUser = async (data) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Login failed", err);
    return false;
  }
};

/**
 * Searches for books
 * @param {String} query query
 * @returns {Array} book objects
 */
export const searchBooks = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/search/books?${query}`,
      {
        method: "GET",
      }
    );
    const respStatus = await status(response);
    const respJson = await json(respStatus);
    return respJson;
  } catch (err) {
    console.log("Search failed", err);
    return false;
  }
};

/**
 * Gets user requests
 * @param {Number} id userID
 * @param {String} token Authentication token
 * @returns {Array} request objects
 */
export const getUserRequests = async (id, token) => {
  try {
    const response = await fetch(
      `${API_URL}/requests/user/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + token,
        },
      }
    );
    const respStatus = await status(response);
    const respJson = await json(respStatus);
    return respJson;
  } catch (err) {
    console.log("Could not get user requests", err);
    return false;
  }
};

/**
 * Gets user requests
 * @param {Number} requestId userID
 * @param {String} token Authentication token
 * @returns {Array} request objects
 */
export const getRequestById = async (requestId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/requests/${requestId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + token,
        },
      }
    );
    const respStatus = await status(response);
    const respJson = await json(respStatus);
    return respJson;
  } catch (err) {
    console.log("Could not get user requests", err);
    return false;
  }
};

/**
 * Makes a book request
 * @param {String} token authorization token
 * @param {Object} data request data
 */
export const requestBook = async (data, token) => {
  try {
    const response = await fetch(`${API_URL}/requests`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const respStatus = await status(response);
    const respJson = await json(respStatus);
    return respJson;
  } catch (err) {
    console.log("Error making book request", err);
    return false;
  }
};

/**
 * Makes a book request
 * @param {Number} bookID book ID
 * @param {String} token authorization token
 * @param {Object} data request data
 */
export const updateBookStatus = async (bookID, data, token) => {
  try {
    const response = await fetch(`${API_URL}/books/status/${bookID}`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Error updating book", err);
    return false;
  }
};

/**
 * Deletes/Cancels a book request
 * @param {Number} requestID request ID
 * @param {String} token authorization token
 */
export const deleteBookRequest = async (requestID, token) => {
  try {
    const response = await fetch(`${API_URL}/requests/${requestID}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + token,
      },
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Could not delete request", err);
    return false;
  }
};

/**
 * Send a message
 * @param {String} token authorization token
 * @param {Object} data message data
 * @returns {Boolean} true/false if success
 */
export const sendMessage = async (token, data) => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Could not send a message", err);
    return false;
  }
};

/**
 * Gets user requests
 * @param {Number} requestID ID of the request
 * @param {String} token Authentication token
 * @returns {Array} message objects
 */
export const getRequestMessages = async (requestID, token) => {
  try {
    const response = await fetch(
      `${API_URL}/messages/${requestID}`,
      {
        method: "GET",
        headers: {
          Authorization: "Basic " + token,
        },
      }
    );
    const respStatus = await status(response);
    const respJson = await json(respStatus);
    return respJson;
  } catch (err) {
    console.log("Could not get request messages", err);
    return false;
  }
};

/**
 * Archive request
 * @param {String} token authorization token
 * @returns {Boolean} true/false if success
 */
export const archiveRequest = async (requestID, token) => {
  try {
    const response = await fetch(`${API_URL}/requests/archive/${requestID}`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
      },
    });
    await status(response);
    return true;
  } catch (err) {
    console.log("Could not send a message", err);
    return false;
  }
};

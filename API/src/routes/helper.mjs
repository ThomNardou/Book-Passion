import { books } from "../db/mock-books.mjs";

const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

/**
* Generates and returns the next book id
* @param {*} books
*/
const getUniqueId = (books) => {
  const booksIds = books.map((book) => book.id);
  const maxId = booksIds.reduce((a, b) => Math.max(a, b));
  return maxId + 1;
};

/**
* Retrieves the book whose id is `bookId`.
* @param {*} bookId
*/
const getBook = (bookId) => {
  return books.find((book) => book.id == bookId);
};

/**
* Deletes the book whose id is `bookId`.
* @param {*} bookId
*/
const removeBook = (bookId) => {
  books = books.filter((book) => book.id != bookId);
};

/**
* Updates the book whose id is `bookId`.
* @param {*} bookId
* @param {*} updatedbook
*/
const updatebook = (bookId, updatedbook) => {
  books = books.map((book) =>
    book.id == bookId ? updatedbook : book
  );
};

export { success, getUniqueId, getBook, removeBook, updatebook };

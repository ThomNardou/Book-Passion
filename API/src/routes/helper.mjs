import { books } from "../db/mock-books.mjs";

const success = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

const getUniqueId = (books) => {
  const booksIds = books.map((book) => book.id);
  const maxId = booksIds.reduce((a, b) => Math.max(a, b));
  return maxId + 1;
  };

export { success, getUniqueId };

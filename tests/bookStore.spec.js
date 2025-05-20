import { test, expect, request } from '@playwright/test';
import { BookStoreAPI } from '../pages/bookStoreAPI.js';
import { AuthAPI } from '../pages/authAPI.js';

test('Get all books', async () => {
  const apiContext = await request.newContext();
  const bookStoreAPI = new BookStoreAPI(apiContext);

  const response = await bookStoreAPI.getAllBooks();
  expect(response.ok()).toBeTruthy();

  const books = await response.json();
  expect(books.books.length).toBeGreaterThan(0);
});

test('GET book by ISBN', async () => {
  const apiContext = await request.newContext();
  const bookStoreAPI = new BookStoreAPI(apiContext);

  const isbn = '9781449325862';
  const response = await bookStoreAPI.getBookByISBN(isbn);
  expect(response.ok()).toBeTruthy();

  const book = await response.json();
  expect(book.isbn).toBe(isbn);
  expect(book.title).toBeDefined();
});

test('Delete book if exists, then add it back to user collection', async () => {
  const apiContext = await request.newContext();
  const bookStoreAPI = new BookStoreAPI(apiContext);
  const authAPI = new AuthAPI(apiContext);

  const userName = 'Final User';
  const password = 'Start@123';
  const userId = '8b0b5ecd-f992-4bb2-9d27-7d5b5f544c1c';

  const tokenRes = await authAPI.generateToken(userName, password);
  expect(tokenRes.ok()).toBeTruthy();
  const { token } = await tokenRes.json();

  const authRes = await authAPI.authorize(userName, password);
  expect(await authRes.text()).toBe('true');

  const booksRes = await bookStoreAPI.getAllBooks();
  const booksData = await booksRes.json();
  const isbn = booksData.books[0].isbn;

  const deleteRes = await bookStoreAPI.deleteBook(userId, isbn, token);
  console.log('🗑️ Delete status:', deleteRes.status());

  const addBookRes = await bookStoreAPI.addBook(userId, isbn, token);
  const result = await addBookRes.json();
  console.log('📥 Add book response:', result);

  expect(addBookRes.ok()).toBeTruthy();
});

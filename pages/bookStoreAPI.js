export class BookStoreAPI {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.baseUrl = 'https://demoqa.com/BookStore/v1';
  }

  async getAllBooks() {
    const response = await this.apiContext.get(`${this.baseUrl}/Books`);
    return response;
  }

  async getBookByISBN(isbn) {
    const response = await this.apiContext.get(`${this.baseUrl}/Book?ISBN=${isbn}`);
    return response;
  }

  async addBook(userId, isbn, token) {
    const response = await this.apiContext.post(`${this.baseUrl}/Books`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        userId,
        collectionOfIsbns: [{ isbn }],
      },
    });
    return response;
  }

  async deleteBook(userId, isbn, token) {
    const response = await this.apiContext.delete(`${this.baseUrl}/Book`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        isbn,
        userId,
      },
    });
    return response;
  }
}

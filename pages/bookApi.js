import dotenv from "dotenv";
dotenv.config();

export class BookApi {
  constructor(request) {
    this.request = request;
    this.baseUrl = process.env.BASE_URL;
    this.authToken = process.env.AUTH_TOKEN;
    this.userId = process.env.USER_ID;
    this.isbn = process.env.ISBN_EXAMPLE; 
  }

 
  async handleResponse(response) {
    if (!response.ok()) {
      const errorBody = await response.json();
      console.error(`Error: ${errorBody.message}`);
      throw new Error(`Failed to fetch: ${response.statusText()}`);
    }
    return response.json();
  }


  async getBooks() {
    const response = await this.request.get(`${this.baseUrl}/Books`);
    return this.handleResponse(response);
  }

 
  async getBookByIsbn(isbn = this.isbn) {
    
    const response = await this.request.get(
      `${this.baseUrl}/Book?ISBN=${isbn}`
    );
    return this.handleResponse(response);
  }

  async addBook(isbn) {
    const bookDetails = {
      userId: this.userId,
      collectionOfIsbns: [{ isbn: isbn }],
    };

    const response = await this.request.post(`${this.baseUrl}/Books`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        "Content-Type": "application/json",
      },
      data: bookDetails,
    });

    const raw = await response.text();
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(`❌ Invalid JSON. Raw response: ${raw}`);
    }
  }


  async deleteBook(isbn) {
    const bookDetails = {
      userId: this.userId, 
      collectionOfIsbns: [{ isbn: isbn }], 
    };

    const response = await this.request.delete(`${this.baseUrl}/Book`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        "Content-Type": "application/json",
      },
      data: bookDetails,
    });

    return this.handleResponse(response);
  }
}

export class AuthAPI {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.baseUrl = 'https://demoqa.com/Account/v1';
  }

  async generateToken(userName, password) {
    const response = await this.apiContext.post(`${this.baseUrl}/GenerateToken`, {
      data: { userName, password },
    });
    return response;
  }

  async authorize(userName, password) {
    const response = await this.apiContext.post(`${this.baseUrl}/Authorized`, {
      data: { userName, password },
    });
    return response;
  }
}

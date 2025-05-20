import { test , expect} from "@playwright/test";
export class TablePage {
  constructor(page) {
    this.page = page;
    this.addButton = page.getByRole("button", { name: "Add" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.emailInput = page.getByRole("textbox", { name: "name@example.com" });
    this.ageInput = page.getByRole("textbox", { name: "Age" });
    this.salaryInput = page.getByRole("textbox", { name: "Salary" });
    this.departmentInput = page.getByRole("textbox", { name: "Department" });
    this.editButton = page.locator("#edit-record-1");
    this.deleteButton = page.locator("#delete-record-1");
    this.firstNameEditInput = page.locator("#firstName");
  }

  async navigate() {
    await this.page.goto("https://demoqa.com/webtables");
    await expect(this.page).toHaveTitle("DEMOQA");
  }

  async addUser(data) {
    await this.addButton.click();
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.ageInput.fill(data.age);
    await this.salaryInput.fill(data.salary);
    await this.departmentInput.fill(data.department);
    await this.submitButton.click();
  }

  async editFirstName(newName) {
    await this.editButton.click();
    await this.firstNameEditInput.clear();
    await this.firstNameEditInput.fill(newName);
    await this.submitButton.click();
  }

  async verifyFirstName(expectedName) {
    const locator = this.page.locator(
      `//div[normalize-space()="${expectedName}"]`
    );
    await expect(locator).toHaveText(expectedName);
  }

  async deleteUser() {
    await this.deleteButton.click();
  }
}

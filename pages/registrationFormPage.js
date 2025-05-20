import { expect } from "@playwright/test";

export class RegistrationFormPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.email = page.getByPlaceholder("name@example.com");
    this.genderMale = page.getByText("Male", { exact: true });
    this.mobile = page.getByPlaceholder("Mobile Number");
    this.dobInput = page.locator("#dateOfBirthInput");
    this.monthDropdown = page.locator(".react-datepicker__month-select");
    this.yearDropdown = page.locator(".react-datepicker__year-select");
    this.subjectInput = page.locator("#subjectsInput");
    this.hobbySports = page.getByText("Sports");
    this.pictureUpload = page.locator("#uploadPicture");
    this.address = page.getByRole("textbox", { name: "Current Address" });
    this.stateInput = page.locator("#react-select-3-input");
    this.cityInput = page.locator("#react-select-4-input");
    this.submitBtn = page.getByRole("button", { name: "Submit" });
    this.successMsg = page.getByText("Thanks for submitting the form");
    this.closeBtn = page.getByRole("button", { name: "Close" });
    this.validationMail = page.locator('#userEmail')
    this.validationMobile = page.locator('#userNumber')
  }

  async navigate() {
    await this.page.goto("https://demoqa.com/automation-practice-form");
    await expect(this.page).toHaveTitle("DEMOQA");
  }

  async fillBasicInfo(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.page.getByText(data.gender, { exact: true }).check();
    await this.mobile.fill(data.mobile);
  }
   
    async fillBasicInfoInvalid(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.invalidemail);
    await this.page.getByText(data.gender, { exact: true }).check();
    await this.mobile.fill(data.invalidmobile);
  }

  async selectDateOfBirth(year, month, day) {
    await this.dobInput.click();
    await this.yearDropdown.selectOption(year.toString());
    await this.monthDropdown.selectOption(month.toString());
    await this.page.click(
      `.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`
    );
  }

  async selectSubjects(subjects) {
    
     await expect(this.subjectInput).toBeVisible();
      await this.subjectInput.fill(subjects);
      await this.page.keyboard.press("Enter");
    
  }

  async selectHobbies() {
    await expect(this.hobbySports).toBeVisible();
   this.hobbySports.check()
  
}


  async uploadPicture(filePath) {
    await this.pictureUpload.setInputFiles(filePath);
  }

  async fillAddress(address) {
    await expect(this.address).toBeVisible();
    await this.address.fill(address);
  }

  async selectStateAndCity(state, city) {
    await this.stateInput.waitFor({ state: 'visible' });
    await this.stateInput.fill(state);
    await this.page.keyboard.press("Enter");
    await this.page.getByText("Select City").click();
    await this.cityInput.waitFor({ state: 'visible' });
    await this.cityInput.fill(city);
    await this.page.keyboard.press("Enter");
  }

  async submitForm() {
    await this.submitBtn.click();
  }

  async verifySubmission() {
    await expect(this.successMsg).toHaveText("Thanks for submitting the form");
  }
  async verifySubmissionNotVisible() {
  await expect(this.successMsg).not.toBeVisible()
}

async closeModal() {
  try {
    if (await this.closeBtn.isVisible()) {
      await this.closeBtn.click();
    } else {
      console.log("Close button is not visible.");
    }
  } catch (error) {
    console.log("No modal to close or error occurred while closing modal:", error);
  }
}


}

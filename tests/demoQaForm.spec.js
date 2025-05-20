import { test } from "@playwright/test";
import { RegistrationFormPage } from "../pages/registrationFormPage.js";
import testData from "../data/testData.json" assert { type: "json" };

test("User can fill and submit the registration form", async ({ page }) => {
  const form = new RegistrationFormPage(page);

  await form.navigate();
  await form.fillBasicInfo(testData);
  await form.selectDateOfBirth(
    testData.dob.year,
    testData.dob.month,
    testData.dob.day
  );
  await form.selectSubjects(testData.subjects);
  await form.selectHobbies();
  await form.uploadPicture(testData.picturePath);
  await form.fillAddress(testData.address);
  await form.selectStateAndCity(testData.state, testData.city);
  await form.submitForm();
  await form.verifySubmission();
  await form.closeModal();
}),
  test("Registration of customer with Invalid Data", async ({ page }) => {
    const form = new RegistrationFormPage(page);

    await form.navigate();
    await form.fillBasicInfoInvalid(testData);
    await form.selectDateOfBirth(
      testData.dob.year,
      testData.dob.month,
      testData.dob.day
    );
    await form.selectSubjects(testData.subjects);
    await form.selectHobbies();
    await form.uploadPicture(testData.picturePath);
    await form.fillAddress(testData.address);
    await form.selectStateAndCity(testData.state, testData.city);
    await form.submitForm();
    await form.verifySubmissionNotVisible();
  
  });

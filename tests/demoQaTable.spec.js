import { test } from "@playwright/test";
import { TablePage } from "../pages/tablePage";
import testData from "../data/tableData.json" assert { type: "json" };

test("User can add, edit, verify, and delete a table entry", async ({page,}) => {
  const table = new TablePage(page);

  await table.navigate();
  await table.addUser(testData);
  await table.editFirstName(testData.editedFirstName);
  await table.verifyFirstName(testData.editedFirstName);
  await table.deleteUser();
});

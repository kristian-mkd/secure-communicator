import { writeToFile, readFromFile } from "../src/services/fileService.js";

describe("File service tests", () => {
  test("Should verify read and write to a file", async () => {
    // given
    writeToFile("testFile.txt", "test message");

    // when
    const result = readFromFile("testFile.txt");

    // then
    expect(result).toBe("test message");
  });
});

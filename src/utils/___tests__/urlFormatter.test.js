import { formatUrl } from "../urlFormatter";

// "Describe" wraps a collection of tests
// "it" is for a single test. Jest can use "it" or "test" for a single test. They are aliases
describe("formatUrl unit tests", () => {
  it("should prefix a website url with www.", () => {
    expect(formatUrl("mywebsite.com")).toEqual("www.mywebsite.com");
  });

  it("should return an empty string when an empty string website is supplied", () => {
    expect(formatUrl("")).toEqual("");
  });

  it("should return an empty string when an undefined website is supplied", () => {
    expect(formatUrl()).toEqual("");
  });

  it("should not prefix a website url with www. if the url already contains www.", () => {
    expect(formatUrl("www.mywebsite.com")).toEqual("www.mywebsite.com");
  });
});

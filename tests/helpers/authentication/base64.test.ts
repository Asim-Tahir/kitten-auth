import { base64Decode, base64Encode } from "@/helpers";

describe("Base64 Functions", () => {
  describe("base64Encode()", () => {
    test("should encode plain text to base64 text", () => {
      expect(base64Encode("lorem")).toBe("bG9yZW0=");
    });
  });

  describe("base64Decode()", () => {
    test("should decode base64 text to plain text", () => {
      expect(base64Decode("bG9yZW0=")).toBe("lorem");
    });
  });
});

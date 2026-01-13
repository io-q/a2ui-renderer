import { describe, expect, test } from "bun:test";
import { email, required, currency } from "./index";

describe("stdlib validators", () => {
  test("email", () => {
    expect(email("test@example.com")).toBe(true);
    expect(email("invalid")).toBe(false);
  });

  test("required", () => {
    expect(required("valid")).toBe(true);
    expect(required("")).toBe(false);
  });
});

describe("stdlib formatters", () => {
  test("currency", () => {
    // Basic check, might depend on locale environment but usually USD works
    expect(currency(100, "USD")).toContain("100"); 
  });
});

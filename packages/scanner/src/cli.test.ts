import { describe, expect, test } from "bun:test";
import { execSync } from "child_process";

import { join } from "path";

describe("scanner cli", () => {
  test("help command runs", () => {
    const cliPath = join(import.meta.dirname, "cli.ts");
    const output = execSync(`bun run ${cliPath} --help`).toString();
    expect(output).toContain("Usage:");
  });
});

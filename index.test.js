const path = require("path");
const stylelint = require("stylelint");

function resolveFile(name) {
  return path.resolve(__dirname, `./css-examples/${name}`);
}

function extractErrorMessage(warnings) {
  return warnings.map(({ text }) => text);
}

describe("stylelint plugins", () => {
  it("should pass for valid css file", () => {
    return stylelint
      .lint({
        files: [resolveFile("valid.pcss")],
        configFile: resolveFile("config.js"),
      })
      .then(({ results }) => {
        expect(results).toHaveLength(1);
        expect(results[0].warnings).toHaveLength(0);
        expect(extractErrorMessage(results[0].warnings)).toMatchSnapshot();
      });
  });
  it("should throw error for invalid css file", () => {
    return stylelint
      .lint({
        files: [resolveFile("invalid.pcss")],
        configFile: resolveFile("config.js"),
      })
      .then(({ results }) => {
        expect(results).toHaveLength(1);
        expect(results[0].warnings).toHaveLength(4);
        expect(extractErrorMessage(results[0].warnings)).toMatchSnapshot();
      });
  });
});

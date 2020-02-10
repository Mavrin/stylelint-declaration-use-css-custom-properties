const path = require("path");
const stylelint = require("stylelint");

function resolveFile(name) {
  return path.resolve(__dirname, `./css-examples/${name}`);
}

describe("stylelint plugins", () => {
  it("should pass for valid css file", () => {
    return stylelint
      .lint({
        files: [resolveFile("valid.css")],
        configFile: resolveFile("config.js")
      })
      .then(({ results }) => {
        expect(results).toHaveLength(1);
        expect(results[0].warnings).toHaveLength(0);
      });
  });
  it("should throw error for invalid css file", () => {
    return stylelint
      .lint({
        files: [resolveFile("invalid.css")],
        configFile: resolveFile("config.js")
      })
      .then(({ results }) => {
        expect(results).toHaveLength(1);
        expect(results[0].warnings).toHaveLength(1);
      });
  });
});

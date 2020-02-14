const path = require("path");
module.exports = {
  extends: [require.resolve("stylelint-config-standard")],
  plugins: [path.resolve("./index")],
  rules: {
    "mavrin/stylelint-declaration-use-css-custom-properties": {
      cssDefinitions: ["color", "length", "rgba"],
      ignoreProperties: ["/^\\$/"],
      ignoreValues: ["/\\$/", "transparent"],
    },
  },
};

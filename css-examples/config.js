const path = require("path");
module.exports = {
  plugins: [path.resolve("./index")],
  rules: {
    "mavrin/stylelint-declaration-use-css-custom-properties": true
  }
};

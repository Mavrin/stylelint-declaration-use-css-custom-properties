const stylelint = require("stylelint");
const ruleName = "mavrin/stylelint-declaration-use-css-custom-properties";
const csstree = require("css-tree");

const messages = stylelint.utils.ruleMessages(ruleName, {
  parseError: function(value) {
    return `Can't parse value "${value}"`;
  },
  invalid: function(property) {
    return `Invalid value for \`${property}\``;
  }
});

module.exports = stylelint.createPlugin(ruleName, function({
  cssDefinitions = ["color"]
}) {
  return function(postcssRoot, postcssResult) {
    postcssRoot.walkDecls(function(decl) {
      let ast;

      try {
        ast = csstree.parse(decl.value, {
          context: "value",
          property: decl.prop
        });
      } catch (e) {
        return stylelint.utils.report({
          message: messages.parseError(decl.value),
          node: decl,
          result: postcssResult,
          ruleName: ruleName
        });
      }
      let match = csstree.lexer.matchType(cssDefinitions[0], ast);
      // match = syntax.matchProperty(decl.prop, ast);
      let error = match.error;
      if (error) {
        var message = error.rawMessage || error.message || error;

        // ignore errors except those which make sense
        if (
          error.name !== "SyntaxMatchError" &&
          error.name !== "SyntaxReferenceError"
        ) {
          console.log(error);
        }

        if (message === "Mismatch") {
          message = messages.invalid(decl.prop);
        }

        stylelint.utils.report({
          message: message,
          node: decl,
          result: postcssResult,
          ruleName: ruleName
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;

const stylelint = require("stylelint");
const ruleName = "mavrin/stylelint-declaration-use-css-custom-properties";
const csstree = require("css-tree");

const messages = stylelint.utils.ruleMessages(ruleName, {
  parseError: function(value) {
    return `Can't parse value "${value}"`;
  },
  unexpectedDecl: function(decl, definition) {
    return `Please use css custom property for next css definition \`${definition}\` in "${decl}"`;
  },
});

function isStringRegex(string) {
  return string[0] === "/" && string[string.length - 1] === "/";
}

function toRegex(string) {
  return new RegExp(string.slice(1, -1));
}

const ignorePredicate = (skipNames, value) => {
  if (!skipNames || skipNames.length === 0) {
    return false;
  }
  return Boolean(
    skipNames.find((name) => {
      if (isStringRegex(name)) {
        const regExp = toRegex(name);
        return regExp.test(value);
      }
      return value.includes(name);
    })
  );
};

module.exports = stylelint.createPlugin(ruleName, function({
  cssDefinitions = [],
  ignoreProperties,
  ignoreValues,
}) {
  return function(postcssRoot, postcssResult) {
    if (cssDefinitions.length === 0) {
      return;
    }
    postcssRoot.walkDecls(function(decl) {
      // ignore properties from ignore list
      if (
        ignorePredicate(ignoreProperties, decl.prop) ||
        ignorePredicate(ignoreValues, decl.value)
      ) {
        return;
      }
      let ast;

      try {
        ast = csstree.parse(decl.value, {
          context: "value",
        });
      } catch (e) {
        return stylelint.utils.report({
          message: messages.parseError(decl.value),
          node: decl,
          result: postcssResult,
          ruleName: ruleName,
        });
      }
      cssDefinitions.forEach((cssDefinition) => {
        const fragments = csstree.lexer.findValueFragments(
          decl.prop,
          ast,
          "Type",
          cssDefinition
        );
        if (fragments.length) {
          const message = messages.unexpectedDecl(
            decl.toString(),
            cssDefinition
          );

          stylelint.utils.report({
            message: message,
            node: decl,
            result: postcssResult,
            ruleName: ruleName,
          });
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;

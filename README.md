# stylelint-declaration-use-css-custom-properties

A [stylelint](https://stylelint.io/) custom rule to check the use of css custom properties on declaration.

## Motivation

This plugin will be useful if we want remove usage of css constants and replace on custom properties. For example if you want
add support theming in your css, you should replace all static css definitions on css custom properties.

### Example:

css before

```css
.some-rules {
  color: #000; // this declaration will be highlighted
  background: white; // this declaration will be highlighted
  border: 1px solid rgb(0, 255, 0, 0.5); // this declaration will be highlighted
  animation-name: red; // // this declaration will not highlighted, because is not color
  animation-duration: 4s;
}
```

css after

```css
:root {
  --textColor: #000;
  --bgColor: white;
  --borderColor: rgb(0, 255, 0, 0.5);
}

.some-rules {
  color: var(--textColor);
  background: var(--bgColor);
  border: 1px solid var(--borderColor);
  animation-name: red;
  animation-duration: 4s;
}
```

## Installation

```
npm install @mavrin/stylelint-declaration-use-css-custom-properties
```

## Usage

Add it to your stylelint config `plugins` array, then add `"mavrin/stylelint-declaration-use-css-custom-properties"` to your rules,
specifying the property for which you want to check the usage of css definitions. You can find existed css definitions in [csstree](https://github.com/csstree/csstree) [docs](https://csstree.github.io/docs/syntax/#Type:color)

Like so:

```js
// .stylelintrc
{
  //...
  "plugins": [
    // ...
    "mavrin/stylelint-declaration-use-css-custom-properties"
  ],
  rules: {
    //...
    "mavrin/stylelint-declaration-use-css-custom-properties": {
      cssDefinitions: ["color", "length"],
      ignoreProperties: ["/^\\$/"],
      ignoreValues: ["/\\$/", "transparent"],
    }
  },
}
```

# stylelint-declaration-use-css-custom-properties

A [stylelint](https://stylelint.io/) custom rule to check the use of css custom properties on declaration.

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

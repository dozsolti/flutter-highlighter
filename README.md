
# Flutter Highlighter

Improve Flutter code clarity by auto-dimming less important widgets.

![Demo](./images/demo.gif)


## Before vs After
![Before vs After](./images/before-vs-after.jpg)


## Commands

| Command | Description |
| --- | --- |
| `flutter-highlighter.highlight` | Highlights important widgets in the current file. |


##  Widgets

> Currently supporting only a handfull of layout widgets. More coming soon.

See full list [here](./src/widgets.js).

## Settings

| Command | Type | Default | Example | Description |
| --- | --- | --- | --- | --- |
| `flutter-highlighter.highlightOnFocus` | `boolean` | `true` | | Should it automatically highlight the focused widget? |
| `flutter-highlighter.opacity` | `number` | `0.5` | | The opacity of the faded widgets. Must be between `0 - 0.99`. |
| `flutter-highlighter.includedWidgets` | `array` | `[]` | `{ name: "Form", type: "children" }` `{ name: "SizedBox", type: "custom", regex: regexSizedBox }` | List of **extra** widgets to fade. Currently it supports `child`, `children` or `custom` types. |
| `flutter-highlighter.excludedWidgets` | `array` | `[]` | `'Padding'` | List of widgets to keep visible.  |


## Feedback

If you have any feedback, please reach out to me in the Issues tab.


## License

[MIT](https://choosealicense.com/licenses/mit/)


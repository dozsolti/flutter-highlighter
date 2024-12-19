
# Flutter Highlighter

Simplify your Flutter code readability by auto-fading lesser important widgets.

![Before vs After](./images/before-vs-after.jpg)


## Commands

| Command | Description |
| --- | --- |
| `flutter-highlighter.highlight` | Highlights widgets in the current file. |

## Settings

| Command | Type | Default | Example | Description |
| --- | --- | --- | --- | --- |
| `flutter-highlighter.highlightOnFocus` | `boolean` | `true` | | Should it automatically highlight the focused widget? |
| `flutter-highlighter.opacity` | `number` | `0.5` | | The opacity of the faded widgets. Must be between `0 - 0.99`. |
| `flutter-highlighter.includedWidgets` | `array` | `[]` | `{ name: "Form", type: "children" }` `{ name: "SizedBox", type: "custom", regex: regexSizedBox }` | List of extra widgets to fade. Currently it supports `child`, `children` or `custom` types. |
| `flutter-highlighter.excludedWidgets` | `array` | `[]` | `'Padding'` | List of widgets to disable the fading. Use the widgets name.  |


## Demo

![Demo](./images/demo.gif)


## Feedback

If you have any feedback, please reach out to me in the Issues tab.


## License

[MIT](https://choosealicense.com/licenses/mit/)


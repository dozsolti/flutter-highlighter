
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

> Currently supporting the most common 33 widgets. More coming soon.
See full list [here](./src/widgets.js).

### Do you think I missed one important leave me a not in the [issues section](https://github.com/dozsolti/flutter-highlighter/issues).


## Settings

| Command | Type | Default | Example | Description |
| --- | --- | --- | --- | --- |
| `flutter-highlighter.highlightOnFocus` | `boolean` | `true` | | Should it automatically highlight the focused widget? |
| `flutter-highlighter.opacity` | `number` | `0.5` | | The opacity of the faded widgets. Must be between `0 - 0.99`. |
| `flutter-highlighter.excludedWidgets` | `array` | `[]` | `'Padding'` | List of widgets to keep visible.  |
| `flutter-highlighter.includedWidgets` | `map` | `{}` | `{ "StreamBuilder": { properties: [{ name: "stream" }, { name: "builder", type: "function" }] } }` | Extra widgets you want to fade. Make the map's key the name of the widget and set an array of properties with `name` **defining the properties you want to keep highlighted**. In case of a property which is a function like `StreamBuilder`'s builder set the `"type":"function"` or in case of a property that has multiple values like `Column`'s children set the `"wrapper": "[]"`. See the full list for more [examples](./src/widgets.js). |


## Updates
- `v0.2.0`
    - Switched to a **list** of properties, to support builder and delegated widgets.
    
- `v0.1.0`
    - Had a major rewrite to support optionaly empty (no children) widgets. Both `Container(width: 250, child: ... )` and `Container(height: 250)` are valid widgets.
    - Added fade for the whole widget, not just until the property.
        - Ex. `Container(width: 250, child: ..., padding: ... )` now both *width* and *padding* are dimmed.
    - Bundle size reduced from `22MB` to `980KB`.


## Feedback

If you have any feedback, please reach out to me in the [issues section](https://github.com/dozsolti/flutter-highlighter/issues).


## License

[MIT](https://choosealicense.com/licenses/mit/)


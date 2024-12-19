const vscode = require('vscode');

const Settings = {
    extensionId: "flutter-highlighter",

    settings: {
        highlightOnFocus: true,
        opacity: 0.5,
        includedWidgets: [],
        excludedWidgets: [],
    },

    load() {
        const config = vscode.workspace.getConfiguration(this.extensionId)

        if (config.has("highlightOnFocus"))
            this.settings.highlightOnFocus = config.get("highlightOnFocus");

        if (config.has("opacity"))
            this.settings.opacity = config.get("opacity");

        if (config.has("includedWidgets"))
            this.settings.includedWidgets = config.get("includedWidgets");

        if (config.has("excludedWidgets"))
            this.settings.excludedWidgets = config.get("excludedWidgets");
    },


    get(key) {
        vscode.workspace.getConfiguration(Settings.extensionId).get(key);
    },

    set(key, value) {
        vscode.workspace.getConfiguration(Settings.extensionId).update(key, value, true);
    }
}
module.exports = { Settings }
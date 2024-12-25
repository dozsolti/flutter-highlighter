const vscode = require('vscode');

const { Settings } = require('../settings');
const { parseMatch } = require('../utils/parser');
const { generateRegex } = require('../utils/regex');

class ExtensionHighlight {

    static command = "flutter-highlighter.highlight";

    /**
     * @type {vscode.TextEditor} 
     */
    activeEditor = null;

    /**
     * @type {vscode.Range[]}
     */
    fadedRanges = [];

    /**
     * @type {vscode.Range[]}
     */
    highlightedRanges = [];

    styleFade = vscode.window.createTextEditorDecorationType({ opacity: "0.5" });
    styleHighlight = vscode.window.createTextEditorDecorationType({ opacity: "1" });

    includedWidgets = {};
    excludedWidgets = [];

    setActiveEditor(editor) {
        if (!editor || !editor.document)
            return;

        if (editor.document.languageId != 'dart')
            return;

        this.activeEditor = editor;
    }

    reloadSettings() {
        this.styleFade = vscode.window.createTextEditorDecorationType({ opacity: Settings.settings.opacity.toString() });

        this.includedWidgets = Settings.settings.includedWidgets;
        this.excludedWidgets = Settings.settings.excludedWidgets;
    }

    highlight() {
        if (!this.activeEditor)
            return;


        this.fadedRanges = [];
        this.highlightedRanges = [];

        const text = this.activeEditor.document.getText();
        let match;

        let runs = 0;
        let regx = generateRegex({
            excludes: this.excludedWidgets,
            includes: this.includedWidgets
        });

        while (match = regx.exec(text)) {
            runs++;
            this._exec(match);
        }

        console.log("computed");
        this.activeEditor.setDecorations(this.styleFade, this.fadedRanges);
        this.activeEditor.setDecorations(this.styleHighlight, this.highlightedRanges);
    }

    updateHighlights() {
        return;
        if (!this.activeEditor)
            return;

        console.log("Cursor updated");
        // Fade everything that was selected
        this.fadedRanges = this.fadedRanges.concat(this.highlightedRanges);
        this.highlightedRanges = []

        // Highlight where I am now
        const cursor = vscode.window.activeTextEditor.selection.active;
        let selected = this.fadedRanges.findIndex(el => el.contains(cursor))
        if (selected == -1) return;

        this.highlightedRanges = [
            this.fadedRanges[selected]
        ];
        this.fadedRanges.splice(selected, 1);

        // Recommended: Don't update a line twice
        this.activeEditor.setDecorations(this.styleFade, this.fadedRanges);
        this.activeEditor.setDecorations(this.styleHighlight, this.highlightedRanges);
    }

    /**
     * @param {RegExpExecArray} match 
     */
    _exec(match) {

        const sections = parseMatch(match, this.includedWidgets).map(s =>
            new vscode.Range(
                this.activeEditor.document.positionAt(s.startIndex),
                this.activeEditor.document.positionAt(s.endIndex),
            ));

        if (sections.some(x => x.contains(this.activeEditor.selection.active)))
            this.highlightedRanges.push(...sections);
        else
            this.fadedRanges.push(...sections);
    }

}
const highlighter = new ExtensionHighlight();

module.exports = { highlighter, ExtensionHighlight };
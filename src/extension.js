const { Settings } = require('./settings');
const { highlighter, ExtensionHighlight } = require('./commands/highlight');

const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate({ subscriptions }) {
	Settings.load();

	highlighter.setActiveEditor(vscode.window.activeTextEditor);
	highlighter.reloadSettings();
	highlighter.highlight();

	const highlightCommand = vscode.commands.registerCommand(ExtensionHighlight.command, function () {
		highlighter.setActiveEditor(vscode.window.activeTextEditor);
		highlighter.highlight();
	});

	const changeActiveTextEditor = vscode.window.onDidChangeActiveTextEditor(() => {
		if (!vscode.window.activeTextEditor) return;

		highlighter.setActiveEditor(vscode.window.activeTextEditor);
		highlighter.highlight();
	});

	const changeTextEditorSelection = vscode.window.onDidChangeTextEditorSelection(() => {
		if (!Settings.settings.highlightOnFocus) return;
		highlighter.highlight();
	});


	const changeConfiguration = vscode.workspace.onDidChangeConfiguration((event) => {
		if (event.affectsConfiguration(Settings.extensionId)) {
			Settings.load();
			highlighter.reloadSettings();
		}
	})


	subscriptions.push(changeActiveTextEditor)
	subscriptions.push(changeTextEditorSelection)
	subscriptions.push(changeConfiguration)

	subscriptions.push(highlightCommand);

};

module.exports.activate = activate;

module.exports.deactivate = ({ subscriptions }) => {

	subscriptions.forEach((subscription) => subscription.dispose())
};

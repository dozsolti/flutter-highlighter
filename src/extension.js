const { regx } = require('./regx');
const vscode = require('vscode');
var window = vscode.window;
var workspace = vscode.workspace;

var DEFAULT_STYLE = {
	opacity: "0.5",
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	var activeEditor = window.activeTextEditor;
	// var pattern = /((Padding|Center|Expanded|Container)\(.+?(?=child)child:\s*)|((Column|Row)\(.+?(?=children)children:[^[]*)|((Scaffold)\(.+?(?=appBar)appBar:\s*)/gis;

	console.log(1)
	function init() {
		console.log(2)
		if (!activeEditor || !activeEditor.document) {
			return;
		}
		var text = activeEditor.document.getText();
		var mathes = {}, match, decorationTypes = {};

		activeEditor.setDecorations(window.createTextEditorDecorationType({}),
			[new vscode.Range(
				activeEditor.document.positionAt(0),
				activeEditor.document.positionAt(text.length)
			)]
		);
		var styleForRegExp = Object.assign({}, DEFAULT_STYLE, {
			overviewRulerLane: vscode.OverviewRulerLane.Right
		});

		while (match = regx.exec(text)) {
			var startPos = activeEditor.document.positionAt(match.index);
			var endPos = activeEditor.document.positionAt(match.index + match[0].length);
			var decoration = {
				range: new vscode.Range(startPos, endPos)
			};

			var matchedValue = match[0];
			if (!false) {
				matchedValue = matchedValue.toUpperCase();
			}

			if (mathes[matchedValue]) {
				mathes[matchedValue].push(decoration);
			} else {
				mathes[matchedValue] = [decoration];
			}

			if (!decorationTypes[matchedValue]) {
				decorationTypes[matchedValue] = window.createTextEditorDecorationType(styleForRegExp);
			}

			Object.keys(decorationTypes).forEach((v) => {
				if (!false) {
					v = v.toUpperCase();
				}
				var rangeOption = true && mathes[v] ? mathes[v] : [];
				var decorationType = decorationTypes[v];
				activeEditor.setDecorations(decorationType, rangeOption);
			})

		}

		console.log("Hi");
	}
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('flutter-highlighter.init', function () {
		// The code you place here will be executed every time your command is executed

		init();
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Flutter Highlighter!');
	});

	context.subscriptions.push(disposable);

	window.onDidChangeActiveTextEditor(function (editor) {
		activeEditor = editor;
		if (editor) {
			init();
		}
	}, null, context.subscriptions);

	workspace.onDidChangeTextDocument(function (event) {
		if (activeEditor && event.document === activeEditor.document) {
			init();
		}
	}, null, context.subscriptions);


}

module.exports.activate = activate

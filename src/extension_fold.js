const { regx } = require('./regx');
const vscode = require('vscode');
var window = vscode.window;
var workspace = vscode.workspace;


function FoldedDecorationType() {
	return window.createTextEditorDecorationType({
		before: {
			contentIconPath: undefined,
			backgroundColor: "#a2a2a2",// ?? "transparent",
			// margin: "0 0 0 -5px",
		},
		after: {
			contentText: "z-folded",// ?? "class",
			backgroundColor: "#a2a2a2",// ?? "transparent",
			color: "#7cdbfe7e",
		},
		textDecoration: "none; display: none;",
	})
}
function UnfoldedDecorationType() {
	return window.createTextEditorDecorationType({
		rangeBehavior: vscode.DecorationRangeBehavior.OpenOpen,
		opacity: "0.6",
	})
}

let unfoldedDecorationType = UnfoldedDecorationType()
let foldedDecorationType = FoldedDecorationType()





/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let activeEditor = window.activeTextEditor;
	var pattern = /((Padding|Center|Expanded|Container)\(.+?(?=child)child:\s*)|((Column|Row)\(.+?(?=children)children:[^[]*)|((Scaffold)\(.+?(?=appBar)appBar:\s*)/gis;

	let regEx = /(class|className)(?:=|:|:\s)((({\s*?.*?\()([\s\S]*?)(\)\s*?}))|(({?\s*?(['"`]))([\s\S]*?)(\8|\9\s*?})))/g

	function isRangeSelected(range) {
		return !!(
			activeEditor.selection.contains(range) || activeEditor.selections.find((s) => range.contains(s))
		)
	}

	function isLineOfRangeSelected(range) {
        return !!activeEditor.selections.find((s) => s.start.line === range.start.line)
    }

	console.log(1)
	function init() {
		if (!activeEditor) {
			return
		}
		// if (!supportedLanguages.includes(activeEditor.document.languageId)) {
		//     return
		// }

		const documentText = activeEditor.document.getText()
		let foldedRanges = []
		let unfoldedRanges = []

		let match

		while ((match = regx.exec(documentText))) {
			let matchedGroup

			for (const group of [0]) {
				if (match[group]) {
					matchedGroup = group
					break
				}
			}

			if (matchedGroup === undefined) {
				continue
			}

			const text = match[0]
			const textToFold = match[matchedGroup]
			const foldStartIndex = 0;//text.indexOf(textToFold)

			const foldStartPosition = activeEditor.document.positionAt(match.index + foldStartIndex)

			const foldEndPosition = activeEditor.document.positionAt(
				match.index + foldStartIndex + textToFold.length
			)
			const range = new vscode.Range(foldStartPosition, foldEndPosition)

			if (
				!true ||
				isRangeSelected(range) ||
				(true && isLineOfRangeSelected(range))
			) {
				unfoldedRanges.push(range)
				continue
			}

            foldedRanges.push(range)
		}


		activeEditor.setDecorations(unfoldedDecorationType, unfoldedRanges)
		activeEditor.setDecorations(foldedDecorationType, foldedRanges)

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

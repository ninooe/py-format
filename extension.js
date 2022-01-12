// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "py-format" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('py-format.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from py-format!');
	});
	let lines2list = vscode.commands.registerCommand('python-formater.lines2list', () => {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            editor.edit(editBuilder => {
                editor.selections.forEach(sel => {
                    const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                    let string2edit = document.getText(range);
					let reg = "\n";
					// let regoverwrite = string2edit.match('this');
					let regoverwrite = string2edit.match('^#(.*)# ');
					if (regoverwrite != null) {
						reg = regoverwrite[1];
						string2edit = string2edit.slice(regoverwrite[0].length);
					}
					// string to array
					arrayOfLines = string2edit.split(reg);
					arrayOfLines.forEach((item, index) => {
						arrayOfLines[index] = '\"'.concat(item, '\"');
					})
					string2edit = arrayOfLines.join(',\n');
					// add brackets
					let retstring = "[\n".concat(string2edit, "\n]");
					editBuilder.replace(range, retstring);
                })
            }) // apply the (accumulated) replacement(s) (if multiple cursors/selections)
		}
	});
	let lines2dict
	context.subscriptions.push(disposable, lines2list);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

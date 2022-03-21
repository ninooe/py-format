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
	let lines2list = vscode.commands.registerCommand('py-format.lines2list', () => {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
			let conf = vscode.workspace.getConfiguration('py-format');
            const document = editor.document;
            editor.edit(editBuilder => {
                editor.selections.forEach(sel => {
                    const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                    let string2edit = document.getText(range);
					let reg = conf.get('listSeperator');
					let regoverwrite = string2edit.match(conf.get('listRegex'));
					if (regoverwrite != null) {
						reg = regoverwrite[1];
						string2edit = string2edit.slice(regoverwrite[0].length);
					}
					// string to array
					arrayOfLines = string2edit.split(reg);
					let regexList = [/True/, /False/];
					arrayOfLines.forEach((item, index) => {
						var isMatch = regexList.some(rx => rx.test(item));
						if (!isMatch) {
							arrayOfLines[index] = '\"'.concat(item, '\"');
						  } 
					})
					string2edit = arrayOfLines.join(',\n');
					// add brackets
					let retstring = "[\n".concat(string2edit, "\n]");
					editBuilder.replace(range, retstring);
                })
            }) // apply the (accumulated) replacement(s) (if multiple cursors/selections)
		}
	});
	// let lines2dict = vscode.commands.registerCommand('py-format.lines2dict', () => {
	// 	const editor = vscode.window.activeTextEditor;
    //     if (editor) {
	// 		let conf = vscode.workspace.getConfiguration('py-format');
    //         const document = editor.document;
    //         editor.edit(editBuilder => {
    //             editor.selections.forEach(sel => {
    //                 const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
	// 				let string2edit = document.getText(range);
	// 				let regSep = conf.get('dictSeperator');
	// 				let regoverwrite = string2edit.match(conf.get('dictRegex'));
	// 				if (regoverwrite != null) {
	// 					regAsg = regoverwrite[1];
	// 					regSep = regoverwrite[2];
	// 					string2edit = string2edit.slice(regoverwrite[0].length);
	// 				}
					
	// 				const dictFormat = (string) => {

	// 				}

	// 				this: this

	// 				let retstring = "0";



	// 				vscode.window.showInformationMessage();
	// 				editBuilder.replace(range, retstring);
    //             })
    //         }) // apply the (accumulated) replacement(s) (if multiple cursors/selections)
	// 	}
	// });
	context.subscriptions.push(disposable, lines2list, lines2dict);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

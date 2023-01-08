// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {TextDocument, Position, CancellationToken, Hover, MarkdownString} from 'vscode';

import { getHovers } from './generated/docs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const hovers: Map<string, string> = getHovers();

    const disposable = vscode.languages.registerHoverProvider('cordy', {
        provideHover(document: TextDocument, position: Position, token: CancellationToken) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (hovers.has(word)) {
                const doc = hovers.get(word)
                return new Hover(new MarkdownString(doc))
            }
        }
    });

    context.subscriptions.push(disposable);

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    //console.log('Congratulations, your extension "cordy-hover" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    //let disposable = vscode.commands.registerCommand('cordy-language-support.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
    //	vscode.window.showInformationMessage('Hello World from cordy-hover!');
    //});

    //context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

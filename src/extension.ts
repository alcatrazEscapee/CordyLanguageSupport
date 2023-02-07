import { languages, ExtensionContext, TextDocument, Position, CancellationToken, Hover, MarkdownString, Disposable } from 'vscode';
import { getHovers } from './generated/docs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    const hovers: Map<string, string> = getHovers();
    const disposable: Disposable = languages.registerHoverProvider('cordy', {
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
}

// This method is called when your extension is deactivated
export function deactivate() {}

import {EditorState, EditorSelection} from '@codemirror/state';

function excludeFirstAndLastLineFromSelection() {
    return EditorState.transactionFilter.of(tr => {
        if (tr.docChanged)
            return tr;

        const {doc} = tr.startState;
        const lineCount = doc.lines;
        const firstLine = doc.line(1); // Example {'from': 0,'to': 5,'number': 1,'text': '.foo{'}
        const lastLine = doc.line(lineCount);
        const [allowedFrom, allowedTo] = [firstLine.to + 1, lastLine.from];

        let sel = tr.newSelection
        if (!sel.ranges.some(({from, to}) => from < allowedFrom || to > allowedTo))
            return tr
        let clip = n => Math.min(Math.max(n, allowedFrom), allowedTo)
        return [tr, {
            selection: EditorSelection.create(
                sel.ranges.map(r => EditorSelection.range(clip(r.anchor), clip(r.head))),
                sel.mainIndex
            )
        }]
    });
}

function preventFirstLastLineDeletion() {
    return EditorState.transactionFilter.of(tr => {
        if (!tr.docChanged)
            return tr;

        // Check if the transaction modifies the first or last line
        const {doc} = tr.startState;
        const lineCount = doc.lines;
        const firstLine = doc.line(1); // Example {'from': 0,'to': 5,'number': 1,'text': '.foo{'}
        const lastLine = lineCount > 1 ? doc.line(lineCount) : null;

        const modifiedFirst = tr.changes.touchesRange(firstLine.from, firstLine.to);
        const modifiedLast = lastLine && tr.changes.touchesRange(lastLine.from, lastLine.to);
        // If the transaction modifies the firstLine or last line, reject it
        if (modifiedFirst || modifiedLast) {
            return null;
        }

        return tr;
    });
}

export {
    excludeFirstAndLastLineFromSelection,
    preventFirstLastLineDeletion,
};

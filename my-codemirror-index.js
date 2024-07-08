import {highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, highlightActiveLine, keymap} from '@codemirror/view';
import {EditorView} from '@codemirror/view';
import {EditorState} from '@codemirror/state';
import {indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap} from '@codemirror/language';
import {defaultKeymap, history, historyKeymap} from '@codemirror/commands';
import {highlightSelectionMatches, searchKeymap} from '@codemirror/search';
import {closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap} from '@codemirror/autocomplete';
import {lintKeymap} from '@codemirror/lint';

const mySetup = /*@__PURE__*/(() => [
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap
    ])
])();

export {EditorView, mySetup};

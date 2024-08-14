import {
    drawSelection,
    dropCursor,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    keymap,
} from '@codemirror/view';
import {EditorView} from '@codemirror/view';
import {EditorState} from '@codemirror/state';
import {
    bracketMatching,
    defaultHighlightStyle,
    indentOnInput,
    syntaxHighlighting,
} from '@codemirror/language';
import {defaultKeymap, history, historyKeymap} from '@codemirror/commands';
import {highlightSelectionMatches, searchKeymap} from '@codemirror/search';
import {
    autocompletion,
    closeBrackets,
    closeBracketsKeymap,
    completionKeymap,
} from '@codemirror/autocomplete';
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
        ...completionKeymap,
        ...lintKeymap
    ])
])();

export {EditorView, mySetup};

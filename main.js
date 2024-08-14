import {sass} from '@codemirror/lang-sass';
import {
    excludeFirstAndLastLineFromSelection,
    preventFirstLastLineDeletion,
} from './funcs';
import {EditorView, mySetup} from './my-codemirror-index';

/**
 * Example usage
 * ```javascript
 * const createBundle = (createEditorView, {defaultSettings, EditorView}) => ({
 *     view: createEditorView({
 *         ...defaultSettings,
 *         doc: '.foo {\n  bar: "1";\n},
 *         extensions: [
 *             ...defaultSettings.extensions,
 *             EditorView.updateListener.of(e => {
 *                 if (e.docChanged)
 *                     console.log('Got new scss %s', e.state.doc.toString());
 *             })
 *         ],
 *     }),
 *     myStuff1: 'foo',
 *     myStuff2: 'bar',
 * });
 * const el = document.querySelector('div.my-editor');
 * const bundle = window.renderCodeMirror6(el, createBundle);
 * const editorView = bundle.view;
 * ```
 * @template T
 * @param {HTMLElement} renderTo
 * @param {(
 *   createEditorView: (settings: Object) => ({view: EditorView;} & T),
 *   stuff: {defaultSettings: Object; EditorView: todo; excludeFirstAndLastLineFromSelection: Function; preventFirstLastLineDeletion: Function;}
 * ) => ({view: EditorView} & T)} createBundle
 * @returns {{view: EditorView;} & T}
 */
export default (
    renderTo,
    createBundle = (createEditorView, stuff) => ({view: createEditorView(stuff.defaultSettings)}),
) => {
    const defaultSettings = {
        extensions: [mySetup, sass()],
        parent: renderTo
    };
    const stuff = {
        defaultSettings,
        EditorView,
        excludeFirstAndLastLineFromSelection,
        preventFirstLastLineDeletion,
    };
    return createBundle(
        settings => new EditorView(settings),
        stuff,
    );
};

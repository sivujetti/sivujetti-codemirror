import {EditorView, mySetup} from './my-codemirror-index';
import {sass} from '@codemirror/lang-sass';

/**
 * Example usage
 * ```javascript
 * const createSettings = (defaultSettings, {EditorView}) => ({
 *     ...defaultSettings,
 *     ...{
 *         doc: '.foo {\n  bar: "1";\n},
 *         extensions: [
 *             ...defaultSettings.extensions,
 *             EditorView.updateListener.of(e => {
 *                 if (e.docChanged)
 *                     console.log('Got new scss %s', e.state.doc.toString());
 *             })
 *         ]
 *     }
 * });
 * const el = document.querySelector('div.my-editor');
 * const bundle = window.myRenderCm6(el, createSettings);
 * const editorView = bundle.view;
 * ```
 * @param {HTMLElement} renderTo
 * @param {(defaults: EditorViewConfig, stuff: {EditorView: typeof EditorView;}) => EditorViewConfig} createSettings = (defaultSettings, _stuff) => defaultSettings
 * @returns {{view: EditorView;}}
 */
export default (renderTo, createSettings = (defaultSettings, _stuff) => defaultSettings) => {
    const defaultSettings = {
        extensions: [mySetup, sass()],
        parent: renderTo
    };
    const stuff = {
        EditorView
    };

    const settings = createSettings(
        defaultSettings,
        stuff
    );

    return {
        view: new EditorView(settings),
    };
};

import { indentLess, indentMore } from "@codemirror/commands";
import { html, htmlLanguage } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { Compartment, EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap, lineNumbers } from "@codemirror/view";
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { EditorView } from "codemirror";
import Draggable from "react-draggable";


/**
 * WordPress dependencies
*/
import { BlockControls, store as blockEditorStore, transformStyles } from "@wordpress/block-editor";
import { SandBox, ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useCallback, useEffect, useMemo, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";


import Settings from "./Components/Backend/Settings/Settings";
import Style from "./Style";

const EditOld = (props) => {
  const { attributes, setAttributes, clientId, isSelected } = props;
  const { uniqueId, HTML, options } = attributes;
  const { showLineNumbers, wrapEnabled, highlightActiveLine, enableBasicAutocompletion, enableLiveAutocompletion } = options;


  const dom = useRef();
  const [deltaPosition, setDeltaPosition] = useState({ x: 100, y: 50 });
  const [mode, setMode] = useState("html");

  let language = new Compartment();
  let tabSize = new Compartment();

  const languageConf = new Compartment();

  const autoLanguage = EditorState.transactionExtender.of((tr) => {
    if (!tr.docChanged) return null;
    let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100));
    let stateIsHTML = tr.startState.facet(language) == htmlLanguage;
    if (docIsHTML == stateIsHTML) return null;
    return {
      effects: languageConf.reconfigure(docIsHTML ? html() : javascript()),
    };
  });

  useEffect(() => {
    clientId && setAttributes({ uniqueId: `ch${clientId.substring(0, 8)}` });
  }, [clientId]); // Set & Update clientId to cId

  let state = EditorState.create({
    doc: HTML,
    extensions: [
      basicSetup({
        foldGutter: false,
        dropCursor: false,
        lineNumbers: showLineNumbers
      }),
      languageConf.of(html()),
      autoLanguage,
      tabSize.of(EditorState.tabSize.of(8)),
      EditorView.updateListener.of(function (e) {
        setAttributes({ HTML: e.state.doc.toString() });
      }),
      oneDark,
      keymap.of([
        {
          key: "F11",
          run: async () => {
            if (!document.fullscreenElement) {
              dom.current?.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          },
        },
        {
          key: "Tab",
          preventDefault: true,
          run: indentMore,
        },
        {
          key: "Shift-Tab",
          preventDefault: true,
          run: indentLess,
        },
      ]),
    ],
  });

  const init = useCallback(() => {
    if (!dom.current?.innerHTML) {
      const view = new EditorView({
        state,
        parent: dom.current,
      });
      window.view = view;
      window.state = state;
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  useEffect(() => {
    if (["html", "preview_html"].includes(mode)) {
      dom.current.style.display = "block";
    } else {
      dom.current.style.display = "none";
    }
  }, [mode]);

  return (
    <>
      <Settings {...props} />
      <Style attributes={attributes} clientId={clientId} />
      {mode === "preview_html" && (
        <Draggable onDrag={handleDrag} position={deltaPosition}>
          <div className={mode} dangerouslySetInnerHTML={{ __html: HTML }}></div>
        </Draggable>
      )}
      <div className={uniqueId} ref={dom}></div>
      {mode === "preview" && <HTMLEditPreview content={HTML} isSelected={isSelected} />}

      <BlockControls>
        <ToolbarGroup className="bPlToolbar">
          <ToolbarButton label={__("Preview", "custom-html")} onClick={() => setMode("preview")} isPressed={mode === "preview"}>
            {__("Preview", "custom-html")}
          </ToolbarButton>
          <ToolbarButton label={__("Preview", "custom-html")} onClick={() => setMode("html")} isPressed={mode === "html"}>
            {__("HTML", "custom-html")}
          </ToolbarButton>
          <ToolbarButton label={__("Preview", "custom-html")} onClick={() => setMode("preview_html")} isPressed={mode === "preview_html"}>
            {__("HTML with Preview", "custom-html")}
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
    </>
  );
};
export default EditOld;

const DEFAULT_STYLES = `
   html,body,:root {
     margin: 0 !important;
     padding: 0 !important;
     overflow: visible !important;
     min-height: auto !important;
   }
 `;

export function HTMLEditPreview({ content, isSelected }) {
  const settingStyles = useSelect((select) => {
    return select(blockEditorStore).getSettings()?.styles;
  }, []);

  const styles = useMemo(() => [DEFAULT_STYLES, ...transformStyles(settingStyles)], [settingStyles]);

  return (
    <>
      <SandBox html={content} styles={styles} />
      {!isSelected && <div className="block-library-html__preview-overlay"></div>}
    </>
  );
}

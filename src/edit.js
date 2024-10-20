import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { python } from '@codemirror/lang-python';

// import { css } from '@codemirror/lang-css';
import { php } from '@codemirror/lang-php';

import CodeMirror, { EditorView } from '@uiw/react-codemirror';

import Settings from "./Components/Backend/Settings/Settings";
import Styles from './Components/Common/Styles';
import { themeMap } from './utils/functions';
// import { BlockControls } from '@wordpress/block-editor/build/components';
// import { SandBox, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';


import { BlockControls, store as blockEditorStore, transformStyles } from "@wordpress/block-editor";
import { SandBox, ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useMemo, useRef, useState } from "@wordpress/element";
import Draggable from 'react-draggable';

// Map selected language to its CodeMirror extension
const languageExtensionsMap = {
  javascript: javascript({ jsx: true }),
  html: html(),
  css: css(),
  php: php(),
  json: json(),
  python: python()
};




const Edit = ({ attributes, setAttributes, isSelected }) => {
  const { HTML, options, mainEditor } = attributes;
  const { showLineNumbers, foldGutter, tabSize, highlightActiveLine, autocompletion, wrapEnabled } = options; // Extract line number visibility option
  const { language, theme } = mainEditor;


  const [deltaPosition, setDeltaPosition] = useState({ x: 100, y: 50 });
  const [mode, setMode] = useState("html");
  const dom = useRef();

  const extensions = [
    languageExtensionsMap[language],
    wrapEnabled ? EditorView.lineWrapping : []
  ];

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };


  return (
    <>
      <Styles attributes={attributes} />
      <Settings attributes={attributes} setAttributes={setAttributes} />

      {mode === "preview_html" && (
        <Draggable onDrag={handleDrag} position={deltaPosition}>
          <div className={mode} dangerouslySetInnerHTML={{ __html: HTML }}></div>
        </Draggable>
      )}

      {mode !== "preview" && (
        <CodeMirror
          ref={dom}
          className="custom-codemirror"
          value={HTML}
          height="200px"
          extensions={extensions}
          theme={themeMap[theme]}
          onChange={(value) => {
            setAttributes({ HTML: value });
          }}
          basicSetup={{
            lineNumbers: showLineNumbers,
            foldGutter,
            highlightActiveLine,
            tabSize,
            autocompletion,
          }}
        />
      )}


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

export default Edit;


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

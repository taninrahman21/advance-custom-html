import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';

import CodeMirror, { EditorView } from '@uiw/react-codemirror';

import { __ } from '@wordpress/i18n';
import Settings from "./Components/Backend/Settings/Settings";
import Styles from './Components/Common/Styles';
import { themeMap } from './utils/functions';


import { BlockControls, store as blockEditorStore, RichText, transformStyles } from "@wordpress/block-editor";
import { SandBox, ToolbarButton, ToolbarGroup } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEffect, useMemo, useRef, useState } from "react";
import Draggable from 'react-draggable';
import { GiCheckMark } from "react-icons/gi";
import { IoCopyOutline } from "react-icons/io5";

// Map selected language to its CodeMirror extension
const languageExtensionsMap = {
  javascript: javascript({ jsx: true }),
  html: html(),
  css: css(),
  php: php(),
  json: json(),
  python: python()
};




const Edit = ({ attributes, setAttributes, isSelected, clientId }) => {
  const { HTML, options, mainEditor, headingStyles, uniqueId } = attributes;
  const { copyBtnType, language, theme, height } = mainEditor;
  const { showLineNumbers, foldGutter, tabSize, highlightActiveLine, autocompletion, wrapEnabled } = options;

  useEffect(() => {
    clientId && setAttributes({ uniqueId: `ch${clientId.substring(0, 8)}` });
  }, [clientId]); // Set & Update clientId to cId


  const [deltaPosition, setDeltaPosition] = useState({ x: 100, y: 50 });
  const [mode, setMode] = useState("html");
  const [copied, setCopied] = useState(false);
  const editorViewRef = useRef(null);

  const handleCopyClick = () => {
    // If the editor view is available, copy from it
    if (editorViewRef.current) {
      const editorView = editorViewRef.current;
      navigator.clipboard.writeText(editorView.state.doc.toString())  // Copy editor content
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    }
  };

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
        <div id={`main-wrapper-${uniqueId}`}>

          <div className='heading'>
            <RichText
              tagName="p"
              placeholder="Write Headline"
              value={headingStyles.headlineText}
              onChange={(headlineText) => setAttributes({ headingStyles: { ...headingStyles, headlineText } })}
            />

            {
              copyBtnType == "text" ? <button
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyClick}
                style={{ zIndex: 5999 }}
              >
                {copied ? 'Copied' : 'Copy Code'}
              </button> : <div onClick={handleCopyClick} className="copy-btn-icon">
                {copied ? <GiCheckMark /> : <IoCopyOutline title="Copy Code" />}
              </div>
            }
          </div>

          <CodeMirror
            className="code-editor"
            value={HTML}
            height={height}
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
            onCreateEditor={(view) => {
              editorViewRef.current = view;  // Store editor view
            }}
          />
        </div>
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

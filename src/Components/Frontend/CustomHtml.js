import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import React, { useRef, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { IoCopyOutline } from 'react-icons/io5';
import { themeMap } from '../../utils/functions';
import Styles from '../Common/Styles';



const CustomHtml = ({ attributes }) => {
  const { HTML, options, mainEditor, headingStyles, uniqueId } = attributes;
  const { copyBtnType, language, theme, height } = mainEditor;
  const { showLineNumbers, foldGutter, tabSize, highlightActiveLine, autocompletion, wrapEnabled } = options;


  const [copied, setCopied] = useState(false);
  const editorViewRef = useRef(null);

  // Map selected language to its CodeMirror extension
  const languageExtensionsMap = {
    javascript: javascript({ jsx: true }),
    html: html(),
    css: css(),
    php: php(),
    json: json(),
    python: python()
  };

  const extensions = [
    languageExtensionsMap[language],
    wrapEnabled ? EditorView.lineWrapping : []
  ];



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

  return (
    <>
      <Styles attributes={attributes} />

      <div id={`main-wrapper-${uniqueId}`}>

        <div className='heading'>
          <p>{headingStyles.headlineText}</p>

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
          readOnly={true}
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
    </>
  );
};

export default CustomHtml;
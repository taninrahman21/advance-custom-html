import React from 'react';

import { getTypoCSS } from '../../../../Components/utils/getCSS';

const Styles = ({ attributes }) => {
  const { options, headingStyles, btnStyle, mainEditor, fontSize, uniqueId } = attributes;
  const { copyBtnPosition, width } = mainEditor;
  const { displayHeading, displayCopyButton } = options;
  const { titleColor, titleTypo, backgroundColor } = headingStyles;

  const mainWrapper = `#main-wrapper-${uniqueId}`;
  const codeEditor = `${mainWrapper} .code-editor`;
  const heading = `${mainWrapper} .heading`;
  const copyBtn = `${heading} .copy-btn`;
  const copyBtnIcon = `${heading} .copy-btn-icon`;
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ${getTypoCSS("", titleTypo)?.googleFontLink}
  	      ${getTypoCSS(`${heading} p`, titleTypo)?.styles}

		      ${getTypoCSS("", btnStyle.typo)?.googleFontLink}
  	      ${getTypoCSS(`${copyBtn}`, btnStyle.typo)?.styles}


          ${mainWrapper} {
            width: ${width};
          }

			    ${codeEditor} .cm-editor {
            font-size: ${fontSize}px; 
          }
          
          ${copyBtnIcon} {
            color: ${btnStyle.copyBtnIconColor};
            font-size: ${btnStyle.copyBtnIconSize}px;
            position: ${displayHeading ? "static" : "absolute"};
            ${copyBtnPosition === "topright" && !displayHeading ? "top: 0; right: 5px" : "bottom: 0; right: 5px"};
            z-index: 5000;
            display: ${displayCopyButton ? "flex" : "none"};
            margin-right: 5px;
          }

          ${copyBtn} {
            display: ${displayCopyButton ? "block" : "none"};
            position: ${displayHeading ? "static" : "absolute"};
            ${copyBtnPosition === "topright" && !displayHeading ? "top: 0; right: 0" : "bottom: 0; right: 0"};
            background-color: ${btnStyle.backgroundColor};
            color: ${btnStyle.textColor};
          }
          ${heading}{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${displayHeading ? "5px 0 5px 20px" : "0"};
            background-color: ${backgroundColor};
          }
          ${heading} p {
            display: ${displayHeading ? "flex" : "none"};
            color: ${titleColor};
            margin: 0;
          }

			`.replace(/\s+/g, " "),
        }}
      />
    </>
  );
};
export default Styles;
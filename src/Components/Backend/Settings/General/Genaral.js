import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, SelectControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../utils/functions";
import { languageOptions, themeOptions } from "../../../../utils/options";

const General = ({ attributes, setAttributes }) => {
  const { fontSize, options, mainEditor } = attributes;
  const { copyBtnType, language, theme, copyBtnPosition } = mainEditor;
  const { showLineNumbers, wrapEnabled, foldGutter, highlightActiveLine, autocompletion, tabSize, displayHeading, displayCodeToFrontend, displayCopyButton } = options;


  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings", "custom-html")} initialOpen={true}>

          {/* Toggle Display Coding */}
          <ToggleControl
            label={__('Display Code Snippets', 'custom-html')}
            checked={displayCodeToFrontend}
            onChange={(displayCodeToFrontend) => setAttributes({ options: { ...options, displayCodeToFrontend } })}
          />


          <RangeControl
            label={__("Font Size", "custom-html")}
            value={fontSize}
            onChange={(fontSize) => setAttributes({ fontSize })}
            min={10}
            max={40}
            allowReset={true}
            resetFallbackValue={15}
            initialPosition={15} />

          {/* TabSize */}
          <RangeControl
            label={__("Tab Size", "custom-html")}
            value={tabSize}
            onChange={(value) => setAttributes({ options: updateData(options, value, "tabSize") })}
            min={2}
            max={8}
            step={2}
          />

          <SelectControl
            label="Editor Theme"
            value={theme}
            options={themeOptions}
            onChange={(theme) => setAttributes({ mainEditor: updateData(mainEditor, theme, "theme") })} />


          <SelectControl
            label="Select Language For Syntax"
            value={language}
            options={languageOptions}
            onChange={(language) => setAttributes({ mainEditor: updateData(mainEditor, language, "language") })} />

          {/* Copy Button Type */}




          <ToggleControl
            label={__('Display Heading', 'custom-html')}
            checked={displayHeading}
            onChange={(displayHeading) => setAttributes({ options: { ...options, displayHeading } })}
          />

          <ToggleControl
            label={__('Hide/Show Copy Button', 'custom-html')}
            checked={displayCopyButton}
            onChange={(displayCopyButton) => setAttributes({ options: { ...options, displayCopyButton } })}
          />

          {
            displayCopyButton && <SelectControl
              label={__("Copy Button Type")}
              value={copyBtnType}
              options={[
                { label: 'Text', value: 'text' },
                { label: 'Icon', value: 'icon' }
              ]}
              onChange={(value) => setAttributes({ mainEditor: updateData(mainEditor, value, "copyBtnType") })}
            />
          }
          {
            (displayHeading === false) && (displayCopyButton) && <SelectControl
              label="Copy Button Position"
              value={copyBtnPosition}
              options={[
                { label: 'Top Right', value: 'topright' },
                { label: 'Bottom Right', value: 'bottomright' }
              ]}
              onChange={(position) => setAttributes({ mainEditor: updateData(mainEditor, position, "copyBtnPosition") })} />
          }

          <ToggleControl
            label={__('Show Line Numbers', 'custom-html')}
            checked={showLineNumbers}
            onChange={(showLineNumbers) => setAttributes({ options: { ...options, showLineNumbers } })}
          />

          <ToggleControl
            label={__('Highlight Active Line', 'custom-html')}
            checked={highlightActiveLine}
            onChange={(highlightActiveLine) => setAttributes({ options: { ...options, highlightActiveLine } })}
          />

          <ToggleControl
            label={__('Fold Gutter', 'custom-html')}
            checked={foldGutter}
            onChange={(foldGutter) => setAttributes({ options: { ...options, foldGutter } })}
          />
          <ToggleControl
            label={__('Enable Autocompletion', 'custom-html')}
            checked={autocompletion}
            onChange={(autocompletion) => setAttributes({ options: { ...options, autocompletion } })}
          />
          <ToggleControl
            label={__('Wrap Enabled', 'custom-html')}
            checked={wrapEnabled}
            onChange={(wrapEnabled) => setAttributes({ options: { ...options, wrapEnabled } })}
          />

        </PanelBody>



        {/* <ToggleControl
            label={__('Show Print Margin', 'custom-html')}
            checked={showPrintMargin}
            onChange={(showPrintMargin) => setAttributes({ options: { ...options, showPrintMargin } })}
          /> */}

        {/* <ToggleControl
            label={__('Read Only', 'custom-html')}
            checked={readOnly}
            help={__('Applicable only for frontend view')}
            onChange={(readOnly) => setAttributes({ options: { ...options, readOnly } })}
          /> */}

      </InspectorControls>
    </>
  );
};
export default General;
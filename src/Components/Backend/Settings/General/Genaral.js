import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, SelectControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { updateData } from "../../../../utils/functions";
import { languageOptions, themeOptions } from "../../../../utils/options";

const General = ({ attributes, setAttributes }) => {
  const { fontSize, options, mainEditor } = attributes;
  const { language, theme, lineHeight } = mainEditor;
  const { showLineNumbers, wrapEnabled, foldGutter, highlightActiveLine, autocompletion, tabSize } = options;


  return (
    <>
      <InspectorControls>
        <PanelBody className="general" title={__("Settings", "custom-html")} initialOpen={true}>

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

          {/* // Line Height Control */}
          {/* <RangeControl
            label={__("Line Height", "custom-html")}
            value={lineHeight}
            onChange={(lineHeight) => setAttributes({ mainEditor: updateData(mainEditor, lineHeight, "lineHeight") })} 
            min={1.5}
            max={20}
            step={.5}
          /> */}


        </PanelBody>

        <PanelBody title={__('Options', 'code-embed')}>

          <ToggleControl
            label={__('Show Line Numbers', 'code-embed')}
            checked={showLineNumbers}
            onChange={(showLineNumbers) => setAttributes({ options: { ...options, showLineNumbers } })}
          />

          <ToggleControl
            label={__('Highlight Active Line', 'code-embed')}
            checked={highlightActiveLine}
            onChange={(highlightActiveLine) => setAttributes({ options: { ...options, highlightActiveLine } })}
          />

          <ToggleControl
            label={__('Fold Gutter', 'code-embed')}
            checked={foldGutter}
            onChange={(foldGutter) => setAttributes({ options: { ...options, foldGutter } })}
          />
          <ToggleControl
            label={__('Enable Autocompletion', 'code-embed')}
            checked={autocompletion}
            onChange={(autocompletion) => setAttributes({ options: { ...options, autocompletion } })}
          />
          <ToggleControl
            label={__('Wrap Enabled', 'code-embed')}
            checked={wrapEnabled}
            onChange={(wrapEnabled) => setAttributes({ options: { ...options, wrapEnabled } })}
          />
          {/* <ToggleControl
            label={__('Show Print Margin', 'code-embed')}
            checked={showPrintMargin}
            onChange={(showPrintMargin) => setAttributes({ options: { ...options, showPrintMargin } })}
          /> */}

          {/* <ToggleControl
            label={__('Read Only', 'code-embed')}
            checked={readOnly}
            help={__('Applicable only for frontend view')}
            onChange={(readOnly) => setAttributes({ options: { ...options, readOnly } })}
          /> */}

        </PanelBody>
      </InspectorControls>
    </>
  );
};
export default General;
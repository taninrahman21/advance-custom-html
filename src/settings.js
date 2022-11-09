import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";

const Settings = ({ attributes, setAttributes }) => {
  const { fontSize } = attributes;
  return (
    <>
      <InspectorControls>
        <PanelBody className="general" title={__("Settings", "custom-html")} initialOpen={true}>
          <RangeControl label={__("Font Size", "custom-html")} value={fontSize} onChange={(fontSize) => setAttributes({ fontSize })} min={10} max={40} allowReset={true} resetFallbackValue={15} initialPosition={15} />
        </PanelBody>
      </InspectorControls>
    </>
  );
};
export default Settings;

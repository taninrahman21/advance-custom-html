import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';

import { BColor, Typography } from '../../../../../../Components';
import { updateData } from '../../../../utils/functions';

const Styles = ({ attributes, setAttributes }) => {
  const { options, headingStyles, btnStyle, mainEditor } = attributes;
  const { copyBtnType, height, width } = mainEditor;
  const { titleColor, titleTypo, backgroundColor } = headingStyles;
  const { displayHeading } = options;

  // return (
  //   <div>
  //     hello world  
  //   </div>
  // )

  return (
    <div>
      {/* Code Editor */}
      <PanelBody className='bPlPanelBody' title={__('Code Editor', 'custom-html')} initialOpen={false}>
        <UnitControl
          label={__('Height', 'custom-html')}
          value={height}
          onChange={(height) => setAttributes({ mainEditor: updateData(mainEditor, height, "height") })}
          step={1}
        />
        <UnitControl
          label={__('Width', 'custom-html')}
          value={width}
          onChange={(width) => setAttributes({ mainEditor: updateData(mainEditor, width, "width") })}
          step={1}
        />
      </PanelBody>

      {/* Heading Style */}
      {
        displayHeading && <PanelBody title={__('Heading', 'custom-html')} initialOpen={false}>
          {/* Heading Title Color */}
          <BColor
            label={__('Title Color', 'custom-html')}
            value={titleColor}
            onChange={(titleColor) => setAttributes({ headingStyles: { ...headingStyles, titleColor } })}
          />

          {/* Title Typography */}
          <Typography
            label={__('Title Typography', 'custom-html')}
            value={titleTypo}
            onChange={(titleTypo) => setAttributes({ headingStyles: { ...headingStyles, titleTypo } })}
          />

          {/* Background Color */}
          <BColor
            label={__('Background Color', 'custom-html')}
            value={backgroundColor}
            onChange={(backgroundColor) => setAttributes({ headingStyles: { ...headingStyles, backgroundColor } })}
          />
        </PanelBody>
      }

      {/* Copy Button Style */}
      {copyBtnType == "text" && <PanelBody title={__("Copy Button", "custom-html")} initialOpen={false}>
        {/* Text Color */}
        <BColor
          label={__('Button Text Color', 'custom-html')}
          value={btnStyle.textColor}
          onChange={(textColor) => setAttributes({ btnStyle: { ...btnStyle, textColor } })}
        />

        {/* Background Color */}
        <BColor
          label={__('Background Color', 'custom-html')}
          value={btnStyle.backgroundColor}
          onChange={(backgroundColor) => setAttributes({ btnStyle: { ...btnStyle, backgroundColor } })}
        />

        {/* Font Size */}
        <Typography
          label={__('Typography', 'custom-html')}
          value={btnStyle.typo}
          onChange={(typo) => setAttributes({ btnStyle: { ...btnStyle, typo } })}
        />
      </PanelBody>}

      {/* Copy Button Style For Icon */}
      {copyBtnType === 'icon' && <PanelBody title={__('Copy Button Style', 'custom-html')} initialOpen={false}>
        {/* Icon Color */}
        <BColor
          label={__('Icon Color', 'custom-html')}
          value={btnStyle.copyBtnIconColor}
          onChange={(color) => setAttributes({ btnStyle: updateData(btnStyle, color, "copyBtnIconColor") })}
        />

        {/* Icon Size */}
        <RangeControl
          label={__('Icon Size', 'custom-html')}
          value={btnStyle.copyBtnIconSize}
          onChange={(size) => setAttributes({ btnStyle: updateData(btnStyle, size, "copyBtnIconSize") })}
        />
      </PanelBody>
      }
    </div>
  );


}

export default Styles;
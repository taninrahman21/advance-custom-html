const Styles = ({ attributes }) => {
  const { fontSize, uniqueId, mainEditor } = attributes;
  const { lineHeight } = mainEditor;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
			.custom-codemirror .cm-editor {
          font-size: ${fontSize}px; 
        }

			`.replace(/\s+/g, " "),
        }}
      />
    </>
  );
};
export default Styles;
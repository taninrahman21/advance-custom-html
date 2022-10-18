const Style = ({ attributes }) => {
  const { fontSize, uniqueId } = attributes;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
			.${uniqueId} {
				font-size: ${fontSize}px
			}
			`.replace(/\s+/g, " "),
        }}
      />
    </>
  );
};
export default Style;

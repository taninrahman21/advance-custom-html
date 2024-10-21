import { createRoot } from 'react-dom/client';
import CustomHtml from './Components/Frontend/CustomHtml';
import Styles from './Components/Common/Styles';

document.addEventListener('DOMContentLoaded', () => {
  const customHtmlEls = document.querySelectorAll('.wp-block-bplugins-custom-html');
  customHtmlEls.forEach(customHtmlEl => {
    const attributes = JSON.parse(customHtmlEl.dataset.attributes);

    createRoot(customHtmlEl).render(<>
      <CustomHtml attributes={attributes}/>
    </>);

    customHtmlEl?.removeAttribute('data-attributes');
  });
});
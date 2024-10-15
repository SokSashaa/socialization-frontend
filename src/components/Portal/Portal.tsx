import { createPortal } from 'react-dom';

const Portal = ({ children }) => createPortal(children, document.body);

export default Portal;

import { ToastContainer as ReactToastContainer, Bounce } from 'react-toastify';

const ToastContainer = () => (
  <ReactToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    theme="light"
    transition={Bounce}
  />
);

export default ToastContainer;

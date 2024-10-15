import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import Router from '../routes/Router';
import { AuthInit } from '../modules/Auth';
import { ToastContainer } from '../UI';

const App = () => (
  <>
    <AuthInit>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <Router />
        </AnimatePresence>
      </LazyMotion>
    </AuthInit>
    <ToastContainer />
  </>
);

export default App;

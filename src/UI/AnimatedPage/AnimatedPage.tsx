import { m } from 'framer-motion';

const pageVariants = {
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const AnimatedPage = ({ children }) => (
  <m.div
    variants={pageVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </m.div>
);

export default AnimatedPage;

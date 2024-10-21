import { m } from 'framer-motion';
import {FC, HTMLAttributes} from "react";

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

const AnimatedPage:FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => (
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

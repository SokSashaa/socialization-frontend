import { createPortal } from 'react-dom';
import {FC, HTMLAttributes} from "react";

const Portal:FC<HTMLAttributes<any>> = ({ children }) => createPortal(children, document.body);

export default Portal;

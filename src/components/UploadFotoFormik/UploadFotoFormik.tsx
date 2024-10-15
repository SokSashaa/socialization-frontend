import { useState } from 'react';
import { UploadFile } from '../../UI';
import styles from './UploadFotoFormik.module.css';

const UploadFotoFormik = ({ fotoPreview }) => {
  const [preview, setPreview] = useState(fotoPreview || null);
};

export default UploadFotoFormik;

import React from 'react';
import {FC, ReactNode} from 'react';

import styles from './ModalLayout.module.scss';

type ModalLayoutProps = {
	title: string;
	content: ReactNode;
};
const ModalLayout: FC<ModalLayoutProps> = ({title, content}) => (
	<div className={styles.wrapper}>
		<div>
			<h3 className={styles.title}>{title}</h3>
			<div>{content}</div>
		</div>
	</div>
);

export default ModalLayout;

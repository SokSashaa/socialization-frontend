import {FC, ReactNode} from 'react';
import React from 'react';

import {Portal} from '@components/index';

import {Button, Modal} from '@UI/index';

import css from './ControlModal.module.scss';

interface ControlPopoverProps {
	isOpen: boolean;
	children: ReactNode;
	setIsOpen: () => void;
	labelOk?: string;
	labelCancel?: string;
	onClickYes?: () => void;
	onClickNo?: () => void;
}

const ControlModal: FC<ControlPopoverProps> = ({
	isOpen,
	setIsOpen,
	children,
	onClickNo,
	onClickYes,
	labelOk = 'Удалить',
	labelCancel = 'Отмена',
}) => {
	return (
		<Portal>
			<Modal active={isOpen} handleClose={setIsOpen}>
				<div className={css.root}>
					{children}
					<div className={css.buttons}>
						<Button onClick={onClickYes}>{labelOk}</Button>
						<Button onClick={onClickNo}>{labelCancel}</Button>
					</div>
				</div>
			</Modal>
		</Portal>
	);
};

export default ControlModal;

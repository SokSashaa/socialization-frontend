import { FC, ReactNode } from 'react';

import { Portal } from '@components/index';

import { Button, Modal } from '@UI/index';

import css from './ControlModal.module.scss';

interface ControlPopoverProps {
    isOpen: boolean;
    children: ReactNode;
    setIsOpen: () => void;
    onClickYes?: () => void;
    onClickNo?: () => void;
}

const ControlModal: FC<ControlPopoverProps> = ({
    isOpen,
    setIsOpen,
    children,
    onClickNo,
    onClickYes,
}) => {
    return (
        <Portal>
            <Modal
                active={isOpen}
                setActive={setIsOpen}
            >
                <div className={css.root}>
                    {children}
                    <div className={css.buttons}>
                        <Button onClick={onClickYes}>Удалить</Button>
                        <Button onClick={onClickNo}>Отмена</Button>
                    </div>
                </div>
            </Modal>
        </Portal>
    );
};

export default ControlModal;

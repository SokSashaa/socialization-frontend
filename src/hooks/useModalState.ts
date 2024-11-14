import {useCallback, useState} from 'react';
import {useMounted} from './useMounted';

export function useModalState(initialOpen: boolean) {
    const isMountedRef = useMounted();
    const [isOpen, setIsOpen] = useState(initialOpen);

    const open = useCallback(() => isMountedRef && setIsOpen(true), [setIsOpen, isMountedRef]);
    const close = useCallback(() => isMountedRef && setIsOpen(false), [setIsOpen, isMountedRef]);

    return [isOpen, open, close, setIsOpen] as const;
}

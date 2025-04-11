import { useCallback, useState } from 'react';

export const useIsToggled = (initialValue: boolean) => {
    const [isToggled, setIsToggled] = useState<boolean>(initialValue);

    const toggle = useCallback(() => {
        setIsToggled((prevState) => !prevState);
    }, []);

    const toggleOn = useCallback(() => {
        setIsToggled(true);
    }, []);

    const toggleOff = useCallback(() => {
        setIsToggled(false);
    }, []);

    return {
        isToggled,
        toggle,
        toggleOn,
        toggleOff,
    };
};

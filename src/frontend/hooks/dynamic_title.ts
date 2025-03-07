import { useEffect } from 'react';

export default function useDynamicTitle(): void {
    useEffect(() => {
        let previousTitle: string = document.title;

        const handleBlur = (): void => {
            previousTitle = document.title;
            document.title = "¡Vuelve a NoteTube! 😢";
        };

        const handleFocus = (): void => {
            document.title = previousTitle;
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);
}
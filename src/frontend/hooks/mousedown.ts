import { useEffect } from "react";

interface IMouseDown {
    action: (event: MouseEvent) => void
}

export default function useMouseDown(props: IMouseDown): void {
    const { action } = props;

    useEffect(() => {
        document.addEventListener('mousedown', action);
        return () => document.removeEventListener('mousedown', action);
    }, [action]);
}
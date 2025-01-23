import { usePathname } from "next/navigation";

export default function useCurrentPath(fullPath: boolean = false): string {
    const pathName: string = usePathname();

    return (fullPath) ? pathName : pathName.substring(1).split('/')[0];
}
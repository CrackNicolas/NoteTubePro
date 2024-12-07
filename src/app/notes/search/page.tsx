'use client'

import { useRouter } from "next/navigation";

import ComponentSearch from "@/frontend/components/layouts/search/container";

import { Props_note } from "@/context/types/note";

export default function Search(): JSX.Element {
    const router = useRouter();

    const update_note = (note: Props_note): void => {
        const json = JSON.stringify({ note });
        router.push(`/notes?data=${encodeURIComponent(json)}`);
    }

    return <ComponentSearch update_note={update_note} />
}
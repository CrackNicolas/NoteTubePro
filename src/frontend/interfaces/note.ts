import { PropsDeleteNote, PropsNote } from "@/context/types/note";
import { PropsDispatchDeleteNotes, PropsDispatchNote } from "@/frontend/types/dispatch";

export default interface INoteBase {
    note: PropsNote,
    notes: PropsNote[],
    setNote: PropsDispatchNote,
    notesSelected: PropsDeleteNote[],
    setNotesSelected: PropsDispatchDeleteNotes
}
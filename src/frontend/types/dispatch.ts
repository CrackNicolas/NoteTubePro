import { Dispatch, SetStateAction } from "react";

import { PropsTheme } from "@/frontend/types/theme";
import { PropsSession } from "@/context/types/session";
import { PropsCategory } from "@/context/types/category";
import { PropsDeleteNote, PropsNote } from "@/context/types/note";

export type PropsDispatchNote = Dispatch<SetStateAction<PropsNote | undefined>>
export type PropsDispatchTheme = Dispatch<SetStateAction<PropsTheme>>
export type PropsDispatchString = Dispatch<SetStateAction<string | undefined>>
export type PropsDispatchBoolean = Dispatch<SetStateAction<boolean>>
export type PropsDispatchSession = Dispatch<SetStateAction<PropsSession | undefined>>
export type PropsDispatchDeleteNotes = Dispatch<SetStateAction<PropsDeleteNote[]>>
export type PropsDispatchCategoryRequired = Dispatch<SetStateAction<PropsCategory>>
export type PropsDispatchCategoryNotRequired = Dispatch<SetStateAction<PropsCategory | undefined>>
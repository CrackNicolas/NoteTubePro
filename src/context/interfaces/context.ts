import { Component } from "@/frontend/types/component"

import { PropsTheme } from "@/frontend/types/theme"
import { PropsSession } from "@/context/types/session"
import { PropsDispatchBoolean, PropsDispatchTheme } from "@/frontend/types/dispatch"

import INoteBase from "@/frontend/interfaces/note"

export default interface IContext extends Partial<Pick<INoteBase, 'note'>>, Pick<INoteBase, 'setNote'>  {
    opacity: boolean,
    setOpacity: PropsDispatchBoolean,
    theme: PropsTheme,
    session: PropsSession,
    setTheme: PropsDispatchTheme,
    buttonSesion: Component,
    sectionCurrent: string
}
import { useContext } from "react";

import { IntanceContextApp } from "@/context/template";

import IContext from "@/context/interfaces/context";

export default function useAppContext(): IContext {
    return useContext(IntanceContextApp);
}
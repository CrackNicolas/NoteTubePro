"use client";

import Confetti from 'react-confetti'
import { useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";
import { ValueBoolean } from '@/frontend/enums/boolean';

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";
import useAppTranslation from '@/shared/hooks/translation';

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentMainHome from "@/frontend/components/layouts/home/sections/main/container";
import ComponentHeaderHome from "@/frontend/components/layouts/home/header";
import ComponentFooterHome from "@/frontend/components/layouts/home/sections/footer";
import ComponentLoadingHome from "@/frontend/components/layouts/home/loading";
import ComponentAditionalHome from "@/frontend/components/layouts/home/sections/aditional";
import ComponentTestimoniesHome from "@/frontend/components/layouts/home/sections/testimonies/container";

export default function ComponentHome(): Component {
    const { session, opacity }: IContext = useAppContext();

    const { translate } = useAppTranslation();

    const [confetti, setConfetti] = useState<boolean>(false);

    useEffect(() => {
        const storedConfetti = localStorage.getItem("confetti") as ValueBoolean;

        if (session.isSignedIn && session.value.user && !storedConfetti) {
            setConfetti(true);
            localStorage.setItem("confetti", ValueBoolean.YEAH);
            const viewConfetti: NodeJS.Timeout = setTimeout(() => {
                setConfetti(false);
            }, 9000);
            return () => clearTimeout(viewConfetti);
        }
    }, [session.value.user?.lastSignInAt])

    if (!session.value.user) return <ComponentLoadingHome />

    return (
        <ComponentMotion type="article" descriptionClass={`${opacity && "opacity-40"} overflow-x-hidden flex flex-col min-h-screen justify-between px-1 relative w-full pb-16 sm:pb-5`} >
            {confetti && <Confetti className="w-full h-full" />}
            <ComponentHeaderHome title={`${translate('home.title')}, ${session.value.user.name}!`} subtitle={translate('home.subtitle')} />
            <ComponentMainHome />
            <ComponentTestimoniesHome />
            <ComponentAditionalHome />
            <ComponentFooterHome />
        </ComponentMotion>
    )
}
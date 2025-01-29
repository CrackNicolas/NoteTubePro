"use client";

import Confetti from 'react-confetti'
import { useEffect, useState } from "react";

import { Component } from "@/frontend/types/component";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";

import ComponentMotion from "@/frontend/components/partials/motion";
import ComponentMainHome from "@/frontend/components/layouts/home/sections/main/container";
import ComponentHeaderHome from "@/frontend/components/layouts/home/header";
import ComponentFooterHome from "@/frontend/components/layouts/home/sections/footer";
import ComponentLoadingHome from "@/frontend/components/layouts/home/loading";
import ComponentAditionalHome from "@/frontend/components/layouts/home/sections/aditional";
import ComponentTestimoniesHome from "@/frontend/components/layouts/home/sections/testimonies/container";

export default function ComponentHome(): Component {
    const { session, opacity }: IContext = useAppContext();

    const [confetti, setConfetti] = useState<boolean>(false);

    useEffect(() => {
        if (session.isSignedIn && session.value.user && session.value.user?.lastSignInAt == null) {
            setConfetti(true);
            const viewConfetti: NodeJS.Timeout = setTimeout(() => {
                setConfetti(false);
            }, 9000);
            return () => clearTimeout(viewConfetti);
        }
    }, [session.value.user?.lastSignInAt])

    if (!session.value.user) return <ComponentLoadingHome />

    return (
        <ComponentMotion type="article" descriptionClass={`${opacity && "opacity-40"} flex flex-col min-h-screen justify-between relative w-full px-6 lg:px-8 pb-16 sm:pb-5`} >
            {confetti && <Confetti width={1100} height={1100} className="w-full h-full" numberOfPieces={600} />}
            <ComponentHeaderHome title={`Bienvenido, ${session.value.user.name.split(' ')[0]}!`} subtitle="Diseñada para inspirar, sorprender y facilitar tu vida." />
            <ComponentMainHome />
            <ComponentTestimoniesHome />
            <ComponentAditionalHome />
            <ComponentFooterHome />
        </ComponentMotion>
    )
}
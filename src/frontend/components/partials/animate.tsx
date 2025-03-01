import { useMemo } from "react";

import { Component } from "@/frontend/types/component";

interface IParticle {
    top: string;
    left: string;
    animationDuration: string;
}

export default function ComponentAnimatedBackground(): Component {
    const particles: IParticle[] = useMemo(() => {
        return Array.from({ length: 15 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${(Math.random() * 5 + 3).toFixed(2)}s`,
        }));
    }, []);

    return (
        <div className="animated-bg fixed top-0 left-0 w-full h-full z-0 overflow-hidden ">
            <div className="particles absolute w-full h-full">
                {
                    particles.map((props: IParticle, index: number) => {
                        return <div key={index} className="particle absolute w-[4px] h-[4px] bg-secondary rounded-full" style={props} />
                    })
                }
            </div>
        </div>
    );
}
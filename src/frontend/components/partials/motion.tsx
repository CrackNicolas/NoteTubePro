import { motion } from "framer-motion";

import ILayouts from "@/frontend/interfaces/layouts";
import IElement from "@/frontend/interfaces/elements/element";

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const hoverEffect = {
    scale: 1,
    rotate: 3,
    transition: {
        type: "spring",
        stiffness: 200,
        damping: 4
    }
}

const staggeredFadeIn = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.3
        }
    }
}

interface IMotion extends Pick<IElement, 'descriptionClass'>, ILayouts {
    type: 'header' | 'div' | 'section' | 'article' | 'popover'
}

export default function ComponentMotion(props: IMotion): JSX.Element {
    const { type, descriptionClass, children } = props;

    switch (type) {
        case 'article':
            return (
                <motion.article initial="hidden" animate="visible" transition={{ duration: 1, staggerChildren: 0.2 }} className={descriptionClass}>
                    {children}
                </motion.article>
            )
        case 'header':
            return <motion.header variants={fadeIn} className={descriptionClass}>{children}</motion.header>
        case 'div':
            return <motion.div variants={fadeIn} className={descriptionClass} whileHover={hoverEffect}>{children}</motion.div>
        case 'section':
            return (
                <motion.section className={descriptionClass} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggeredFadeIn}>
                    {children}
                </motion.section>
            )
        case 'popover':
            return (
                <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 3, y: 0 }} className={descriptionClass}>
                    {children}
                </motion.div>
            )
    }
}
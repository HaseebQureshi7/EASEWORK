import { motion } from 'framer-motion'

const page_animations = {
    initial: {
        opacity: 0,
        x: '-25vw',
        // scale : 0.75,
        // y: -100,
    },
    animate: {
        opacity: 1,
        scale : 1,
        x: 0,
        // y: 0,
    },
    exit: {
        opacity: 0,
        x: '25vw',
        // scale : 0.75,
        // y: 100,
    },
}

export const micro_animations = {
    micro_initial: {
        opacity: 0,
        // x: '-25vw',
        scale : 0.75,
        // y: -10,
        transition : {
            duration : 1
        }
    },
    micro_animate: {
        opacity: 1,
        scale : 1,
        // x: 0,
        // y: 0,
        transition : {
            duration : 1
        }
    },
    micro_exit: {
        opacity: 0,
        // x: '25vw',
        scale : 0.75,
        // y: 10,
        transition : {
            duration : 1
        }
    },
}



const AnimatedPage = ({ children }) => {
    return (
        <motion.div variants={page_animations} initial='initial' animate="animate" exit='exit' transition={{ duration: 0.75,}}>{children}</motion.div>
    )
}

export default AnimatedPage
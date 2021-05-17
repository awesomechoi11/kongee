import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { mouse_atom } from "../../recoil/atoms";
import lerp from "../../utility/lerp";
import "./styles.scss";

const mouseAnimStates = {
    default: {
        width: 20,
        height: 20,
        opacity: 1,
        borderRadius: "100%",
    },
    big: {
        width: 200,
        height: 200,
        opacity: 0.3,
        borderRadius: "100%",
    },
};

export default function Mouse() {
    //global state for mouse interactions
    const mouseState = useRecoilValue(mouse_atom);
    const mousePosition = useRef([0, 0]);
    const lerpedMousePosition = useRef([0, 0]);
    const mousePositionControls = useAnimation();
    const animControls = useAnimation();

    // set mouse stuff
    useEffect(() => {
        // const framelength = 16.6666666667;
        document.addEventListener("mousemove", (event) => {
            mousePosition.current = [event.clientX, event.clientY];
        });
        // listen to mouse events on anim
        var prevTimestamp = 0;
        // timestamp: time elapsed in milliseconds since the web page was loaded
        requestAnimationFrame(function animFrame(timestamp) {
            // queue request for next frame// limits fps
            lerpedMousePosition.current = lerp(
                lerpedMousePosition.current,
                mousePosition.current,
                (timestamp - prevTimestamp) * 0.01
            );
            prevTimestamp = timestamp;
            mousePositionControls.set(positionToStyle());
            requestAnimationFrame(animFrame);
            return;
        });
    }, []);

    useEffect(() => {
        animControls.start({
            ...mouseAnimStates[mouseState.animState],
            backgroundColor: mouseState.color,
            transition: {
                duration: 0.3,
            },
        });
        return () => {
            animControls.stop();
        };
    }, [mouseState]);

    function positionToStyle() {
        const [x, y] = lerpedMousePosition.current;
        return {
            transform: `translate(${x}px,${y}px)`,
        };
    }

    return (
        <motion.div id="mouse-wrapper" animate={mousePositionControls}>
            <motion.div
                className="mouse-inner"
                animate={animControls}
            ></motion.div>
        </motion.div>
    );
}

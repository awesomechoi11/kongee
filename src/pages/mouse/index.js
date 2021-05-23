import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRecoilValue, useRecoilCallback, useSetRecoilState } from "recoil";
import {
    mouse_atom,
    override_mouse_atom,
    global_mouse_position_atom,
} from "../../recoil/atoms";
import lerp from "../../utility/lerp";
import "./styles.scss";

const mouseAnimStates = {
    default: {
        width: 20,
        height: 20,
        opacity: 1,
        borderRadius: "100%",
        backgroundColor: "#fff",
    },
    big: {
        width: 200,
        height: 200,
        opacity: 1,
        borderRadius: "100%",
    },
    icon: {
        width: 56,
        height: 56,
        opacity: 1,
        borderRadius: "100%",
    },
    zero: {
        width: 0,
        height: 0,
        opacity: 1,
        borderRadius: "100%",
    },
    gigantic: {
        width: 5000,
        height: 5000,
        opacity: 1,
        borderRadius: "100%",
        transition: {
            duration: 1,
        },
    },
    none: {},
};

export default function Mouse() {
    //global state for mouse interactions
    const mouseState = useRecoilValue(mouse_atom);
    const setGlobalMousePosition = useSetRecoilState(
        global_mouse_position_atom
    );
    const mouseOverrideCallback = useRecoilCallback(({ snapshot }) => () => {
        const overrideLoadable = snapshot.getLoadable(override_mouse_atom);
        if (overrideLoadable.state === "hasValue") {
            return overrideLoadable.contents;
        }
        return {
            enabled: false,
        };
    });

    const mousePosition = useRef([
        document.body.clientWidth / 2,
        document.body.clientHeight / 2,
    ]);
    const lerpedMousePosition = useRef([
        document.body.clientWidth / 2,
        document.body.clientHeight / 2,
    ]);
    const mousePositionControls = useAnimation();
    const animControls = useAnimation();

    // set mouse stuff
    useEffect(() => {
        // const framelength = 16.6666666667;
        const handleMouseMove = (event) => {
            const override = mouseOverrideCallback();
            if (override.enabled) {
                mousePosition.current = override.position;
            } else {
                mousePosition.current = [event.clientX, event.clientY];
            }
            setGlobalMousePosition({
                default: mousePosition.current,
                lerped: lerpedMousePosition.current,
            });
        };
        document.addEventListener("mousemove", handleMouseMove);
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
            setGlobalMousePosition({
                default: mousePosition.current,
                lerped: lerpedMousePosition.current,
            });
            prevTimestamp = timestamp;
            mousePositionControls.set(positionToStyle());
            requestAnimationFrame(animFrame);
            return;
        });

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        animControls.start({
            transition: {
                duration: 0.24,
            },
            ...mouseState,
            ...mouseAnimStates[mouseState.animState],
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

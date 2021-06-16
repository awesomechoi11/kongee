import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRecoilValue, useRecoilCallback, useSetRecoilState } from "recoil";
import {
    mouse_atom,
    override_mouse_atom,
    global_mouse_position_atom,
    forceMouseRerender,
    mouse_wrapper_atom,
} from "../../recoil/atoms";
import lerp from "../../utility/lerp";
import "./styles.scss";
import fastequal from "fast-deep-equal";

const philz_png =
    "https://cdn.brandon-choi.info/kongee/assets/sallizzle_w_philz.png";

const mouseAnimStates = {
    default: {
        width: "2rem",
        height: "2rem",
        opacity: 1,
        borderRadius: "100%",
        backgroundColor: "#fff",
    },
    big: {
        width: "20rem",
        height: "20rem",
        opacity: 1,
        borderRadius: "100%",
    },
    icon: {
        width: "5.6rem",
        height: "5.6rem",
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
        width: "500rem",
        height: "500rem",
        opacity: 1,
        borderRadius: "100%",
        transition: {
            duration: 1,
        },
    },
    workHover: {
        width: "12.5rem",
        height: "12.5rem",
        opacity: 1,
        borderRadius: "100%",
        backgroundColor: "#000",
    },
    workHoverNotEnabled: {
        width: "12.5rem",
        height: "12.5rem",
        opacity: 1,
        borderRadius: "100%",
        backgroundColor: "#000",
    },
    left: {
        width: "12.5rem",
        height: "12.5rem",
        opacity: 1,
        borderRadius: "100%",
        backgroundColor: "#000",
    },
    right: {
        width: "12.5rem",
        height: "12.5rem",
        opacity: 1,
        borderRadius: "100%",
        backgroundColor: "#000",
    },
    philz: {
        width: "42rem",
        height: "54rem",
        opacity: 1,
        backgroundColor: "#0000",
        borderRadius: "0",
    },
    none: {},
    custom: {},
};

export default function Mouse() {
    //global state for mouse interactions
    const mouseState = useRecoilValue(mouse_atom);
    const setGlobalMousePosition = useSetRecoilState(
        global_mouse_position_atom
    );

    const mouse_wrapper_value = useRecoilValue(mouse_wrapper_atom);

    const forceMouseRerenderValue = useRecoilValue(forceMouseRerender);
    useEffect(() => {
        if (forceMouseRerenderValue && forceMouseRerenderValue !== 0) {
            const override = mouseOverrideCallback();
            if (override.enabled) {
                mousePosition.current = override.position;
            }
            setGlobalMousePosition({
                default: mousePosition.current,
                lerped: lerpedMousePosition.current,
            });
        }
    }, [forceMouseRerenderValue]);

    // get mouse overrides without subbing
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
    // const animControls2 = useAnimation();
    // set mouse stuff
    useEffect(() => {
        const override = mouseOverrideCallback();
        if (override.enabled) {
            mousePosition.current = override.position;
        }
        setGlobalMousePosition({
            default: mousePosition.current,
            lerped: lerpedMousePosition.current,
        });
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
        const animationFrameID = requestAnimationFrame(function animFrame(
            timestamp
        ) {
            // limit fps
            if (timestamp - prevTimestamp < 13) {
                requestAnimationFrame(animFrame);
                return;
            }

            // prevent useless updates
            if (
                !fastequal(mousePosition.current, lerpedMousePosition.current)
            ) {
                lerpedMousePosition.current = lerp(
                    lerpedMousePosition.current,
                    mousePosition.current,
                    (timestamp - prevTimestamp) * 0.01
                );
                setGlobalMousePosition({
                    default: mousePosition.current,
                    lerped: lerpedMousePosition.current,
                });
            }
            prevTimestamp = timestamp;
            function positionToStyle() {
                const [x, y] = lerpedMousePosition.current;
                return {
                    transform: `translate(${x}px,${y}px)`,
                };
            }
            mousePositionControls.set(positionToStyle());
            requestAnimationFrame(animFrame);
            return;
        });

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameID);
        };
    }, []);

    useEffect(() => {
        const mousevalues =
            mouseState.animState === "custom"
                ? {
                      ...mouseState,
                  }
                : {
                      ...mouseState,
                      ...mouseAnimStates[mouseState.animState],
                  };
        animControls.start({
            transition: {
                duration: 0.24,
            },
            ...mousevalues,
        });

        return () => {
            animControls.stop();
        };
    }, [mouseState]);

    useEffect(() => {
        if (mouse_wrapper_value) mousePositionControls.set(mouse_wrapper_value);
    }, [mouse_wrapper_value]);

    return (
        <motion.div id="mouse-wrapper" animate={mousePositionControls}>
            <motion.div className="mouse-inner" animate={animControls}>
                {mouseState.animState === "workHover" && (
                    <span>
                        learn
                        <br />
                        more
                    </span>
                )}
                {mouseState.animState === "workHoverNotEnabled" && (
                    <span>
                        coming
                        <br />
                        soon
                    </span>
                )}
                {mouseState.animState === "left" && (
                    <span className="arrow">{left_svg}</span>
                )}
                {mouseState.animState === "right" && (
                    <span className="arrow">{right_svg}</span>
                )}
                {mouseState.animState === "philz" && (
                    <span className="philz">
                        <img src={philz_png} />
                        <div className="philz-bg" />
                    </span>
                )}
            </motion.div>
        </motion.div>
    );
}
const right_svg = (
    <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.4167 25H39.5833"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M25 10.4165L39.5833 24.9998L25 39.5832"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);
const left_svg = (
    <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M39.5833 25H10.4167"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M25 39.5832L10.4167 24.9998L25 10.4165"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

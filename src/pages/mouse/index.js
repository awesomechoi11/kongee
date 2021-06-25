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

const bigIcon = {
    width: "12.5rem",
    height: "12.5rem",
    opacity: 1,
    borderRadius: "100%",
    backgroundColor: "#000",
};
const icon = {
    width: "5.6rem",
    height: "5.6rem",
    opacity: 1,
    borderRadius: "100%",
};
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
    icon: icon,
    landingSocial_LinkedIn: icon,
    landingSocial_Instagram: icon,
    landingSocial_mail: icon,
    landingSocial_resume: icon,
    aboutSocial_LinkedIn: icon,
    aboutSocial_Instagram: icon,
    aboutSocial_mail: icon,
    aboutSocial_resume: icon,
    text: {
        width: "auto",
        height: "auto",
        borderRadius: "1.5rem",
        backgroundColor: "#000",
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
    left: bigIcon,
    right: bigIcon,
    expand: bigIcon,
    swipe: bigIcon,
    close: bigIcon,
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
    //#region
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
    //#endregion

    function LandingSocialText(props) {
        const initial =
            props.className === "aboutSocial-text"
                ? {
                      y: "-2rem",
                  }
                : {
                      x: "-10rem",
                  };

        return (
            <motion.span
                initial={{
                    opacity: 0,
                    ...initial,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                }}
                className="landingSocial-text"
                {...props}
            >
                {props.children}
            </motion.span>
        );
    }

    const mouseExtraComponent = {
        left: <span className="arrow">{left_svg}</span>,
        right: <span className="arrow">{right_svg}</span>,
        philz: (
            <span className="philz">
                <img alt="" src={philz_png} />
                <div className="philz-bg" />
            </span>
        ),
        workHoverNotEnabled: (
            <span>
                coming
                <br />
                soon
            </span>
        ),
        workHover: (
            <span>
                learn
                <br />
                more
            </span>
        ),
        expand: <span className="expand">{expand_svg}</span>,
        swipe: (
            <motion.span
                key="swipe"
                className="expand swipe"
                initial={{
                    rotate: "-180deg",
                }}
                animate={{
                    rotate: "0deg",
                }}
            >
                {swipe_svg}
            </motion.span>
        ),
        close: (
            <motion.span
                key="close"
                className="expand"
                initial={{
                    rotate: "-180deg",
                }}
                animate={{
                    rotate: "0deg",
                }}
            >
                {close_svg}
            </motion.span>
        ),
        landingSocial_LinkedIn: <LandingSocialText>LinkedIn</LandingSocialText>,
        landingSocial_Instagram: (
            <LandingSocialText>Instagram</LandingSocialText>
        ),
        landingSocial_mail: <LandingSocialText>E-Mail</LandingSocialText>,
        landingSocial_resume: <LandingSocialText>Resume</LandingSocialText>,
        aboutSocial_LinkedIn: (
            <LandingSocialText className="aboutSocial-text">
                LinkedIn
            </LandingSocialText>
        ),
        aboutSocial_Instagram: (
            <LandingSocialText className="aboutSocial-text">
                Instagram
            </LandingSocialText>
        ),
        aboutSocial_mail: (
            <LandingSocialText className="aboutSocial-text">
                E-Mail
            </LandingSocialText>
        ),
        aboutSocial_resume: (
            <LandingSocialText className="aboutSocial-text">
                Resume
            </LandingSocialText>
        ),
        text: <span className="text">{mouseState.text}</span>,
    };
    return (
        <motion.div id="mouse-wrapper" animate={mousePositionControls}>
            <motion.div className="mouse-inner" animate={animControls}>
                {mouseExtraComponent[mouseState.animState]}
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
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M25 10.4165L39.5833 24.9998L25 39.5832"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M25 39.5832L10.4167 24.9998L25 10.4165"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const expand_svg = (
    <svg
        width="53"
        height="53"
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24.3309 41.8741C33.9038 41.8741 41.6642 34.142 41.6642 24.6038C41.6642 15.0657 33.9038 7.3335 24.3309 7.3335C14.758 7.3335 6.99756 15.0657 6.99756 24.6038C6.99756 34.142 14.758 41.8741 24.3309 41.8741Z"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M45.9975 46.192L36.5725 36.8013"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M24.3308 18.1274V31.0802"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M17.8308 24.6035H30.8308"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);
const swipe_svg = (
    <svg
        width="106"
        height="106"
        viewBox="0 0 106 106"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 53L16.5 39.5M3 53L16.5 66.5M3 53H103M103 53L89.5 39.5M103 53L89.5 66.5"
            stroke="white"
            stroke-width="4"
            stroke-linecap="square"
        />
        <path
            d="M53 3L66.5 16.5M53 3L39.5 16.5M53 3L53 103M53 103L66.5 89.5M53 103L39.5 89.5"
            stroke="white"
            stroke-width="4"
            stroke-linecap="square"
        />
    </svg>
);
const close_svg = (
    <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.42054 1.64645L6.06699 1.29289L5.71343 1.64645L1.64645 5.71343L1.29289 6.06699L1.64645 6.42054L22.2259 27L1.64645 47.5795L1.29289 47.933L1.64645 48.2866L5.71343 52.3535L6.06699 52.7071L6.42054 52.3535L27 31.7741L47.5795 52.3535L47.933 52.7071L48.2866 52.3535L52.3535 48.2866L52.7071 47.933L52.3535 47.5795L31.7741 27L52.3535 6.42054L52.7177 6.05643L52.343 5.70319L48.1564 1.75582L47.8032 1.42276L47.4598 1.76606L27 22.2259L6.42054 1.64645Z"
            fill="white"
            stroke="black"
        />
    </svg>
);

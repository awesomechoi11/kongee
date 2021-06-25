import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
    Route,
    Switch,
    useHistory,
    useLocation,
    useRouteMatch,
} from "react-router";
import vec2 from "gl-vec2";
import _ from "lodash";
import clsx from "clsx";

import "./styles.scss";

import useLoadTracker from "../../../../utility/useLoadTracker";
import GravityButton from "../../../../components/GravityButton";
import { left_arrow_svg, right_arrow_svg } from "../../../../assets/svg";

import {
    atom,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import {
    mousePartialState_atom,
    mouse_wrapper_atom,
} from "../../../../recoil/atoms";
import AuxiliumCase from "./case/auxilium";
import When2meetCase from "./case/when2meet";
import CaseContentWrapper from "./case/components/CaseContentWrapper";
import { figma_svg } from "../../../../assets/tools";

const auxilium_preview =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/auxilium_preview.jpg";
const when2meet_preview =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/when2meet_preview.png";
const bridge_preview =
    "https://cdn.brandon-choi.info/kongee/assets/bridge/bridge_preview.png";

function getBeforeAndAfter(Arr, index) {
    const length = Arr.length;
    return vec2.add([], [index, index], [-1, 1]).map((value) => {
        if (value < 0) {
            return Arr[value + length];
        } else if (value >= length) {
            return Arr[value - length];
        }
        return Arr[value];
    });
}

function MouseLabel({ labelValue, ...props }) {
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);

    return (
        <div
            className="tools-item"
            {...props}
            onMouseEnter={() => {
                setMouseWrapper({
                    mixBlendMode: "normal",
                });
                setMouse({
                    animState: "text",
                    text: labelValue,
                });
            }}
            onMouseLeave={() => {
                setMouse({
                    animState: "default",
                });
                setMouseWrapper({
                    mixBlendMode: "difference",
                });
            }}
        >
            {props.children}
        </div>
    );
}

const contentMap = [
    {
        titleStyle: {
            // top is calculated by subtracting from max
            width: "48.9rem",
            height: "15.7rem",
            top: "0rem",
            left: "0rem",
            fontSize: "12rem",
            lineHeight: "15.7rem",
        },

        description: "36-HR HACKATHON • PROTOTYPING • DESIGN",
        date: "FEB 2021 - MAR 2021",
        title: "auxilium",
        tools: [<MouseLabel labelValue="figma">{figma_svg}</MouseLabel>],
        bannerDetails: {
            team: ["Brandon Choi", "Mai Moua Vang"],
            overview: [
                "Finding resources for financial struggles, food insecurity, and mental health assistance has been difficult for the city of Sacramento ever since the start of COVID-19.",
            ],
            objective: [
                "Improving the user experience of finding resources and COVID relief-related assistance for the city of Sacramento.",
            ],
            "my role": [
                "ui design lead",
                "ux research",
                "branding",
                "documentation",
            ],
        },
        overviewMarkers: [
            "overview",
            "problem",
            "objective",
            "approach",
            {
                id: "rnd",
                text: "R&D",
            },
            "results",
        ],
        color: "#EEC878",
        id: "auxilium-case",
        enabled: true,

        path: "auxilium",
        preview: auxilium_preview,
        case: <AuxiliumCase />,
    },
    {
        titleStyle: {
            width: "68.8rem",
            height: "9.4rem",
            top: "5rem",
            left: "0rem",
            fontSize: "7.2rem",
            lineHeight: "9.4rem",
        },
        overviewMarkers: [
            "overview",
            {
                id: "rnd-initial",
                text: "R&D Initial",
            },
            {
                id: "rnd-user-research",
                text: "user research",
            },
            {
                id: "rnd-ideation",
                text: "Ideation",
            },
            {
                id: "lofi-midfi",
                text: "LO/ MID-FI",
            },
            {
                id: "hifi",
                text: "hi-fi",
            },
            "takeaways",
        ],
        description: "14-DAY DESIGN SPRINT • UX RESEARCH • DESIGN",
        date: "MAY 2021",
        title: "when2meet redesign",
        tools: [<MouseLabel labelValue="figma">{figma_svg}</MouseLabel>],
        bannerDetails: {
            team: ["Brandon Choi", "Mai Moua Vang"],
            overview: [
                "Finding resources for financial struggles, food insecurity, and mental health assistance has been difficult for the city of Sacramento ever since the start of COVID-19.",
            ],
            objective: [
                "Improving the user experience of finding resources and COVID relief-related assistance for the city of Sacramento.",
            ],
            "my role": [
                "ideation",
                "prototyping",
                "illustration",
                "branding",
                "documentation",
            ],
        },
        color: "#769E5D",
        id: "when2meet-case",
        enabled: true,

        path: "when2meet",
        preview: when2meet_preview,
        case: <When2meetCase />,
    },
    {
        titleStyle: {
            // top is calculated by subtracting from max
            width: "36.5rem",
            height: "15.7rem",
            top: "0rem",
            left: "0rem",
            fontSize: "12rem",
            lineHeight: "15.7rem",
        },

        description: "7-DAY DESIGN SPRINT • UI DESIGN • RESEARCH",
        date: "JUN 2021",
        title: "bridge",
        tools: [<MouseLabel labelValue="figma">{figma_svg}</MouseLabel>],
        bannerDetails: {
            team: ["Brandon Choi", "Mai Moua Vang"],
            overview: [
                "Finding resources for financial struggles, food insecurity, and mental health assistance has been difficult for the city of Sacramento ever since the start of COVID-19.",
            ],
            objective: [
                "Improving the user experience of finding resources and COVID relief-related assistance for the city of Sacramento.",
            ],
            "my role": [
                "ui design lead",
                "ux research",
                "branding",
                "documentation",
            ],
        },
        overviewMarkers: [
            "overview",
            "problem",
            "objective",
            "approach",
            {
                id: "rnd",
                text: "R&D",
            },
            "results",
        ],
        color: "#C6B4D3",
        id: "bridge-case",
        enabled: false,

        path: "bridge",
        preview: bridge_preview,
        case: <AuxiliumCase />,
    },
];

function Work() {
    useLoadTracker({
        when2meet_preview,
        auxilium_preview,
    });
    const [active, setActive] = useRecoilState(work_state_atom);
    let location = useLocation();
    let history = useHistory();
    let { path, url } = useRouteMatch();
    const currentIndex = useMemo(
        () =>
            _.findIndex(contentMap, (o) =>
                location.pathname.startsWith(`${url}/${o.path}`)
            ),
        [url, location]
    );
    const beforeAndAfter = useMemo(
        () => getBeforeAndAfter(contentMap, currentIndex),
        [currentIndex]
    );
    useLayoutEffect(() => {
        if (active) setActive(!active);
    }, []);
    useLayoutEffect(() => {
        if (
            location.pathname === path ||
            (location.pathname ===
                `/work/${contentMap[currentIndex].path}/case` &&
                !contentMap[currentIndex].enabled)
        )
            history.push(`${url}/${contentMap[0].path}`);
    }, [location.pathname]);

    return (
        <div id="work">
            {typeof currentIndex !== "undefined" && currentIndex !== -1 && (
                <Switch>
                    <Route
                        exact
                        path={`${url}/${contentMap[currentIndex].path}`}
                    >
                        <WorkPreview currentIndex={currentIndex} />
                    </Route>
                    <Route
                        path={`${url}/${contentMap[currentIndex].path}/case`}
                    >
                        <CaseContentWrapper
                            caseDetails={contentMap[currentIndex]}
                            beforeAndAfter={beforeAndAfter}
                            key={contentMap[currentIndex].path}
                        >
                            {contentMap[currentIndex].case}
                        </CaseContentWrapper>
                    </Route>
                </Switch>
            )}
        </div>
    );
}

function WorkPreview({ currentIndex }) {
    return (
        <>
            <WorkDate currentIndex={currentIndex} />
            <WorkSideDescription currentIndex={currentIndex} />
            <WorkTitle currentIndex={currentIndex} />
            <WorkPreviewWindow currentIndex={currentIndex} />
            <WorkNavigation currentIndex={currentIndex} />
        </>
    );
}

function WorkDate({ currentIndex }) {
    const { date, title } = contentMap[currentIndex];
    const active = useRecoilValue(work_state_atom);
    return (
        <AnimatePresence>
            <motion.div
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 0 : 1 }}
                exit={{ opacity: 0 }}
                className="date"
            >
                {date}
            </motion.div>
        </AnimatePresence>
    );
}
function WorkSideDescription({ currentIndex }) {
    const { description, title } = contentMap[currentIndex];
    const active = useRecoilValue(work_state_atom);
    return (
        <AnimatePresence>
            <motion.div
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 0 : 1 }}
                exit={{ opacity: 0 }}
                className="side-description"
            >
                {description}
            </motion.div>
        </AnimatePresence>
    );
}

function WorkTitle({ currentIndex }) {
    const { title, titleStyle } = contentMap[currentIndex];

    const active = useRecoilValue(work_state_atom);

    const initialAnim = {
        rotateX: "90deg",
        opacity: 0,
    };
    const exitAnim = {
        rotateX: "0deg",
        opacity: 0,
    };
    return (
        <AnimatePresence>
            <motion.div
                initial={initialAnim}
                animate={{
                    rotateX: "0deg",
                    opacity: active ? 0 : 1,
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.41, 0.91, 0.46, 1],
                }}
                exit={exitAnim}
                className="work-title-wrapper"
                key={title}
            >
                <div className="work-title" style={titleStyle}>
                    {title}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

function WorkNavigation({ currentIndex }) {
    let history = useHistory();

    const beforeAndAfter = useMemo(
        () => getBeforeAndAfter(contentMap, currentIndex),
        [currentIndex]
    );
    const [counter, setCounter] = useState(0);
    const beforeRef = useRef(null);
    const afterRef = useRef(null);

    const active = useRecoilValue(work_state_atom);

    return (
        <motion.div
            animate={{
                opacity: active ? 0 : 1,
            }}
            className="work-navigation"
        >
            {beforeAndAfter &&
                beforeAndAfter.map((item, index) => {
                    return (
                        <GravityButton
                            className="navgrav"
                            enterPadding={[30, 30]}
                            leavePadding={[110, 110]}
                            onClick={(e) => {
                                if (active) return;
                                history.push(item.path);
                                setCounter(counter + 1);
                            }}
                            counter={counter}
                            key={index}
                        >
                            <div
                                className={clsx(
                                    "navitem",
                                    index ? "after" : "before"
                                )}
                                ref={index ? afterRef : beforeRef}
                            >
                                {index === 0 && (
                                    <div className="icon">{left_arrow_svg}</div>
                                )}
                                {(index ? "next up: " : "back to: ") +
                                    item.title}
                                {index === 1 && (
                                    <div className="icon">
                                        {right_arrow_svg}
                                    </div>
                                )}
                            </div>
                        </GravityButton>
                    );
                })}
        </motion.div>
    );
}

const work_state_atom = atom({
    key: "work_state_atom",
    default: false,
});

function WorkPreviewWindow({ currentIndex, ...props }) {
    const { title, enabled, preview, color, path } = contentMap[currentIndex];
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    const [active, setActive] = useRecoilState(work_state_atom);
    const history = useHistory();
    const workOverlayControls = useAnimation();

    const variants = {
        initialAnim: {
            outline: `solid ${active ? color : "#000"} 0.3rem`,
        },
        beforeTransition: {
            outline: `solid ${active ? color : "#000"} 0.3rem`,
            width: "88.9rem",
            height: "48.2rem",
            left: "54.2rem",
            top: "30.8rem",
            transition: {
                duration: 0.4,
            },
        },
        outlineTransition: {
            outline: `solid ${active ? color : "#000"} 0.3rem`,
            transition: {
                duration: 0.4,
            },
        },
        shiftTransition: {
            width: "97.7rem",
            height: "42.6rem",
            left: "74.3rem",
            top: "20.9rem",
            outline: `solid ${active ? color : "#000"} 0rem`,
            transition: {
                duration: 1,
                ease: [0.41, 0.91, 0.46, 1],
            },
        },
    };

    function handleMouseEnter(e) {
        setMouse({
            animState: enabled ? "workHover" : "workHoverNotEnabled",
            color,
        });
        setMouseWrapper({
            mixBlendMode: "normal",
        });
    }
    function handleMouseLeave(e) {
        setMouse({
            animState: "default",
            color: "#fff",
        });
        setMouseWrapper({
            mixBlendMode: "difference",
        });
    }
    function handleClick() {
        if (enabled) setActive(!active);
    }

    useEffect(() => {
        if (active) {
            workOverlayControls
                .start("outlineTransition")
                .then(() => workOverlayControls.start("shiftTransition"))
                .then(() => {
                    history.push(`/work/${path}/case`);
                    setActive(false);
                });
        } else {
            workOverlayControls.start("beforeTransition");
        }
    }, [active, currentIndex]);
    return (
        <motion.div
            variants={variants}
            initial={"initialAnim"}
            animate={workOverlayControls}
            className="preview-window"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <AnimatePresence>
                <motion.img
                    key={title}
                    src={preview}
                    alt={"preview image for " + title}
                    initial={{
                        scale: 1.4,
                        opacity: 0,
                        // zIndex: 1,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                            delay: 0.05,
                            // duration: 0.3,
                        },
                        // zIndex: 2,
                    }}
                    exit={{
                        // zIndex: 3,
                        scale: 0.6,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.28,
                        ease: [0.07, 0.7, 0.55, 1],
                    }}
                />
            </AnimatePresence>
            <motion.div
                key={title}
                className="preview-overlay"
                initial={{
                    backgroundColor: color,
                }}
                animate={{
                    height: active ? "100%" : "0%",
                    transition: {
                        duration: 0.3,
                    },
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.41, 0.91, 0.46, 1],
                }}
            />
        </motion.div>
    );
}

export default Work;

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
import auxilium_preview from "../../../../assets/auxilium/auxilium_preview.jpg";
import when2meet_preview from "../../../../assets/when2meet_preview.png";

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
import CaseContentWrapper from "./case/components/CaseContentWrapper";

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

const contentMap = [
    {
        className: "",
        titleStyle: {
            // top is calculated by subtracting from max
            width: "48.9rem",
            height: "15.7rem",
            top: "0rem",
            left: "0rem",
            fontSize: "12rem",
            lineHeight: "15.7rem",
        },
        caseDetails: {
            description: "36-HR HACKATHON • PROTOTYPING • DESIGN",
            date: "FEB 2021 - MAR 2021",
            title: "auxilium",
            tools: ["figma"],
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
            color: "#EEC878",
            id: "auxilium-case",
        },
        path: "auxilium",
        preview: auxilium_preview,
        color: "#EEC878",
        case: <AuxiliumCase />,
        enabled: true,
    },
    {
        className: "",
        titleStyle: {
            width: "68.8rem",
            height: "9.4rem",
            top: "5rem",
            left: "0rem",
            fontSize: "7.2rem",
            lineHeight: "9.4rem",
        },
        caseDetails: {
            description: "14-DAY DESIGN SPRINT • UX RESEARCH • DESIGN",
            date: "MAY 2021",
            title: "when2meet redesign",
            tools: [],
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
            id: "auxilium-case",
        },
        path: "when2meet",
        preview: when2meet_preview,
        color: "#769E5D",
        case: <AuxiliumCase />,
        enabled: false,
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
        if (location.pathname === path)
            history.push(`${url}/${contentMap[0].path}`);
    }, []);

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
                            caseDetails={contentMap[currentIndex].caseDetails}
                            beforeAndAfter={beforeAndAfter}
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
    const { date, title } = contentMap[currentIndex].caseDetails;
    const active = useRecoilValue(work_state_atom);
    // console.log(contentMap[currentIndex].caseDetails);
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
    const { description, title } = contentMap[currentIndex].caseDetails;
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
    const { caseDetails, titleStyle } = contentMap[currentIndex];
    const { title } = caseDetails;
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
    // console.log(beforeAndAfter);
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
                                    item.caseDetails.title}
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
    const { caseDetails, preview, color, path, enabled } =
        contentMap[currentIndex];
    const { title } = caseDetails;
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    const [active, setActive] = useRecoilState(work_state_atom);
    const history = useHistory();
    const workOverlayControls = useAnimation();

    const variants = {
        initialAnim: {
            opacity: 0,
        },
        beforeTransition: {
            opacity: 1,
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
            width: "106rem",
            height: "42.5rem",
            left: "65.5rem",
            top: "21rem",
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
        <AnimatePresence>
            <motion.div
                key={title}
                variants={variants}
                initial={"initialAnim"}
                animate={workOverlayControls}
                exit={"exitAnim"}
                className="preview-window"
                // style={{
                //     outline: `solid ${active ? color : "#000"} 3rem`,
                // }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <img src={preview} alt={"preview image for " + title} />
                <motion.div
                    className="preview-overlay"
                    initial={{
                        backgroundColor: color,
                    }}
                    animate={{
                        height: active ? "100%" : "0%",
                        transition: {
                            duration: 0.4,
                        },
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.41, 0.91, 0.46, 1],
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
}

export default Work;

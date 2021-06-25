import {
    useEffect,
    useRef,
    Component,
    createRef,
    useLayoutEffect,
    useState,
} from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { Scrollbar } from "react-scrollbars-custom";
import {
    useRecoilState,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import {
    forceRefresh_global_mouse_position_selector,
    mousePartialState_atom,
    mouse_wrapper_atom,
    override_mouse_atom,
} from "../../../../../../recoil/atoms";
import {
    case_atom,
    case_overlay_atom,
} from "../../../../../../recoil/case_atoms";
import CaseBanner from "./CaseBanner";
import CaseFooter from "./CaseFooter";
import "./styles.scss";
import { SpringSystem } from "rebound";
import { AnimateSharedLayout, motion } from "framer-motion";
import GravityButton from "../../../../../../components/GravityButton";
import clsx from "clsx";
export default function CaseContentWrapper({
    children,
    caseDetails,
    beforeAndAfter,
}) {
    const setOverlay = useSetRecoilState(case_overlay_atom);
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    const setOverride = useSetRecoilState(override_mouse_atom);
    const [caseState, setCaseState] = useRecoilState(case_atom);
    const [ready, setReady] = useState(false);

    useLayoutEffect(() => {
        // console.log("casewrapperrender");
        setMouse({
            animState: "default",
        });
        setMouseWrapper({
            mixBlendMode: "difference",
        });
        setOverride({
            enabled: false,
        });
        setCaseState({
            inTransition: false,
            selected: 0,
            backgroundColor: "#fff",
            top: 0,
            enabled: true,
            count: -1,
            currentMarker: false,
        });
        setOverlay({
            layoutId: "uwu",
        });
        setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setMousePosition = useResetRecoilState(
        forceRefresh_global_mouse_position_selector
    );
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef && caseState.count > 0 && ready) {
            // console.log("set scroll");
            scrollRef.current.scrollTop(caseState.top);
        }
    }, [caseState, ready]);
    function scrollToTargetAdjusted(query) {
        var element = document.querySelector(query);
        var headerOffset = 50;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition - headerOffset;

        document.querySelector(".ScrollbarsCustom-Scroller").scrollBy({
            top: offsetPosition,
            behavior: "smooth",
        });
    }

    return (
        <SpringScrollbars
            id={caseDetails.id}
            onScroll={() => {
                setMousePosition();
            }}
            className="case-wrapper"
            ref={scrollRef}
            noScrollX={true}
            noScrollY={!caseState.enabled}
            style={{ width: "100vw", height: "100vh" }}
        >
            <ParallaxProvider
                scrollContainer={document.querySelector(
                    ".ScrollbarsCustom-Scroller"
                )}
            >
                <CaseBanner caseDetails={caseDetails} />
                <motion.div className="case-children">
                    <AnimateSharedLayout>
                        <ImageOverlay />
                        {children}
                    </AnimateSharedLayout>
                    <div className="case-overview">
                        <div className="inner">
                            <AnimateSharedLayout>
                                {caseDetails.overviewMarkers &&
                                    caseDetails.overviewMarkers.map((data) => {
                                        const markerID =
                                            typeof data === "string"
                                                ? data
                                                : data.id;
                                        const markerText =
                                            typeof data === "string"
                                                ? data
                                                : data.text;

                                        return (
                                            <GravityButton
                                                enterPadding={[0, 0]}
                                                leavePadding={[0, 0]}
                                                itemDim={[41, 21]}
                                                key={markerID}
                                                className="item"
                                                preventLocalCounter
                                                onClick={() => {
                                                    scrollToTargetAdjusted(
                                                        `#${markerID}`
                                                    );
                                                    // document
                                                    //     .getElementById(
                                                    //         markerID
                                                    //     )
                                                    //     .scrollIntoView({
                                                    //         behavior: "smooth",
                                                    //         block: "start",
                                                    //     });
                                                }}
                                            >
                                                {caseState.currentMarker &&
                                                    caseState.currentMarker ===
                                                        markerID && (
                                                        <motion.span
                                                            className="marker"
                                                            layoutId="currentMarker"
                                                        >
                                                            •
                                                        </motion.span>
                                                    )}
                                                <motion.span
                                                    animate={{
                                                        x:
                                                            caseState.currentMarker &&
                                                            caseState.currentMarker ===
                                                                markerID
                                                                ? "1rem"
                                                                : "0rem",
                                                    }}
                                                    className={clsx(
                                                        "text",
                                                        caseState.currentMarker &&
                                                            caseState.currentMarker ===
                                                                markerID &&
                                                            "active"
                                                    )}
                                                >
                                                    {markerText}
                                                </motion.span>
                                            </GravityButton>
                                        );
                                    })}
                            </AnimateSharedLayout>
                        </div>
                    </div>
                </motion.div>
                <CaseFooter
                    caseDetails={caseDetails}
                    beforeAndAfter={beforeAndAfter}
                />
            </ParallaxProvider>
        </SpringScrollbars>
    );
}

function ImageOverlay() {
    const [caseOverlay, setCaseOverlay] = useRecoilState(case_overlay_atom);
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    const containerRef = useRef(null);
    const { layoutId, ...imgProps } = caseOverlay;
    const [big, setBig] = useState(1);
    const active = layoutId !== "uwu";
    useEffect(() => {
        setBig(1);
    }, [active]);
    return (
        <motion.div
            style={{
                pointerEvents: active ? "all" : "none",
            }}
            initial={false}
            animate={{
                background: active ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)",
            }}
            onClick={(e) => {
                e.stopPropagation();
                setCaseOverlay({
                    layoutId: "uwu",
                });
                setMouse({
                    animState: "default",
                });
                setMouseWrapper({
                    mixBlendMode: "difference",
                });
            }}
            id="image-overlay"
            ref={containerRef}
        >
            {active && (
                <motion.span
                    layoutId={layoutId}
                    drag
                    dragConstraints={containerRef}
                    dragTransition={{
                        power: 0.1,
                    }}
                    animate={{
                        scale: big,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onMouseEnter={() => {
                        setMouse({
                            animState: "swipe",
                        });
                        setMouseWrapper({
                            mixBlendMode: "normal",
                        });
                    }}
                    onMouseLeave={() => {
                        setMouse({
                            animState: "close",
                        });
                        setMouseWrapper({
                            mixBlendMode: "normal",
                        });
                    }}
                    onWheel={(e) => {
                        const sign = Math.sign(e.deltaY);
                        const newBig = big - sign * 0.1;
                        if (newBig > 0.5) {
                            setBig(newBig);
                        }
                    }}
                >
                    <motion.img alt="overlay" {...imgProps} />
                </motion.span>
            )}
        </motion.div>
    );
}

class SpringScrollbars extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
        this.myRef = createRef();
    }

    componentDidMount() {
        this.springSystem = new SpringSystem();
        this.spring = this.springSystem.createSpring();
        this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
    }

    componentWillUnmount() {
        this.springSystem.deregisterSpring(this.spring);
        this.springSystem.removeAllListeners();
        this.springSystem = undefined;
        this.spring.destroy();
        this.spring = undefined;
    }

    scrollTop(top) {
        const { scrollTop } = this.myRef.current;
        this.spring.setCurrentValue(scrollTop).setAtRest();
        this.spring.setEndValue(top);
    }

    handleSpringUpdate(spring) {
        const val = spring.getCurrentValue();
        this.myRef.current.scrollTop = val;
    }

    render() {
        return <Scrollbar {...this.props} ref={this.myRef} />;
    }
}

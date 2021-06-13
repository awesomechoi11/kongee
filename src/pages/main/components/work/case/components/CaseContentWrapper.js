import {
    useEffect,
    useRef,
    Component,
    createRef,
    useLayoutEffect,
} from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { Scrollbar } from "react-scrollbars-custom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
    forceRefresh_global_mouse_position_selector,
    mousePartialState_atom,
    mouse_wrapper_atom,
    override_mouse_atom,
} from "../../../../../../recoil/atoms";
import { case_atom } from "../../../../../../recoil/case_atoms";
import CaseBanner from "./CaseBanner";
import CaseFooter from "./CaseFooter";
import "./styles.scss";
import { SpringSystem } from "rebound";
import { motion } from "framer-motion";

export default function CaseContentWrapper({
    children,
    caseDetails,
    beforeAndAfter,
}) {
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    const setOverride = useSetRecoilState(override_mouse_atom);
    const [caseState, setCaseState] = useRecoilState(case_atom);
    useLayoutEffect(() => {
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
        });
    }, []);
    const setMousePosition = useResetRecoilState(
        forceRefresh_global_mouse_position_selector
    );
    const scrollRef = useRef(null);
    useEffect(() => {
        console.log(caseState);
        if (scrollRef && caseState.count) {
            scrollRef.current.scrollTop(caseState.top);
        }
    }, [caseState]);
    return (
        <SpringScrollbars
            id={caseDetails.id}
            onScroll={() => {
                setMousePosition();
            }}
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
                <motion.div className="case-children">{children}</motion.div>
                <CaseFooter
                    caseDetails={caseDetails}
                    beforeAndAfter={beforeAndAfter}
                />
            </ParallaxProvider>
        </SpringScrollbars>
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

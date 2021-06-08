import { useEffect, useRef, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Scrollbar from "react-scrollbars-custom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
    forceRefresh_global_mouse_position_selector,
    mousePartialState_atom,
    mouse_wrapper_atom,
    override_mouse_atom,
} from "../../../../../../recoil/atoms";
import CaseBanner from "./CaseBanner";
import CaseFooter from "./CaseFooter";
import "./styles.scss";

export default function CaseContentWrapper({
    children,
    caseDetails,
    beforeAndAfter,
}) {
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    const setOverride = useSetRecoilState(override_mouse_atom);

    useEffect(() => {
        setMouse({
            animState: "default",
        });
        setMouseWrapper({
            mixBlendMode: "difference",
        });
        setOverride({
            enabled: false,
        });
    }, []);

    const scrollRef = useRef(null);
    const setMousePosition = useResetRecoilState(
        forceRefresh_global_mouse_position_selector
    );
    const [scrollRefState, setScrollRefState] = useState(false);
    useEffect(() => {
        if (scrollRef && !!scrollRef.current && !scrollRefState) {
            scrollRef.current = scrollRef.current.querySelector(
                ".ScrollbarsCustom-Scroller"
            );
            setScrollRefState(true);
        }
    }, [scrollRef]);
    return (
        <Scrollbar
            id={caseDetails.id}
            createContext
            elementRef={(elemref) => {
                scrollRef.current = elemref;
            }}
            onScroll={() => {
                setMousePosition();
            }}
            noScrollX
            style={{ width: "100vw", height: "100vh" }}
        >
            {scrollRefState && (
                <ParallaxProvider scrollContainer={scrollRef.current}>
                    <CaseBanner caseDetails={caseDetails} />
                    {children}
                    <CaseFooter
                        caseDetails={caseDetails}
                        beforeAndAfter={beforeAndAfter}
                    />
                </ParallaxProvider>
            )}
        </Scrollbar>
    );
}

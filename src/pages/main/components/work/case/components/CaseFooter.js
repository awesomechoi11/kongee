import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    mousePartialState_atom,
    mouse_wrapper_atom,
} from "../../../../../../recoil/atoms";
import { case_selector } from "../../../../../../recoil/case_atoms";
import UniversalFooter from "../../../UniversalFooter";
import fastequal from "fast-deep-equal";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

export default function CaseFooter({ caseDetails, beforeAndAfter }) {
    return (
        <>
            <div className="footer-outer">
                <FooterItem className="left" caseDetails={beforeAndAfter[0]} />
                <FooterItem className="right" caseDetails={beforeAndAfter[1]} />
            </div>
            <UniversalFooter />
        </>
    );
}

function FooterItem({ caseDetails, className }) {
    const { color, enabled, path } = caseDetails;
    //#region case main animations
    const caseFooterControls = useAnimation();
    const variants = {
        before:
            className === "left"
                ? {
                      x: "20rem",
                      y: "35.1rem",
                      width: "57.8rem",
                      height: "33.8rem",
                  }
                : {
                      x: "105.9rem",
                      y: "35.1rem",
                      width: "57.8rem",
                      height: "33.8rem",
                  },
        after: {
            x: "67.1rem",
            transition: {
                ease: [0.37, 0.53, 0.11, 1],
            },
        },
        shiftTransition: {
            width: `${106}rem`,
            height: `${42.5}rem`,
            // x: 660.5499877929688
            // y: 209.6999969482422
            x: "66.05499877929688rem",
            y: "20.96999969482422rem",
            transition: {
                duration: 1,
                ease: [0.41, 0.91, 0.46, 1],
            },
        },
    };
    //#endregion

    //#region mouse interactions
    const [hovered, setHovered] = useState(false);
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    function handleMouseEnter(e) {
        setMouse({
            animState: enabled ? "workHover" : "workHoverNotEnabled",
            color,
        });
        setMouseWrapper({
            mixBlendMode: "normal",
        });
        setHovered(true);
    }
    function handleMouseLeave(e) {
        setMouse({
            animState: "default",
            color: "#fff",
        });
        setMouseWrapper({
            mixBlendMode: "difference",
        });
        setHovered(false);
    }
    function handleClick() {
        if (!enabled) return;
        const inTransition =
            caseState.selected !== className || !caseState.inTransition;
        setCaseState({
            inTransition,
            selected: className,
        });
        // hardcoded fun!
        if (inTransition) {
            // scroll to footer
            // console.log(
            //     document.querySelector(".case-children").getBoundingClientRect()
            //         .bottom,
            //     ((1294.2650024414062 * 10) / 1920) * document.body.clientWidth
            // );

            setCaseState({
                top:
                    document.querySelector(".case-children").clientHeight +
                    document.querySelector(".banner-outer").clientHeight,
                enabled: false,
                count: caseState.count + 5,
            });
        } else {
            setCaseState({
                enabled: true,
            });
        }
    }
    //#endregion

    //#region case defaults
    const [caseState, setCaseState] = useRecoilState(case_selector);
    useLayoutEffect(() => {
        // on mount set case to default
        const defaultCase = {
            inTransition: false,
            selected: 0,
            backgroundColor: "#fff",
            top: 0,
            enabled: true,
            count: 0, // so it refires even if same top value
        };
        if (!fastequal(defaultCase, caseState)) {
            setCaseState(defaultCase);
        }
    }, []);
    const isActive = useMemo(() => {
        if (caseState.inTransition) {
            if (caseState.selected === className) {
                return true;
            }
        } else {
            if (hovered) return true;
        }
        return false;
    }, [caseState, hovered]);
    let history = useHistory();
    useEffect(() => {
        const isAfter =
            caseState.inTransition && caseState.selected === className;
        caseFooterControls.start(isAfter ? "after" : "before").then(() => {
            if (isAfter)
                caseFooterControls.start("shiftTransition").then(() => {
                    setCaseState({
                        inTransition: false,
                        selected: 0,
                        backgroundColor: "#fff",
                        top: 0,
                        enabled: true,
                        count: -1,
                        currentMarker: false,
                    });
                    history.push(`/work/${path}/case`);
                });
        });
    }, [caseState]);
    //#endregion

    return (
        <motion.div
            className={className}
            animate={caseFooterControls}
            variants={variants}
            style={{
                // hover or in transition
                backgroundColor: isActive ? caseDetails.color : "",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div
                className={clsx(
                    "item-wrapper",
                    isActive && "active",
                    caseState.inTransition && "inTransition"
                )}
            >
                <div className="title">
                    {className === "left" ? "back to" : "next up"}
                </div>
                <div className="item-title">{caseDetails.title}</div>
            </div>
        </motion.div>
    );
}

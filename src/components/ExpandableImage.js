import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mousePartialState_atom, mouse_wrapper_atom } from "../recoil/atoms";
import { case_overlay_atom } from "../recoil/case_atoms";

export default function ExpandableImage({ imgProps, layoutId, ...props }) {
    const [caseOverlay, setCaseOverlay] = useRecoilState(case_overlay_atom);
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    return (
        <div
            {...props}
            onClick={() => {
                setCaseOverlay({
                    layoutId,
                    ...imgProps,
                });
                setMouse({
                    animState: "default",
                });
                setMouseWrapper({
                    mixBlendMode: "difference",
                });
            }}
            onMouseEnter={() => {
                setMouse({
                    animState: "expand",
                });
                setMouseWrapper({
                    mixBlendMode: "normal",
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
            {caseOverlay && caseOverlay.layoutId !== layoutId && (
                <motion.span layoutId={layoutId}>
                    <motion.img {...imgProps} alt="overlay" />
                </motion.span>
            )}
        </div>
    );
}

import { useRecoilState, useRecoilValue } from "recoil";
import {
    firstLoad_atom,
    loading_atom,
    transition_atom,
} from "../../recoil/atoms";
import { motion, useAnimation } from "framer-motion";
import "./styles.scss";
import { useEffect, useMemo } from "react";

function LoadingOverlay() {
    const loadingState = useRecoilValue(loading_atom);
    const transitionState = useRecoilValue(transition_atom);
    const [firstLoad, setFirstLoad] = useRecoilState(firstLoad_atom);
    const overlayOn = useMemo(() => {
        return transitionState.enabled || loadingState.loading || firstLoad;
    }, [transitionState, loadingState, firstLoad]);
    useEffect(() => {
        if (firstLoad) setFirstLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const overlayController = useAnimation();
    console.log(transitionState ,loadingState , firstLoad)
    useEffect(() => {
        // console.log(transitionState.enabled, loadingState.loading, firstLoad);
        if (transitionState.animate) {
            //if its on dont animate ig
            overlayController.start(overlayOn ? "dark" : "light");
        } else {
            overlayController.set(overlayOn ? "dark" : "light");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overlayOn]);
    useEffect(() => {
        if (firstLoad) {
            overlayController.set("dark");
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstLoad]);
    const variants = {
        dark: {
            opacity: 1,
            pointerEvents: "all",
        },
        light: {
            opacity: 0,
            pointerEvents: "none",
        },
    };
    
    return (
        <motion.div
            animate={overlayController}
            variants={variants}
            key="loadingOverlay"
            id="loadingOverlay"
        />
    );
}

export default LoadingOverlay;

import { useRecoilValue } from "recoil";
import { loading_atom, transition_atom } from "../../recoil/atoms";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.scss";

function LoadingOverlay() {
    const loadingState = useRecoilValue(loading_atom);
    const transitionState = useRecoilValue(transition_atom);
    const overlayOn = transitionState || loadingState.loading;
    return (
        <AnimatePresence>
            {overlayOn && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.3,
                    }}
                    id="loadingOverlay"
                />
            )}
        </AnimatePresence>
    );
}

export default LoadingOverlay;

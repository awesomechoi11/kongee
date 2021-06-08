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
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        delay: 1,
                        duration: 0.3,
                    }}
                    id="loadingOverlay"
                ></motion.div>
            )}
        </AnimatePresence>
    );
}

export default LoadingOverlay;

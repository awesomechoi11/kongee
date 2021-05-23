import { useRecoilValue } from "recoil";
import { loading_atom } from "../../recoil/atoms";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.scss";
import { useState } from "react";

function LoadingOverlay() {
    const loadingState = useRecoilValue(loading_atom);
    return (
        <AnimatePresence>
            {loadingState.loading && (
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        delay: 1,
                        duration: 1,
                    }}
                    id="loadingOverlay"
                >
                    loading loadingloadingloadingloadingloadingloading
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LoadingOverlay;

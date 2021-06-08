import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { mousePartialState_atom, mouse_wrapper_atom } from "../recoil/atoms";
import useLoadTracker from "../utility/useLoadTracker";
import "./FramerCarousel.scss";
function Slide({ imgsrc, description, ...props }) {
    return (
        <>
            <motion.div
                key={imgsrc}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="carousel-slide"
                {...props}
            >
                <img src={imgsrc} alt={description} />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="carousel-description"
            >
                {description}
            </motion.div>
        </>
    );
}

export default function FramerCarousel({ slides, ...props }) {
    const [page, setPage] = useState(0);
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    const slidesObj = Object.fromEntries(
        Object.values(slides).map((value, index) => [index, value.imgsrc])
    );
    const [loading, progress] = useLoadTracker(slidesObj, false);
    return (
        <div className={clsx("carousel", props.className)}>
            <div className="carousel-controls">
                <div
                    className="left"
                    onClick={() => {
                        setPage((slides.length + page - 1) % slides.length);
                    }}
                    onMouseEnter={() => {
                        setMouse({
                            animState: "left",
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
                ></div>
                <div className="middle"></div>
                <div
                    className="right"
                    onClick={() => {
                        setPage((page + 1) % slides.length);
                    }}
                    onMouseEnter={() => {
                        setMouse({
                            animState: "right",
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
                ></div>
            </div>
            <AnimatePresence>
                <Slide {...slides[page]} />
            </AnimatePresence>
        </div>
    );
}

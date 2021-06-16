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
            <div className="carousel-slide">
                <motion.img
                    src={imgsrc}
                    alt={description.innerText}
                    key={imgsrc}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                />
            </div>
            <div className="carousel-description">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {description}
                </motion.span>
            </div>
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
    const { imgsrc, description } = slides[page];
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
            <div className="carousel-slide">
                <AnimatePresence>
                    <motion.img
                        src={imgsrc}
                        alt={description.innerText}
                        key={imgsrc}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                ease: [1, 1, 1, 1],
                            },
                        }}
                        exit={{
                            x: -300,
                            opacity: 0,
                            transition: {
                                ease: [1, 1, 1, 1],
                            },
                        }}
                    />
                </AnimatePresence>
            </div>
            <div className="carousel-description">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: {
                            ease: [1, 1, 1, 1],
                        },
                    }}
                    exit={{ opacity: 0 }}
                    key={imgsrc}
                >
                    {description}
                </motion.span>
            </div>
        </div>
    );
}

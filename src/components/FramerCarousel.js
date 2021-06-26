import clsx from "clsx";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { mousePartialState_atom, mouse_wrapper_atom } from "../recoil/atoms";

import "./FramerCarousel.scss";

const leftArrow_svg = (
    <svg
        width="25"
        height="80"
        viewBox="0 0 25 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M22 1.83887L3.49999 40.003L22 78.1671"
            stroke="black"
            strokeWidth="5"
        />
    </svg>
);
const rightArrow_svg = (
    <svg
        width="25"
        height="80"
        viewBox="0 0 25 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 78.167L21.5 40.0029L3.00001 1.83873"
            stroke="black"
            strokeWidth="5"
        />
    </svg>
);

export default function FramerCarousel({ slides, ...props }) {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState("left");
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);

    const { key, SlideComponent, description } = slides[page];
    return (
        <div className={clsx("carousel", props.className)}>
            <div className="carousel-dots">
                <AnimateSharedLayout>
                    {slides.map((obj, index) => {
                        return (
                            <div
                                className={clsx(
                                    "dot",
                                    page === index && "selected",
                                    page === slides.length && "last"
                                )}
                                onClick={() => {
                                    setPage(index);
                                }}
                                key={"dot-" + index}
                            >
                                {page === index && (
                                    <motion.div
                                        layoutId="border-circle"
                                        className="border-circle"
                                    />
                                )}
                            </div>
                        );
                    })}
                </AnimateSharedLayout>
            </div>

            <div className={clsx("carousel-slide", "slide-" + (page + 1))}>
                <div
                    className="carousel-controls left"
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
                        setDirection("left");
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
                    <div className="arrow">{leftArrow_svg}</div>
                </div>
                <div
                    className="carousel-controls right"
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
                        setDirection("right");
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
                    <div className="arrow">{rightArrow_svg}</div>
                </div>

                <AnimatePresence>
                    <SlideComponent
                        key={key}
                        initial={{
                            x: 300 * (direction === "left" ? -1 : 1),
                            opacity: 0,
                        }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                ease: [1, 1, 1, 1],
                            },
                        }}
                        exit={{
                            x: -300 * (direction === "left" ? -1 : 1),
                            opacity: 0,
                            transition: {
                                ease: [1, 1, 1, 1],
                            },
                        }}
                        className={clsx(
                            "slide-component-" + (page + 1),
                            "slide-component"
                        )}
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
                    key={key}
                >
                    {description}
                </motion.span>
            </div>
        </div>
    );
}

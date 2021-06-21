import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import BlockImage from "react-block-image";

import "./BeforeAfterSlider.scss";
import { motion, useMotionValue } from "framer-motion";

export default function BeforeAfterSlider({
    before,
    after,
    className,
    ...props
}) {
    const [progress, setProgress] = useState(0.5);
    const [dim, setDim] = useState([0, 0]);
    const [dragging, setDragging] = useState(false);
    const width = useMotionValue(0);
    const x = useMotionValue(0);
    const containerRef = useRef(null);
    useEffect(() => {
        setProgress(0.5);
        if (containerRef && containerRef.current) {
            const {
                width: refwidth,
                height,
                left,
            } = containerRef.current.getBoundingClientRect();
            setDim([refwidth, height, left]);
            // console.log(left);
            x.set((refwidth - 25) / 2);
            width.set((refwidth - 25) / 2);
        }
    }, []);
    const offset = 50;
    return (
        <motion.div
            ref={containerRef}
            className={clsx("beforeAfterSlider", "container", className)}
            {...props}
        >
            <div
                className="after"
                style={{
                    backgroundImage: `url(${after})`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
            ></div>
            <motion.div
                className="content"
                style={{
                    width,
                }}
            >
                <div
                    className="before"
                    style={{
                        backgroundImage: `url(${before})`,
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        width: dim[0] + "px",
                    }}
                />
            </motion.div>
            {containerRef && containerRef.current && (
                <motion.div
                    className="handle"
                    drag="x"
                    dragMomentum={false}
                    dragConstraints={containerRef}
                    onDragStart={() => {
                        setDragging(true);
                    }}
                    onDragEnd={() => {
                        setDragging(false);
                    }}
                    onDrag={(event, info) => {
                        width.set(
                            info.point.x -
                                containerRef.current.getBoundingClientRect()
                                    .left
                        );
                    }}
                    style={{
                        x,
                    }}
                >
                    <motion.div
                        className={clsx("inner", dragging && "dragging")}
                    ></motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}

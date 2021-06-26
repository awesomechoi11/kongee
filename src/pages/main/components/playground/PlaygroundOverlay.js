import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { useFirstRender } from "../../../../utility/useFirstRender";
import GravityButton from "../../../../components/GravityButton";
import { playground_overlay_atom } from "./atoms";
import ReactHtmlParser from "react-html-parser";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase, { firestore } from "../../../../fire/index";
import { mousePartialState_atom } from "../../../../recoil/atoms";
import { heartEmitter } from "../../../../components/party";

const overlayVariants = {
    preActive: {
        pointerEvents: "all",
    },
    active: {
        background: "rgba(0, 0, 0, 0.3)",
        // opacity: 1,
    },
    preInactive: {
        pointerEvents: "none",
    },
    inactive: {
        background: "rgba(0, 0, 0, 0)",
        // opacity: 0,
        transition: {
            duration: 1,
        },
    },
};

const rightVariants = {
    hide: {
        // x: "-100%",
        opacity: 0,
    },
    reveal: {
        // x: "0%",
        opacity: 1,
    },
};

const wrapperVariants = {
    hide: {
        width: "76rem",
    },
    reveal: {
        width: "118rem",
    },
};

export default function PlaygroundOverlay() {
    const resetPlaygroundAtom = useResetRecoilState(playground_overlay_atom);
    const [playgroundOverlayData, setPlaygroundOverlay] = useRecoilState(
        playground_overlay_atom
    );
    const overlayController = useAnimation();
    const mainController = useAnimation();
    const firstRender = useFirstRender();

    useEffect(() => {
        if (firstRender) return;
        if (playgroundOverlayData.id !== "none") {
            overlayController.set("preActive");
            overlayController.start("active").then(() => {
                console.log("reveals!!");
                mainController.start("reveal");
            });
        }
    }, [playgroundOverlayData]);

    if (playgroundOverlayData.id === "none") return <div></div>;

    function getPrev() {
        const currentPosition = playgroundOverlayData.position;
        const solid = playgroundOverlayData.solid;
        const position = (currentPosition + solid.length - 1) % solid.length;
        const dataArr = solid[position];
        return {
            ...dataArr,
            solid: playgroundOverlayData.solid,
            position,
        };
    }
    function getNext() {
        const currentPosition = playgroundOverlayData.position;
        const solid = playgroundOverlayData.solid;
        const position = (currentPosition + 1) % solid.length;
        const dataArr = solid[position];
        return {
            ...dataArr,
            solid,
            position,
        };
    }

    return (
        <motion.div
            id="playground-overlay"
            initial={false}
            animate={overlayController}
            variants={overlayVariants}
            onClick={() => {
                overlayController.start("inactive");
                mainController.start("hide").then(() => {
                    overlayController.set("preInactive");
                    resetPlaygroundAtom();
                });
            }}
        >
            <motion.div
                className="overlay-item-wrapper"
                onClick={(e) => {
                    e.stopPropagation();
                }}
                initial="hide"
                animate={mainController}
                variants={wrapperVariants}
                transition={{
                    ease: [0.44, 0.77, 0.09, 1],
                    duration: 0.5,
                    delay: 0,
                }}
            >
                <div className="left">
                    {playgroundOverlayData.id !== "none" && (
                        <motion.div
                            layoutId={playgroundOverlayData.id}
                            key={playgroundOverlayData.id}
                            className="img-wrapper"
                            initial={{
                                background: "rgba(255, 255, 255, 0)",
                            }}
                            animate={{
                                background: "rgba(255, 255, 255, 1)",
                            }}
                        >
                            <PlaygroundCarousel
                                media={playgroundOverlayData.media}
                                initial={"hide"}
                                uid={playgroundOverlayData.id}
                                variants={rightVariants}
                                animate={mainController}
                            />
                        </motion.div>
                    )}
                </div>
                <motion.div
                    className="right"
                    variants={rightVariants}
                    initial="hide"
                    animate={mainController}
                >
                    <div className="inner">
                        <div className="title">
                            {ReactHtmlParser(playgroundOverlayData.title)}
                        </div>
                        <div className="tags">
                            {ReactHtmlParser(playgroundOverlayData.tags)}
                        </div>
                        <div className="tools">
                            {ReactHtmlParser(playgroundOverlayData.tools)}
                        </div>
                        <div className="description">
                            {ReactHtmlParser(playgroundOverlayData.description)}
                        </div>
                        <PlaygroundLikes
                            key={playgroundOverlayData.id}
                            id={playgroundOverlayData.id}
                            initial={"hide"}
                            variants={rightVariants}
                            animate={mainController}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="outer-carousel-controls"
                    initial={"hide"}
                    variants={rightVariants}
                    animate={mainController}
                >
                    <GravityButton
                        enterPadding={[0, 0]}
                        leavePadding={[0, 0]}
                        itemDim={[78, 192]}
                        className="left"
                        onClick={() => {
                            // overlayController.start("inactive");
                            mainController.start("hide").then(() => {
                                setPlaygroundOverlay(getPrev());
                            });
                        }}
                    >
                        {left_svg}
                    </GravityButton>
                    <GravityButton
                        enterPadding={[0, 0]}
                        leavePadding={[0, 0]}
                        itemDim={[78, 192]}
                        className="right"
                        onClick={() => {
                            // overlayController.start("inactive");
                            mainController.start("hide").then(() => {
                                setPlaygroundOverlay(getNext());
                            });
                        }}
                    >
                        {right_svg}
                    </GravityButton>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function PlaygroundLikes({ id, ...props }) {
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const [liked, setLiked] = useState(false);
    const elemRef = useRef(null);
    const docRef = useMemo(() => {
        return firestore.doc(`/kongee/${id}`);
    }, []);
    const [value, loading, error] = useDocument(docRef);
    if (value) console.log(value.get("likes"), `/kongee/${id}`);

    useEffect(() => {
        if (!loading && value && !value.exists) {
            docRef.set({
                likes: 0,
            });
        }
    }, [loading, value]);

    function handleClick(e) {
        const increment = firebase.firestore.FieldValue.increment(1);
        docRef.update({
            likes: increment,
        });
        setLiked(true);
        if (elemRef && elemRef.current) heartEmitter(elemRef.current);
    }

    return (
        <AnimatePresence>
            {!loading && value && value.exists && (
                <motion.div
                    ref={elemRef}
                    className="post-likes"
                    onClick={handleClick}
                    {...props}
                    onMouseEnter={() => {
                        setMouse({
                            animState: "zero",
                        });
                    }}
                    onMouseLeave={() => {
                        setMouse({
                            animState: "default",
                        });
                    }}
                >
                    <div className="heart">
                        {liked ? heart_svg : whiteHeart_svg}
                    </div>
                    <div className="count">{value.get("likes")}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function PlaygroundCarousel({ media, uid, ...props }) {
    const [pageNumber, setPageNumber] = useState(0);
    const isFirstRender = useFirstRender();
    const pageLength = media.length || 1;

    return (
        <div className="media-wrapper">
            {pageLength > 1 && (
                <motion.div className="carousel-controls" {...props}>
                    <GravityButton
                        enterPadding={[0, 0]}
                        leavePadding={[0, 0]}
                        itemDim={[78, 192]}
                        className="left"
                        onClick={() => {
                            setPageNumber(
                                (pageNumber + pageLength - 1) % pageLength
                            );
                        }}
                    >
                        {left_svg}
                    </GravityButton>
                    <GravityButton
                        enterPadding={[0, 0]}
                        leavePadding={[0, 0]}
                        itemDim={[78, 192]}
                        className="right"
                        onClick={() => {
                            setPageNumber((pageNumber + 1) % pageLength);
                        }}
                    >
                        {right_svg}
                    </GravityButton>
                </motion.div>
            )}
            <AnimatePresence>
                <motion.img
                    src={media[pageNumber].url}
                    key={String(uid) + media[pageNumber].id}
                    initial={{
                        opacity: isFirstRender ? 1 : 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                />
            </AnimatePresence>
        </div>
    );
}

const whiteHeart_svg = (
    <svg
        width="30"
        height="28"
        viewBox="0 0 30 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14.5525 5.53595L15 6.43326L15.4475 5.53595C16.7361 2.95177 18.5135 1.48658 20.3406 0.863541C22.1729 0.238765 24.097 0.445825 25.7088 1.28167C27.3205 2.11752 28.6137 3.57906 29.1837 5.45797C29.7521 7.33184 29.6122 9.6595 28.287 12.2448C27.0654 14.624 24.8002 17.4639 22.342 20.17C19.8921 22.8672 17.2797 25.3999 15.3894 27.1631C15.2844 27.2584 15.1495 27.3102 15.0107 27.3102C14.8718 27.3102 14.7367 27.2583 14.6316 27.1627C12.7311 25.4 10.1132 22.8671 7.66045 20.1698C5.19964 17.4637 2.93444 14.6237 1.71289 12.2445C0.38774 9.65933 0.247923 7.33177 0.816344 5.45797C1.38632 3.57906 2.67945 2.11752 4.29124 1.28166C5.90302 0.445824 7.82713 0.238764 9.65937 0.86354C11.4865 1.48658 13.2639 2.95177 14.5525 5.53595Z"
            stroke="black"
        />
    </svg>
);

const heart_svg = (
    <svg
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M28.7319 13.0864C26.2255 17.9682 19.5202 24.6076 15.7284 28.1442C15.5316 28.3241 15.2759 28.4238 15.0107 28.4238C14.7456 28.4238 14.4899 28.3241 14.2931 28.1442C10.4798 24.6076 3.77454 17.9682 1.26809 13.0864C-4.23753 2.34633 9.64434 -4.81371 15 5.92635C20.3557 -4.81371 34.2375 2.34633 28.7319 13.0864Z"
            fill="#EC5555"
        />
    </svg>
);

const right_svg = (
    <svg
        width="24"
        height="79"
        viewBox="0 0 24 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.5 77.6273L21 39.4632L2.50001 1.29906"
            stroke="white"
            stroke-width="5"
        />
    </svg>
);
const left_svg = (
    <svg
        width="24"
        height="79"
        viewBox="0 0 24 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M21.5 1.29908L2.99999 39.4632L21.5 77.6273"
            stroke="white"
            stroke-width="5"
        />
    </svg>
);

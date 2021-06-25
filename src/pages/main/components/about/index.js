import { useLayoutEffect, useRef } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import ReactiveShape from "../../../../components/ReactiveShape";
import {
    forceRefresh_global_mouse_position_selector,
    mousePartialState_atom,
} from "../../../../recoil/atoms";
import useLoadTracker from "../../../../utility/useLoadTracker";

import "./styles.scss";

import {
    linkedin_thin_svg,
    insta_thin_svg,
    mail_think_svg,
    file_thin_svg,
} from "../../../../assets/socialMediaIcons";
import GravityButton from "../../../../components/GravityButton";
import UniversalFooter from "../UniversalFooter";

const vsig = "https://cdn.brandon-choi.info/kongee/assets/vsig.png";
const sally_pic =
    "https://cdn.brandon-choi.info/kongee/assets/aboutme_sally.png";
const book_pic = "https://cdn.brandon-choi.info/kongee/assets/book.png";

function About() {
    useLoadTracker({
        sally_pic,
        book_pic,
    });

    const setMouse = useSetRecoilState(mousePartialState_atom);

    const sizeEvents = (animState) => ({
        onMouseEnter: () => setMouse(animState),
        onMouseLeave: () =>
            setMouse({
                animState: "default",
            }),
    });
    const setMousePosition = useResetRecoilState(
        forceRefresh_global_mouse_position_selector
    );
    return (
        <div
            className="scrollhere"
            id="about-wrapper"
            onScroll={() => {
                setMousePosition();
            }}
        >
            <div id="about">
                <ReactiveShape
                    lerpValue={0.01}
                    scrollableParentSelector={"#about-wrapper"}
                    className="square2"
                />
                <ReactiveShape
                    lerpValue={0.007}
                    scrollableParentSelector={"#about-wrapper"}
                    className="square"
                >
                    <img alt="profile_picture" src={sally_pic} />
                </ReactiveShape>
                <ReactiveShape
                    lerpValue={0.005}
                    scrollableParentSelector={"#about-wrapper"}
                    className="about-me"
                >
                    about me.
                </ReactiveShape>

                <div className="group-1">
                    <div className="header">
                        <div className="phrase">hi there,</div>
                        <div className="icons">
                            <GravityButton
                                className="social_wrapper"
                                enterPadding={[30, 30]}
                                leavePadding={[110, 110]}
                                itemDim={[41, 41]}
                                preventLocalCounter
                                onClick={() => {
                                    setMouse({
                                        animState: "big",
                                    });
                                    setTimeout(() => {
                                        window.open(
                                            "https://www.linkedin.com/in/shjkim/",
                                            "_blank"
                                        );
                                    }, 220);
                                }}
                                {...sizeEvents({
                                    animState: "aboutSocial_LinkedIn",
                                })}
                            >
                                {linkedin_thin_svg}
                            </GravityButton>

                            <GravityButton
                                className="social_wrapper"
                                enterPadding={[30, 30]}
                                leavePadding={[110, 110]}
                                itemDim={[41, 41]}
                                preventLocalCounter
                                onClick={() => {
                                    setMouse({
                                        animState: "big",
                                    });
                                    setTimeout(() => {
                                        // console.log(123);
                                        window.open(
                                            "https://www.instagram.com/kongee_illust/",
                                            "_blank"
                                        );
                                    }, 220);
                                }}
                                {...sizeEvents({
                                    animState: "aboutSocial_Instagram",
                                })}
                            >
                                {insta_thin_svg}
                            </GravityButton>

                            <GravityButton
                                className="social_wrapper"
                                enterPadding={[30, 30]}
                                leavePadding={[110, 110]}
                                itemDim={[41, 41]}
                                preventLocalCounter
                                onClick={() => {
                                    setMouse({
                                        animState: "big",
                                    });
                                    setTimeout(() => {
                                        window.location.href =
                                            "mailto:hello@kongee.info";
                                    }, 220);
                                }}
                                {...sizeEvents({
                                    animState: "aboutSocial_mail",
                                })}
                            >
                                {mail_think_svg}
                            </GravityButton>

                            <GravityButton
                                className="social_wrapper"
                                enterPadding={[30, 30]}
                                leavePadding={[110, 110]}
                                itemDim={[41, 41]}
                                preventLocalCounter
                                onClick={() => {
                                    setMouse({
                                        animState: "big",
                                    });
                                    setTimeout(() => {
                                        window.open(
                                            "https://drive.google.com/file/d/1lBze_fJYSSC9Tt10XBATOCQvFrS1Ec99/view?usp=sharing",
                                            "_blank"
                                        );
                                    }, 220);
                                }}
                                {...sizeEvents({
                                    animState: "aboutSocial_resume",
                                })}
                            >
                                {file_thin_svg}
                            </GravityButton>
                        </div>
                    </div>
                    <div className="divider" />
                    <div className="item">
                        <div className="title">BACKGROUND</div>
                        <div className="body">
                            I’m Sally, a UX/UI & product designer and
                            multidisciplinary artist based in Cupertino, CA.
                            Originally from Ilsan, Korea, I also work under an
                            illustrator name, “kongee.”
                            <br />
                            <br />
                            I’m passionate in making a change in the world by
                            using the boundless potential of technology and
                            design. In the past, I’ve won{" "}
                            <b>
                                <u>
                                    <a
                                        href="https://devpost.com/kongee"
                                        target="_blank"
                                    >
                                        multiple hackathons
                                    </a>
                                </u>
                            </b>{" "}
                            by creating websites with a theme of inclusion,
                            environmental science, and more.
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="item">
                        <div className="title">EDUCATION</div>
                        <div className="body">
                            I’m currently a third-year Design major at{" "}
                            <u>
                                <a
                                    href="https://www.ucdavis.edu/majors/design"
                                    target="_blank"
                                >
                                    <b>University of California, Davis</b>
                                </a>
                            </u>
                            . After undergrad, I plan on working as a full-time
                            designer to further my exploration in UX/UI.
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="item">
                        <div className="title">SKILLSET</div>
                        <div className="body list">
                            <div className="left">
                                User interface (UI) design
                                <br />
                                User experience (UX) research
                                <br />
                                Human-centered design
                                <br />
                                CAD prototyping
                                <br />
                                Wireframing & user testing
                            </div>
                            <div className="right">
                                Visual storytelling
                                <br />
                                Graphic design
                                <br />
                                Letterforms & typography <br />
                                Illustrations
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="item">
                        <div className="title">FUN FACTS</div>
                        <div className="body">
                            Before becoming a designer, I was an aspiring doctor
                            with specialization in cell, molecular, &
                            developmental biology.
                            <br />
                            <br />I play video games like League of Legends, or
                            bake for my family in my free time. I also watch
                            lots of{" "}
                            <b>
                                <u>
                                    <a
                                        href="https://www.youtube.com/watch?v=-xCQkiIM63Q"
                                        target="_blank"
                                    >
                                        dog videos
                                    </a>
                                </u>
                            </b>
                            .
                        </div>
                    </div>
                </div>

                <div className="group-2">
                    <div className="date">09. 29. 2000</div>
                    <div className="age">
                        23 in Korea, and 20 in the US. I prefer my age in
                        America, by the way.
                    </div>
                </div>
                <div className="group-3">
                    <div className="left">
                        <img alt="favorite book" src={book_pic} />
                    </div>
                    <div className="right">
                        <div className="top">currently reading</div>
                        <div className="middle">
                            <u>
                                <a
                                    href="https://www.amazon.com/temperature-Language-%EC%96%B8%EC%96%B4%EC%9D%98-%EC%98%A8%EB%8F%84/dp/B06XKQN1JJ"
                                    target="_blank"
                                >
                                    the temperature of language
                                </a>
                            </u>
                        </div>
                        <div className="bottom">by Lee Ki Joo</div>
                    </div>
                </div>
                <div className="group-4">
                    <div className="top">special thanks</div>
                    <div className="bottom">
                        my family & their unconditional support for my dreams{" "}
                        <br />
                        my boyfriend, aka my best friend, who{" "}
                        <b>
                            <u>
                                <a
                                    href="https://brandon-choi.info"
                                    target="_blank"
                                >
                                    programmed this website
                                </a>
                            </u>
                        </b>{" "}
                        and supported my coffee addiction <br />
                        my friends & colleagues, who always stayed beside me to
                        cheer me on
                    </div>
                </div>

                <div className="big-line" />
                <div className="small-line" />
                <ReactiveShape
                    lerpValue={0.007}
                    scrollableParentSelector={"#about-wrapper"}
                    className="circle1"
                />
                <ReactiveShape
                    lerpValue={0.02}
                    scrollableParentSelector={"#about-wrapper"}
                    className="circle2"
                />
                <ReactiveShape
                    lerpValue={-0.01}
                    scrollableParentSelector={"#about-wrapper"}
                    className="circle3"
                />
                <div className="vsig">
                    <img alt="" src={vsig} alt="vertical signature" />
                </div>
            </div>

            <UniversalFooter scrollableParentSelector={"#about-wrapper"} />
        </div>
    );
}

export default About;

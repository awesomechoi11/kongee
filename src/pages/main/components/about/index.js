import { useLayoutEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import ReactiveShape from "../../../../components/ReactiveShape";
import { loading_atom, mousePartialState_atom } from "../../../../recoil/atoms";
import useLoadTracker from "../../../../utility/useLoadTracker";

import "./styles.scss";

import sally_pic from "../../../../assets/aboutme_sally.png";
import book_pic from "../../../../assets/book.png";
import {
    linkedin_thin_svg,
    insta_thin_svg,
    mail_think_svg,
    file_thin_svg,
} from "../../../../assets/socialMediaIcons";
import GravityButton from "../../../../components/GravityButton";

function About() {
    const [loadTracker, loading, progress] = useLoadTracker({
        sally_pic,
        book_pic,
    });
    const scrollRef = useRef();

    const setMouse = useSetRecoilState(mousePartialState_atom);

    const sizeEvents = (animState) => ({
        onMouseEnter: () => setMouse(animState),
        onMouseLeave: () =>
            setMouse({
                animState: "default",
            }),
        onClick: () =>
            setMouse({
                animState: "big",
            }),
    });

    return (
        <div className="scrollhere" ref={scrollRef}>
            <div id="about">
                <ReactiveShape
                    lerpValue={0.01}
                    scrollRef={scrollRef}
                    className="square2"
                />
                <ReactiveShape
                    lerpValue={0.007}
                    scrollRef={scrollRef}
                    className="square"
                >
                    <img alt="profile_picture" {...loadTracker.sally_pic} />
                </ReactiveShape>
                <ReactiveShape
                    lerpValue={0.005}
                    scrollRef={scrollRef}
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
                                enterRadius={70}
                                leaveRadius={150}
                                itemDim={[41, 41]}
                                {...sizeEvents({
                                    animState: "icon",
                                })}
                            >
                                {linkedin_thin_svg}
                            </GravityButton>

                            <GravityButton
                                className="social_wrapper"
                                enterRadius={70}
                                leaveRadius={150}
                                itemDim={[41, 41]}
                                {...sizeEvents({
                                    animState: "icon",
                                })}
                            >
                                {insta_thin_svg}
                            </GravityButton>

                            <GravityButton
                                className="social_wrapper"
                                enterRadius={70}
                                leaveRadius={150}
                                itemDim={[41, 41]}
                                {...sizeEvents({
                                    animState: "icon",
                                })}
                            >
                                {mail_think_svg}
                            </GravityButton>

                            <GravityButton
                                className="social_wrapper"
                                enterRadius={70}
                                leaveRadius={150}
                                itemDim={[41, 41]}
                                {...sizeEvents({
                                    animState: "icon",
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
                                <u>multiple hackathons</u>
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
                            I’m currently a third-year Design major at
                            University of California, Davis. After undergrad, I
                            plan on working as a full-time designer to further
                            my exploration in UX/UI.
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
                                <u>dog videos</u>
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
                        <img alt="favorite book" {...loadTracker.book_pic} />
                    </div>
                    <div className="right">
                        <div className="top">currently reading</div>
                        <div className="middle">
                            the temperature of language
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
                            <u>programmed this website</u>
                        </b>{" "}
                        and supported my coffee addiction <br />
                        my friends & colleagues, who always stayed beside me to
                        cheer me on
                    </div>
                </div>

                <div className="group-5">
                    <div className="big-line" />
                    <div className="small-line" />
                    <div className="circle1" />
                    <div className="circle2" />
                    <div className="circle3" />
                </div>
            </div>
        </div>
    );
}

export default About;

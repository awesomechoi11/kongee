import { motion } from "framer-motion";

import { Parallax } from "react-scroll-parallax";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

import "./styles.scss";
import {
    approach_circle_svg,
    approach_line_1_svg,
    approach_line_2_svg,
    approach_ring_svg,
    objective_graphic1_svg,
    overview_graphic_svg,
    rnd_arrow_svg,
    rnd_graphic2_svg,
    rnd_graphic_svg,
    rnd_info1_svg,
    rnd_arrow2_svg,
    rnd_arrow3_svg,
    rnd_arrow4_svg,
    rnd_bracket_svg,
} from "./assets";
import ReactiveShape from "../../../../../../components/ReactiveShape";
import FramerCarousel from "../../../../../../components/FramerCarousel";
import CaseItem from "../components/CaseItems";
import CaseSection from "../components/CaseSection";
import ExpandableImage from "../../../../../../components/ExpandableImage";
import _ from "lodash";
import { confettiEmitter } from "../../../../../../components/party";

const auxilium_mockup =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/auxilium_mockup_400.jpg";
const rndfig1 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/rndfig1.png";
const rndfig2 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/rndfig2.png";
const rndfig3 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/rndfig3.png";
const results2 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/results2_graphic.png";

const screenshot1 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/1.png";
const screenshot2 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/2.png";
const screenshot3 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/3.png";
const screenshot4 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/4.png";
const screenshot5 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/5.png";
const screenshot6 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/6.png";
const screenshot7 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/7.png";
const screenshot8 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/8.png";
const screenshot9 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/9.png";
const screenshot10 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/screenshots/10.png";

const presentation1 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium1.png";
const presentation2 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium2.png";
const presentation3 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium3.png";
const presentation4 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium4.png";
const presentation5 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium5.png";
const presentation6 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium6.png";
const presentation7 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium7.png";
const presentation8 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium8.png";
const presentation9 =
    "https://cdn.brandon-choi.info/kongee/assets/auxilium/presentation/PRESENTATION- SacHacks _ auxilium9.png";

export default function AuxiliumCase() {
    return (
        <>
            <AuxiliumOverview />
            <AuxiliumProblem />
            <AuxiliumObjective />
            <AuxiliumApproach />
            <AuxiliumRnD />
            <AuxiliumResults />
        </>
    );
}

const slideData = [
    {
        key: "slide1",
        SlideComponent: (props) => (
            <motion.img
                src={presentation1}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 1</b>: auxilium - header image
            </>
        ),
    },
    {
        key: "slide2",
        SlideComponent: (props) => (
            <motion.img
                src={presentation2}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 2</b>: about the team
            </>
        ),
    },
    {
        key: "slide3",
        SlideComponent: (props) => (
            <motion.img
                src={presentation3}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 3</b>: our thought process
            </>
        ),
    },
    {
        key: "slide4",
        SlideComponent: (props) => (
            <motion.img
                src={presentation4}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 4</b>: brand introduction
            </>
        ),
    },
    {
        key: "slide5",
        SlideComponent: (props) => (
            <motion.img
                src={presentation5}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 5</b>: lo/mid-fidelity prototype
            </>
        ),
    },
    {
        key: "slide6",
        SlideComponent: (props) => (
            <motion.img
                src={presentation6}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 6</b>: hi-fidelity prototype
            </>
        ),
    },
    {
        key: "slide7",
        SlideComponent: (props) => (
            <motion.img
                src={presentation7}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 7</b>: design system & typography
            </>
        ),
    },
    {
        key: "slide8",
        SlideComponent: (props) => (
            <motion.img
                src={presentation8}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 8</b>: logo design & brand name
            </>
        ),
    },
    {
        key: "slide9",
        SlideComponent: (props) => (
            <motion.img
                src={presentation9}
                alt={"slide component"}
                {...props}
            />
        ),
        description: (
            <>
                <b>figure 9</b>: full-stack programming brief
            </>
        ),
    },
];

const emitConfetti = _.throttle(
    (e) => {
        confettiEmitter(e.nativeEvent);
    },
    500,
    {
        leading: true,
        trailing: true,
    }
);
const emitConfettiClick = _.throttle(
    (e) => {
        confettiEmitter(e.nativeEvent);
    },
    100,
    {
        leading: true,
        trailing: true,
    }
);
function AuxiliumResults() {
    function Item({ src, title }) {
        return (
            <div className="item">
                <ScrollAnimation
                    animateIn="fadeIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    animateOnce
                >
                    <ExpandableImage
                        className="img-wrapper"
                        imgProps={{
                            src,
                        }}
                    />
                    <div className="title">{title}</div>
                </ScrollAnimation>
            </div>
        );
    }

    return (
        <CaseSection id="results">
            <div className="label">
                <CaseItem className="header">results</CaseItem>
                <CaseItem className="title">introducing auxilium.</CaseItem>
                <CaseItem className="body">
                    Auxilium is a stand-alone website that shows
                    <b> free resources and services </b>
                    from non-profits organizations for
                    <b> COVID-related assistance. </b>
                    <br />
                    <br />
                    As a<b> participant </b>, you can pick up free resources
                    from physical locations within your county or attend online
                    events hosted by any non-profit organizations. As an
                    <b> event host </b>, you can post events held safely
                    in-person or online that supports their local community on
                    behalf of their organization.
                </CaseItem>
            </div>
            <div className="results-mockup">
                <Parallax y={[-40, 20]}>
                    <img alt="" src={auxilium_mockup} alt="auxilium mockup" />
                </Parallax>
            </div>
            <div className="results-screenshots">
                <div className="title">WEBSITE SCREENSHOTS</div>
                <div className="screenshots">
                    <div className="column">
                        <Item src={screenshot1} title="LANDING PAGE" />
                        <Item src={screenshot2} title="ABOUT THE CREATORS" />
                        <Item src={screenshot3} title="ORGANIZATION SIGN-UP" />
                        <Item src={screenshot4} title="ORGANIZATION SIGN-UP" />
                    </div>
                    <div className="column">
                        <Item src={screenshot5} title="SEARCH PAGE" />
                        <Item
                            src={screenshot6}
                            title="FILTERED SEARCH RESULT PAGE"
                        />
                        <Item
                            src={screenshot7}
                            title="EVENT RESULT W/ GOOGLE API"
                        />
                    </div>
                    <div className="column">
                        <Item src={screenshot8} title="NEW EVENT PAGE" />
                        <Item src={screenshot9} title="CONFIRM EVENT PAGE" />
                        <Item src={screenshot10} title="IND. EVENT PAGE" />
                    </div>
                </div>
            </div>
            <div className="results-visuals">
                <div className="title">PRESENTATION VISUALS</div>
                <FramerCarousel slides={slideData} />
            </div>
            <div
                className="results2"
                onMouseMove={emitConfetti}
                onClick={emitConfettiClick}
            >
                <div className="header">RESULTS</div>
                <div className="title">our takeaways</div>
                <div className="content">
                    <div className="left">
                        <img alt="" src={results2} alt="results" />
                    </div>
                    <div className="right">
                        After the website was submitted to the judges, our team
                        received the happy news that auxilium won
                        <b> Best Sacramento Hack & Top 2 Overall! 🎉</b>
                        <br />
                        <br />
                        Having it be my second time participating in a 36-hour
                        hackathon, I encountered lots of difficulties; however,
                        collaborating with my team made the process enjoyable.
                        Here are some key things we learned from this project:
                        <ul>
                            <li>
                                Thinking in the perspective of potential
                                different users—broadening our perspective to
                                <b> cater to all demographics</b>
                            </li>
                            <li>
                                Ensuring a welcoming design through
                                cross-testing of different colors to ensure that
                                <b>
                                    {" "}
                                    visually impaired people can access the
                                    website and its content
                                </b>
                            </li>
                            <li>
                                Giving each other
                                <b> objective, constructive feedback</b>
                            </li>
                            <li>
                                <b>
                                    Communication between designers & the
                                    programmer{" "}
                                </b>
                                to maximize efficiency in a limited timeframe
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </CaseSection>
    );
}

function AuxiliumRnD() {
    return (
        <CaseSection id="rnd">
            <div className="label">
                <CaseItem className="header">RESEARCH & DEVELOPMENT</CaseItem>
                <CaseItem className="title">user research & personae.</CaseItem>
                <CaseItem className="body">
                    After discussing various ideas for the theme, we decided to
                    create a website to bring light to the abundance of support
                    offered for COVID-19 relief. Some themes explored during our
                    design process include <b>inclusivity</b>, <b>empathy</b>,
                    and <b>accessibility</b>.
                    <br />
                    <br />
                    We generated two <b>user personas</b> to visualize the
                    potential pain points that may occur:
                </CaseItem>
            </div>

            <div className="rnd-heart">
                <ScrollAnimation
                    animateIn="fadeIn zoomIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    animateOnce
                >
                    <div className="bob">{rnd_graphic2_svg}</div>
                </ScrollAnimation>
            </div>
            <div className="rnd-graphic">{rnd_graphic_svg}</div>
            <div className="rnd-bubble1">{rnd_info1_svg}</div>
            <div className="rnd-bubble1 text">
                The pandemic left my family and others in our town without jobs
                or a guarantee of food on the table. I’ve heard of events of
                charities donating food, but I’ve
                <b> never been able to find the address </b>or
                <b> how long the events last for.</b>
            </div>
            <div className="rnd-bubble2">{rnd_info1_svg}</div>
            <div className="rnd-bubble2 text">
                Oftentimes, our team would organize events with hundreds of care
                packages and masks to give out. But our events usually
                <b> end up not reaching a big group of people</b>, because it’s
                hard to outreach different communities with just the word of
                mouth.
            </div>
            <div className="rnd-sarah">
                <b>NAME:</b> Sarah H. <br />
                <br />
                <b>AGE:</b> 29, pursuing a Ph. D. in Environmental Science
                <br />
                <br />
                <b>OCCUPATION:</b> Founder of AllGiving, a COVID-relief
                non-profit organization
            </div>
            <div className="rnd-francesca">
                <b>NAME:</b> Francesca K. <br />
                <br />
                <b>AGE:</b> 19
                <br />
                <br />
                <b>OCCUPATION:</b> None; dropped out of college to look after
                her younger siblings and earn money for family
            </div>
            <div className="rnd-arrow1">{rnd_arrow_svg}</div>
            <div className="rnd-arrow2">{rnd_arrow_svg}</div>

            <div className="rnd2">
                <div className="header">research & development</div>
                <ScrollAnimation
                    animateIn="fadeIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    animateOnce
                >
                    <div className="title">let’s get prototyping.</div>
                </ScrollAnimation>{" "}
                <ScrollAnimation
                    animateIn="fadeIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    animateOnce
                >
                    <div className="body">
                        Based on the information we gathered, we designed low-
                        and mid-fidelity prototypes. Then, after a round of
                        informal critique among the group members, we
                        transitioned into the hi-fidelity design.
                        <br />
                        <br />
                        During our prototyping process, I, as the designer,
                        focused on creating a design that is accessible to all,
                        aesthetically pleasing to navigate, and—most
                        importantly—compatible with the programmer’s
                        implementation of
                        <b> Google Maps API </b>
                        and
                        <b> geolocation tracking. </b>
                    </div>
                </ScrollAnimation>
                <div className="rnd2-fig1">
                    <ExpandableImage
                        imgProps={{
                            src: rndfig1,
                        }}
                    />
                    <div className="text">
                        <b>figure 1</b>: the mid-fidelity prototype for auxilium
                    </div>
                </div>
                <div className="rnd2-fig2">
                    <div className="text">LOW-FIDELITY WIREFRAME</div>
                    <ExpandableImage
                        imgProps={{
                            src: rndfig2,
                        }}
                    />
                </div>
                <div className="rnd2-fig3">
                    <div className="text">HIGH-FIDELITY WIREFRAME</div>
                    <ExpandableImage
                        imgProps={{
                            src: rndfig3,
                        }}
                    />
                </div>
                <div className="figure">
                    <b>figure 2</b>:<i> {"\u00A0"}from mid-fi to hi-fi</i>—
                    search results page
                </div>
                <div className="rnd2-arrow2">{rnd_arrow2_svg}</div>
                <div className="floating-text1">
                    implemented “hashtags” so that users looking for specific
                    events / giveaways can
                    <b> refine their search according to their needs</b>
                </div>
                <div className="rnd2-arrow3">{rnd_arrow3_svg}</div>
                <div className="floating-text2">
                    designed event cards - users can
                    <b> locate & distinguish events easily</b>
                </div>
                <div className="rnd2-arrow4">{rnd_arrow4_svg}</div>
                <div className="floating-text3">
                    <b>drop-down menu </b>
                    allows easy navigation for refining search; users can easily
                    switch from searching for online events to other types of
                    events
                </div>
                <div className="rnd2-bracket">{rnd_bracket_svg}</div>
                <div className="floating-text4">
                    incorporation of warm-toned color palette consisting of
                    yellows to convey a
                    <b> friendly, all-welcoming semiotic effect</b>
                </div>
            </div>
        </CaseSection>
    );
}

function AuxiliumApproach(props) {
    return (
        <CaseSection id="approach">
            <div className="label">
                <CaseItem className="header">approach</CaseItem>
                <CaseItem className="title">human-centered design.</CaseItem>
                <CaseItem className="body">
                    Each part of this project was executed with{" "}
                    <b>careful consideration to our potential users.</b> With
                    auxilium, our brand name, meaning{" "}
                    <b>
                        <i>support</i>
                    </b>{" "}
                    in Latin, we designed the website with a human-centered
                    mindset — whether that be by thinking from the users’
                    perspective, or talking to people that have been affected by
                    COVID-19.
                </CaseItem>
            </div>
            <Parallax y={[100, -100]} className="approach-circle">
                <ScrollAnimation
                    animateIn="bounceIn zoomIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    delay={150}
                    animateOnce
                >
                    <ReactiveShape
                        lerpValue={0.09}
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    >
                        {approach_circle_svg}
                    </ReactiveShape>
                </ScrollAnimation>
            </Parallax>
            <Parallax y={[-20, 20]} className="approach-ring">
                <ScrollAnimation
                    animateIn="bounceIn zoomIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    delay={150}
                    animateOnce
                >
                    <ReactiveShape
                        lerpValue={0.005}
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    >
                        {approach_ring_svg}
                    </ReactiveShape>
                </ScrollAnimation>
            </Parallax>
            <Parallax y={[10, -10]} className="approach-line2">
                <ScrollAnimation
                    animateIn="bounceIn zoomIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    delay={150}
                    animateOnce
                >
                    <ReactiveShape
                        lerpValue={0.01}
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    >
                        {approach_line_2_svg}
                    </ReactiveShape>
                </ScrollAnimation>
            </Parallax>

            <Parallax y={[-90, 90]} className="approach-line1">
                <ScrollAnimation
                    animateIn="bounceIn zoomIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    delay={150}
                    animateOnce
                >
                    <ReactiveShape
                        lerpValue={0.02}
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    >
                        {approach_line_1_svg}
                    </ReactiveShape>
                </ScrollAnimation>
            </Parallax>
        </CaseSection>
    );
}

function AuxiliumObjective() {
    return (
        <CaseSection id="objective">
            <div className="label">
                <CaseItem className="header">objective</CaseItem>
                <CaseItem className="title">accessibility for all.</CaseItem>
                <CaseItem className="body">
                    We decided that a platform that
                    <b>
                        {" "}
                        selectively shows charitable events, giveaways, and
                        other covid-related assistance and help{" "}
                    </b>
                    is needed.
                </CaseItem>
            </div>
            <Parallax y={[-20, 20]} className="objective-bigball">
                <ScrollAnimation
                    animateIn="bounceIn zoomIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    animateOnce
                    delay={150}
                >
                    <ReactiveShape
                        lerpValue={0.005}
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                        className="circle"
                    />
                </ScrollAnimation>
            </Parallax>
            <Parallax y={[40, -40]} className="objective-smallball">
                <ScrollAnimation
                    animateIn="fadeIn zoomIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    animateOnce
                >
                    <ReactiveShape
                        lerpValue={0.018}
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                        className=" circle"
                    />
                </ScrollAnimation>
            </Parallax>
            <ReactiveShape
                lerpValue={0.01}
                scrollableParentSelector=".ScrollbarsCustom-Scroller"
                className="objective-graphic"
            >
                {objective_graphic1_svg}
            </ReactiveShape>
        </CaseSection>
    );
}

function AuxiliumProblem() {
    return (
        <CaseSection id="problem">
            <CaseItem className="header">problem</CaseItem>
            <CaseItem className="title">
                communities are struggling from the impacts of COVID-19.
            </CaseItem>

            <CaseItem className="body">
                Among others around the world, the community of people in
                Sacramento were drastically impacted by the pandemic. With the
                theme of hackathon in mind, we decided to center our project
                toward catering to the <b> people of Sacramento.</b>
                <br />
                <br />
                Though there is an abundance of resources and help available,
                people cannot find them easily, because there isn’t an{" "}
                <b>
                    effective way for organizations and non-profits to advertise
                    their events.
                </b>
                <br />
                <br />
                So, we wondered: <b>how might we </b>
                improve the user experience for finding COVID-related support?
            </CaseItem>
        </CaseSection>
    );
}

function AuxiliumOverview() {
    return (
        <CaseSection id="overview">
            <div className="label">
                <CaseItem className="header">overview</CaseItem>
                <CaseItem className="title">our inspiration</CaseItem>
                <CaseItem className="body">
                    Needless to say, <b>the COVID-19 pandemic</b> has made life
                    a lot harder for all of us (i.e. people losing jobs, people
                    can’t socialize in public, and people are dying). Nonprofits
                    are giving free stuff away and hosting online events in lieu
                    of COVID, but people aren’t aware of them.
                </CaseItem>
                <Parallax y={[-20, 20]} className="overview-bigball">
                    <ScrollAnimation
                        animateIn="bounceIn zoomIn"
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                        delay={150}
                        animateOnce
                    >
                        <ReactiveShape
                            lerpValue={0.005}
                            scrollableParentSelector=".ScrollbarsCustom-Scroller"
                            className="circle"
                        />
                    </ScrollAnimation>
                </Parallax>

                <Parallax y={[40, -40]} className="overview-smallball">
                    <ScrollAnimation
                        animateIn="fadeIn zoomIn"
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                        animateOnce
                    >
                        <ReactiveShape
                            lerpValue={0.018}
                            scrollableParentSelector=".ScrollbarsCustom-Scroller"
                            className=" circle"
                        />
                    </ScrollAnimation>
                </Parallax>
                <ScrollAnimation
                    animateIn="fadeIn"
                    scrollableParentSelector=".ScrollbarsCustom-Scroller"
                    animateOnce
                >
                    <ReactiveShape
                        lerpValue={0.01}
                        scrollableParentSelector=".ScrollbarsCustom-Scroller"
                        className="overview-graphic"
                    >
                        {overview_graphic_svg}
                    </ReactiveShape>
                </ScrollAnimation>
            </div>
        </CaseSection>
    );
}

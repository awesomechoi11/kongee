import { useEffect, useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { useSetRecoilState } from "recoil";
import FramerCarousel from "../../../../../../components/FramerCarousel";
import InteractiveElement from "../../../../../../components/InteractiveElement";
import { case_selector } from "../../../../../../recoil/case_atoms";
import lerp from "../../../../../../utility/lerp";
import CaseItem from "../components/CaseItems";
import BeforeAfterSlider from "../../../../../../components/BeforeAfterSlider";
import {
    hifi_arrow_svg,
    overview_person_sitting_svg,
    overview_person_standing_svg,
    research_bubble_1,
    research_bubble_2,
    research_bubble_3,
    rnd_initial_arrow_svg,
    rnd_initial_svg,
    takeaways_sitting_bubble_svg,
    takeaways_sitting_svg,
    takeaways_standing_bubble_svg,
    takeaways_standing_svg,
} from "./assets";
import "./styles.scss";
import { motion } from "framer-motion";
import clsx from "clsx";
import ExpandableImage from "../../../../../../components/ExpandableImage";

const persona1 =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/persona1.png";
const persona2 =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/persona2.png";
const ideation_png =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/ideation.png";
const hifi_guide =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/hifiguide.png";
const hifi_types =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/hifitypes.png";
const lofi_graphic =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/lo-figraphic.png";
const lofi_graphic2 =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/lofigraphic2.png";
const mockup =
    "https://cdn.brandon-choi.info/kongee/assets/when2meet/when2meet mockup.png";

const cdnPrefix = "https://cdn.brandon-choi.info/kongee/assets/when2meet";

export default function When2meetCase() {
    const setCaseState = useSetRecoilState(case_selector);
    function handleMouseEnter(id) {
        if (id) {
            setCaseState({
                currentMarker: id,
            });
        }
    }
    return (
        <>
            <Overview onMouseEnter={() => handleMouseEnter("overview")} />
            <RndInitial onMouseEnter={() => handleMouseEnter("rnd-initial")} />
            <RndUserResearch
                onMouseEnter={() => handleMouseEnter("rnd-user-research")}
            />
            <RndIdeation
                onMouseEnter={() => handleMouseEnter("rnd-ideation")}
            />
            <LoFiMidFi onMouseEnter={() => handleMouseEnter("lofi-midfi")} />
            <HiFi onMouseEnter={() => handleMouseEnter("hifi")} />
            <Takeaways onMouseEnter={() => handleMouseEnter("takeaways")} />
        </>
    );
}

function LoFiMidFi(props) {
    return (
        <div {...props} id="lofi-midfi">
            <div className="label">
                <CaseItem className="header">
                    RESEARCH & DEVELOPMENT > LO & MID-FI
                </CaseItem>
                <CaseItem className="title">wireframing.</CaseItem>
                <CaseItem className="body">
                    Based on each of our user flow charts, we sketched and
                    developed the prototypes. These prototypes were designed
                    with the
                    <b>
                        {" "}
                        purpose of making the user experience more intuitive{" "}
                    </b>
                    as people organize events. One thing we we focused on was an
                    appropriate
                    <b> information hierarchy </b>
                    through the usage of different font sizes and thicknesses.
                    <br />
                    <br />
                    Then, we voted on elements to keep as we move onto the
                    mid-fidelity prototype.
                </CaseItem>
            </div>
            <div className="figures">
                <div className="figure1">
                    <ExpandableImage
                        className="img-wrapper"
                        layoutId={"lofi-img1"}
                        imgProps={{
                            src: lofi_graphic,
                        }}
                    />
                    <div className="description">
                        <b>figure 1</b>: lo-fi sketches by sally, anthony, &
                        kathryn
                    </div>
                </div>
                <div className="caption">
                    After further discussion on how to display the information
                    in an intuitive manner, we developed the
                    <b> mid-fidelity screens</b>:
                </div>
                <div className="figure2">
                    <div className="img-wrapper">
                        <img src={lofi_graphic2} />
                    </div>
                    <div className="description">
                        <b>figure 2</b>: mid-fi sketches
                    </div>
                </div>
            </div>
        </div>
    );
}

function HiFi(props) {
    const overview_navbar_Slide3 = `${cdnPrefix}/overview/navbar.png`;

    const overview_after_Slide1 = `${cdnPrefix}/overview/after/slide1.png`;
    const overview_after_Slide2 = `${cdnPrefix}/overview/after/slide2.png`;
    const overview_after_Slide3 = `${cdnPrefix}/overview/after/slide3.png`;
    const overview_after_Slide4 = `${cdnPrefix}/overview/after/slide4.png`;
    const overview_after_Slide5 = `${cdnPrefix}/overview/after/slide5.png`;
    const overview_after_Slide6 = `${cdnPrefix}/overview/after/slide6.png`;
    const overview_after_Slide7 = `${cdnPrefix}/overview/after/slide7.png`;

    const slideData = [
        {
            key: "hifi1",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide1} />
                </motion.div>
            ),
            description: (
                <>
                    <span className="hifi-caption">
                        EVENT HOST & ATTENDEE: LANDING PAGE
                    </span>
                </>
            ),
        },
        {
            key: "hifi2",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide2} />
                </motion.div>
            ),
            description: (
                <>
                    <span className="hifi-caption">
                        EVENT HOST & ATTENDEE: “HOW IT WORKS” PAGE
                    </span>
                </>
            ),
        },
        {
            key: "hifi3",
            SlideComponent: ({ className, ...props }) => (
                <motion.div
                    {...props}
                    className={clsx(className, "mini-scroller")}
                >
                    <img
                        src={overview_navbar_Slide3}
                        className="slide-3-navbar"
                    />
                    <img src={overview_after_Slide3} className="content" />
                </motion.div>
            ),
            description: (
                <>
                    <span className="hifi-caption">
                        EVENT HOST: “CREATE A NEW EVENT” PAGE
                    </span>
                </>
            ),
        },
        {
            key: "hifi4",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide4} />
                </motion.div>
            ),
            description: (
                <>
                    <span className="hifi-caption">EVENT HOST: DASHBOARD</span>
                </>
            ),
        },
        {
            key: "hifi5",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide5} />
                </motion.div>
            ),
            description: (
                <>
                    <span className="hifi-caption">
                        EVENT ATTENDEE: “SIGN IN” PAGE
                    </span>
                </>
            ),
        },
        {
            key: "hifi6",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide6} />
                </motion.div>
            ),
            description: (
                <>
                    <span className="hifi-caption">
                        EVENT ATTENDEE: EVENT PAGE (BEFORE INPUT)
                    </span>
                </>
            ),
        },
        {
            key: "hifi7",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide7} />
                </motion.div>
            ),
            description: (
                <>
                    <span className="hifi-caption">
                        EVENT ATTENDEE: EVENT PAGE (AFTER INPUT)
                    </span>
                </>
            ),
        },
    ];

    return (
        <div {...props} id="hifi">
            <div className="part1">
                <div className="label">
                    <CaseItem className="header">
                        RESEARCH & DEVELOPMENT {">"} HI-FI
                    </CaseItem>
                    <CaseItem className="title">final result.</CaseItem>
                    <CaseItem className="body">
                        Scheduling just became 10x easier!
                        <b> Welcome to the redesigned When2Meet.</b>
                    </CaseItem>
                </div>
                <InteractiveElement
                    withParallax={{ y: [-20, 20] }}
                    className="mockup"
                >
                    <img src={mockup} />
                </InteractiveElement>
                <FramerCarousel
                    slides={slideData}
                    type="captioned"
                    className="hifi-carousel"
                />{" "}
            </div>
            <div className="part2">
                <div className="label">
                    <CaseItem className="header">
                        RESEARCH & DEVELOPMENT {">"} HI-FI
                    </CaseItem>
                    <CaseItem className="title">style guide.</CaseItem>
                    <CaseItem className="body">
                        We researched
                        <b>
                            {" "}
                            methods to make our design inclusive for various
                            different types of users{" "}
                        </b>
                        . In particular, we read articles that detail the ideal
                        <b> contrast ratio </b>
                        for the text & background color, the
                        <b> different types of colorblindness</b>, and
                        appropriate fonts to
                        <b> accommodate users with learning disabilities</b>.
                        <br />
                        <br />
                        The font used for the redesign (century gothic) as well
                        as the color palette solves
                        <b> a critical pain point </b>
                        while catering to our biggest goal for the redesign:
                        <b> inclusivity</b>.
                    </CaseItem>
                </div>
                <div className="graphic-guide">
                    <img src={hifi_guide} />
                </div>
                <div className="graphic-types">
                    <img src={hifi_types} />
                </div>
                <div className="hifi-arrow">{hifi_arrow_svg}</div>
                <div className="floating1">
                    font used for the redesign (century gothic) as well as the
                    color palette solves
                    <b> a critical pain point </b>
                    while catering to our biggest goal for the redesign:
                    <b> inclusivity</b>
                </div>
                <div className="floating2">
                    all colors had a large enough contrast ratio against the
                    white background to be distinguished and seen by people with
                    different types of colorblindness:
                </div>
            </div>
        </div>
    );
}

function Takeaways(props) {
    return (
        <div {...props} id="takeaways">
            <div className="label">
                <CaseItem className="header">takeaways</CaseItem>
                <CaseItem className="title">what we learned.</CaseItem>
                <CaseItem className="body">
                    Of course, not everything went exactly the way we planned
                    them to be. Here are some key things we learned:
                    <br />
                    <br />
                    <ul>
                        <li>
                            Advocating for every design decision — making
                            <b> intentional design choices</b>
                        </li>
                        <li>
                            Collaborating practically in a remote setting within
                            a time constraint
                        </li>
                        <li>
                            The
                            <b> UX process </b>
                            and some user research methods
                        </li>
                        <li>
                            <b>Empathy & human-centered design</b>: thinking
                            from the perspective of the users
                        </li>
                        <li>
                            Compromising our design to find the balance between
                            <b> usability </b>& aesthetic appeal
                        </li>
                    </ul>
                    <br />
                    What can we improve for a future project?
                    <br />
                    <br />
                    <ul>
                        <li>
                            Creating a<b> design standard page </b>
                            before any actual design to ensure
                            <b> consistency </b>
                            within the resulting user interface
                        </li>
                        <li>
                            Conducting
                            <b>user testing </b>
                            before each prototype phase (lo-mid-hi) to maximize
                            user feedback after each phase
                        </li>
                        <li>
                            Better
                            <b> documentation </b>
                            to keep track of all the work that was completed
                        </li>
                    </ul>
                </CaseItem>
            </div>
            <InteractiveElement
                withReactiveShape={{ lerpValue: 0.01 }}
                withScrollAnimation={{
                    animateIn: "fadeIn zoomIn",
                }}
                withParallax={{
                    y: [-15, 15],
                }}
                className="graphic-background"
            >
                <div className="circle" />
            </InteractiveElement>
            <InteractiveElement
                withReactiveShape={{ lerpValue: 0.02 }}
                withScrollAnimation={{
                    animateIn: "fadeIn zoomIn",
                }}
                withParallax={{
                    y: [20, -20],
                }}
                className="graphic-person-sitting graphic"
            >
                {takeaways_sitting_svg}
            </InteractiveElement>
            <InteractiveElement
                withReactiveShape={{ lerpValue: 0.03 }}
                withScrollAnimation={{
                    animateIn: "fadeIn zoomIn",
                }}
                withParallax={{
                    y: [-15, 15],
                }}
                className="graphic-person-sitting-bubble graphic"
            >
                {takeaways_sitting_bubble_svg}
            </InteractiveElement>
            <InteractiveElement
                withReactiveShape={{ lerpValue: 0.04 }}
                withScrollAnimation={{
                    animateIn: "fadeIn zoomIn",
                }}
                withParallax={{
                    y: [10, -10],
                }}
                className="graphic-person-standing graphic"
            >
                {takeaways_standing_svg}
            </InteractiveElement>
            <InteractiveElement
                withReactiveShape={{ lerpValue: 0.03 }}
                withScrollAnimation={{
                    animateIn: "fadeIn zoomIn",
                }}
                withParallax={{
                    y: [-15, 15],
                }}
                className="graphic-person-standing-bubble graphic"
            >
                {takeaways_standing_bubble_svg}
            </InteractiveElement>
        </div>
    );
}

function RndIdeation(props) {
    const ideation_Slide1 = `${cdnPrefix}/ideation/sally userflow map.png`;
    const ideation_Slide2 = `${cdnPrefix}/ideation/anthony userflow map.png`;
    const ideation_Slide3 = `${cdnPrefix}/ideation/kat userflow map.png`;

    const slideData = [
        {
            key: "ideation1",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={ideation_Slide1} />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 1</b>: Sally’s user flow map
                </>
            ),
        },
        {
            key: "ideation2",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={ideation_Slide2} />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 2</b>: Anthony’s user flow map
                </>
            ),
        },
        {
            key: "ideation3",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={ideation_Slide3} />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 3</b>: Kathryn’s user flow map
                </>
            ),
        },
    ];

    return (
        <div {...props} id="rnd-ideation">
            <div className="part1">
                <div className="label">
                    <CaseItem className="header">
                        RESEARCH & DEVELOPMENT {">"} SYNTHESIS & IDEATION
                    </CaseItem>
                    <CaseItem className="title">
                        research & competitive analysis.
                    </CaseItem>
                    <CaseItem className="body">
                        After a round of literature review, our team found out
                        the general public’s opinion on the pros & cons of
                        When2Meet, the popular alternatives to When2Meet (Bloom,
                        Doodle, Calendly, & LettuceMeet) and the reason why
                        people choose these alternatives over When2Meet.
                        <br />
                        <br />
                        To analyze the potential reasons why users sometimes
                        prefer using
                        <b> LettuceMeet</b>, a competitor website, over
                        When2Meet, we conducted a<b> competitive anlysis </b>
                        of the two.
                        <br />
                        <br />
                        We completed ordinary user tasks—such as creating an
                        event as an event host or indicating availability as an
                        event attendee—and determined the characteristics that
                        distinguishes the two:
                    </CaseItem>
                </div>
                <div className="ideation-graphic">
                    <img src={ideation_png} />
                </div>
            </div>
            <div className="part2">
                <div className="label">
                    <CaseItem className="header">
                        RESEARCH & DEVELOPMENT {">"} SYNTHESIS & IDEATION
                    </CaseItem>
                    <CaseItem className="title">user flow charts.</CaseItem>
                    <CaseItem className="body">
                        We individually created
                        <b> user flow charts </b>
                        for both the event host and attendee of the potential
                        steps needed to take for them to complete their
                        respective tasks (i.e. creating an event, indicating
                        their availability, etc.):
                    </CaseItem>
                </div>
                <FramerCarousel
                    slides={slideData}
                    type="captioned"
                    className="ideation-carousel"
                />
            </div>
        </div>
    );
}

function RndUserResearch(props) {
    const research_Slide1_bot = `${cdnPrefix}/userresearch/slide1_bot.png`;
    const research_Slide1_top = `${cdnPrefix}/userresearch/slide1_top.png`;
    const research_Slide1_mid = `${cdnPrefix}/userresearch/slide1_middle.png`;
    const research_Slide2 = `${cdnPrefix}/userresearch/slide2.png`;

    function BitmojiTestimony() {
        return (
            <div className="content-wrapper">
                <motion.div
                    className="pain-point a"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <span className="heading-4">Pain Point #1: </span>
                    <span className="body-2">
                        The outdated interface and lack of instructions make the
                        website very confusing for first-time and returning
                        users alike
                    </span>
                </motion.div>
                <motion.div className="bitmoji a">
                    <img src={research_Slide1_top} />
                </motion.div>
                <motion.div className="research-bubble a">
                    <div className="inner-text">
                        “[The current When2Meet] does the bare minimum, nothing
                        more. The interface is very outdated and not appealing.”
                    </div>
                    {research_bubble_1}
                </motion.div>

                <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="pain-point b"
                >
                    <span className="heading-4">Pain Point #2: </span>
                    <span className="body-2">
                        For event attendees, completing the task of inputting
                        their availability is inconvenient
                    </span>
                </motion.div>
                <motion.div className="bitmoji b">
                    <img src={research_Slide1_mid} />
                </motion.div>
                <motion.div className="research-bubble b">
                    <div className="inner-text">
                        “There’s some precision involved in selecting the times
                        you’re available, so it takes some coordination.”
                    </div>
                    {research_bubble_2}
                </motion.div>

                <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="pain-point c"
                >
                    <span className="heading-4">Pain Point #3: </span>
                    <span className="body-2">
                        Event hosts and attendees alike cannot go back to the
                        event page if they lose the link
                    </span>
                </motion.div>
                <motion.div className="bitmoji c">
                    <img src={research_Slide1_bot} />
                </motion.div>
                <motion.div className="research-bubble c">
                    <div className="inner-text">
                        “If you lose the link, its probably gone forever.”
                    </div>
                    {research_bubble_3}
                </motion.div>
            </div>
        );
    }

    const slideData = [
        {
            key: "research1",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <BitmojiTestimony />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 1</b>: pain points & user testimony
                </>
            ),
        },
        {
            key: "research2",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={research_Slide2} />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 2</b>: virtual affinity mapping & votes
                </>
            ),
        },
    ];

    function CountUpAnimation({ number, ...props }) {
        const [count, setCount] = useState(0);
        const [started, setStarted] = useState(false);
        useEffect(() => {
            if (count === number) return;
            if (!started) return;
            const timeoutID = setTimeout(() => {
                setCount(
                    Math.floor(
                        lerp(
                            [count],
                            [number],
                            (count / number) * (0.6 - 0.1) + 0.1
                        )[0]
                    )
                );
            }, 50);
            return () => {
                clearTimeout(timeoutID);
            };
        }, [count, started]);
        return (
            <ScrollAnimation
                animateIn="fadeIn"
                afterAnimatedIn={() => {
                    setStarted(true);
                }}
                duration={0.22}
                scrollableParentSelector=".ScrollbarsCustom-Scroller"
                animateOnce
                {...props}
            >
                {count}
                <span className="crimson">%</span>*
            </ScrollAnimation>
        );
    }

    return (
        <div {...props} id="rnd-user-research">
            <div className="label">
                <CaseItem className="header">
                    RESEARCH & DEVELOPMENT {">"} USER RESEARCH
                </CaseItem>
                <CaseItem className="title">
                    initial poll & pain points:
                </CaseItem>
                <CaseItem className="body">
                    We conducted a<b> Google Forms poll </b>
                    over 4 days to the UC Davis student body. From the responses
                    gathered, we found out that most users thought when2meet was
                    a useful tool, but
                    <b> did not appreciate the outdated UI </b>
                    and
                    <b> experienced confusion </b>
                    when organizing meet-ups as an event host, or inputting
                    availability as an event attendee.
                </CaseItem>
                <div className="statistics">
                    <div className="item">
                        <div className="number">
                            <CountUpAnimation number={33} delay={0} />
                        </div>
                        <div className="description">
                            Found the current website’s UI “outdated” and “not
                            at all enticing to use”
                        </div>
                    </div>
                    <div className="item">
                        <div className="number">
                            <CountUpAnimation number={35} delay={250} />
                        </div>
                        <div className="description">
                            Found the site confusing to navigate
                        </div>
                    </div>
                    <div className="item">
                        <div className="number">
                            <CountUpAnimation number={26} delay={500} />
                        </div>
                        <div className="description">
                            Had visibility issues with the site due to the
                            colors and font used
                        </div>
                    </div>
                </div>
                <div className="statistics-disclaimer">
                    *= of the 21 responses gathered
                </div>
                <div className="body comment">
                    After the poll, our team organized the data via
                    <b> affinity mapping</b>, and determined our pain points by
                    voting (albeit virtual—thanks COVID-19):
                </div>
            </div>

            <FramerCarousel
                slides={slideData}
                type="captioned"
                className="user-research-carousel"
            />

            <div className="label2">
                <CaseItem className="header">
                    RESEARCH & DEVELOPMENT {">"} USER RESEARCH
                </CaseItem>
                <CaseItem className="title">takeaways & user persona.</CaseItem>
                <CaseItem className="body">
                    Most of the poll participants believe that the user
                    interface can be improved, because the current website{" "}
                    <b>
                        discourages further use due to its outdated, confusing
                        interface.
                    </b>
                    <br />
                    <br />
                    From the data gathered, our team generated two user personas
                    to achieve deeper understanding of our target audience:
                </CaseItem>
            </div>

            <div className="persona persona-1">
                <div className="left">
                    <div className="headshot">
                        <img src={persona1} />
                    </div>
                    <div className="school"></div>
                    <div className="description">
                        <b>NAME: </b>Michelle K.
                        <br />
                        <br />
                        <b>AGE: </b> 19, Sohpomore @ UC Davis
                        <br />
                        <br />
                        <b>OCCUPATION: </b>Club President
                    </div>
                </div>
                <div className="divider" />
                <div className="right">
                    <div className="column">
                        <div className="question">
                            what do you <span className="green">use</span>{" "}
                            when2meet for?
                        </div>
                        <div className="item">
                            Planning
                            <b> club meetings </b>! I’m a club president, and I
                            use When2meet for scheduling board meetings.
                        </div>
                        <div className="item">
                            I also use When2meet to
                            <b> schedule interviews </b>
                            for potential board members.
                        </div>
                    </div>
                    <div className="column">
                        <div className="question">
                            what do you <span className="green">like</span>{" "}
                            about when2meet?
                        </div>
                        <div className="item">
                            I like
                            <b> how easily I can see </b>
                            everyone’s availability, and that I can hover over a
                            time to see who’s available and who isn’t.
                        </div>
                        <div className="item">
                            But most of the times, I prefer to use{" "}
                            <b>LettuceMeet </b>
                            because it’s easier on the eye, and easier to
                            navigate.
                        </div>
                    </div>
                    <div className="column">
                        <div className="question">
                            what do you <span className="green">dislike</span>{" "}
                            about when2meet?
                        </div>
                        <div className="item">
                            It’s hard to put down your availability because
                            there’s a lot of
                            <b> precision </b>
                            involved.
                        </div>
                        <div className="item">
                            I don’t like that{" "}
                            <b>
                                you can’t edit a When2meet once it is created.
                            </b>
                        </div>
                        <div className="item">
                            <b>The colors sometimes hurt my eyes</b>, and the
                            text size is all uniform making naviation really
                            confusing.
                        </div>
                    </div>
                </div>
            </div>
            <div className="persona persona-2">
                <div className="left">
                    <div className="headshot">
                        <img src={persona2} />
                    </div>
                    <div className="school"></div>
                    <div className="description">
                        <b>NAME: </b>Johnny C.
                        <br />
                        <br />
                        <b>AGE: </b> 18, Freshman @ UC Davis
                        <br />
                        <br />
                        <b>OCCUPATION: </b>General club member
                    </div>
                </div>
                <div className="divider" />
                <div className="right">
                    <div className="column">
                        <div className="question">
                            what do you <span className="green">use</span>{" "}
                            when2meet for?
                        </div>
                        <div className="item">
                            I use When2Meet to indicate availability whenever
                            there’s a<b> club event </b>
                            or a hangout with friends.
                        </div>
                        <div className="item">
                            I also use When2meet to
                            <b> schedule coffee chats </b>
                            with career representatives.
                        </div>
                    </div>
                    <div className="column">
                        <div className="question">
                            what do you <span className="green">like</span>{" "}
                            about when2meet?
                        </div>
                        <div className="item">
                            I like the fact that I don’t have to go through the
                            hassle of signing up or making an account to
                            indicate my availability; it’s a very quick process
                            overall.
                        </div>
                        <div className="item">
                            But most of the times, I prefer to use{" "}
                            <b>LettuceMeet </b>
                            because it’s easier on the eye, and easier to
                            navigate.
                        </div>
                    </div>
                    <div className="column">
                        <div className="question">
                            what do you <span className="green">dislike</span>{" "}
                            about when2meet?
                        </div>
                        <div className="item">
                            I should’ve mentioned this before—I’m
                            <b className="theme-color"> colorblind </b>
                            (specifically deutanopia), and the{" "}
                            <b>
                                colors on the website are very confusing to me
                            </b>
                            .
                        </div>
                        <div className="item">
                            Some of my friends have trouble using the website
                            because of their
                            <b className="theme-color">
                                {" "}
                                learning disabilities
                            </b>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RndInitial(props) {
    return (
        <div {...props} id="rnd-initial">
            <div className="label">
                <CaseItem className="header">
                    RESEARCH & DEVELOPMENT {">"} INITIAL THOUGHTS & OUR PROCESS
                </CaseItem>
                <CaseItem className="title">problem statement:</CaseItem>
                <CaseItem className="body">
                    As a member of various clubs on campus, I use When2Meet for
                    deciding times for events based on others’ availabilities.
                    However, though I use the website often, I found myself
                    <b> struggling to navigate the website</b>. As my colleagues
                    shared the same difficulty, I wondered if there was a way to
                    <b>
                        {" "}
                        make the process more enjoyable for both event hosts and
                        attendees
                    </b>
                    .
                    <br />
                    <br />
                    So,
                    <b> how might we </b>
                    make When2Meet easier to navigate for first-time and regular
                    users alike to make their event planning process enjoyable?
                </CaseItem>
            </div>
            <InteractiveElement
                withReactiveShape={{ lerpValue: 0.01 }}
                withScrollAnimation={{
                    animateIn: "fadeIn zoomIn",
                }}
                withParallax={{
                    y: [-15, 15],
                }}
                className="graphic-background"
            >
                <div className="inner circle" />
            </InteractiveElement>
            <InteractiveElement
                withParallax={{
                    y: [25, -25],
                }}
                withReactiveShape
                withScrollAnimation
                className="graphic-plant"
            >
                {rnd_initial_svg}
            </InteractiveElement>
            <div className="process-line">
                <div className="header item">USER RESEARCH</div>
                <div className="arrow">{rnd_initial_arrow_svg}</div>
                <div className="header item">SYNTHESIS & IDEATION</div>
                <div className="arrow">{rnd_initial_arrow_svg}</div>
                <div className="header item">PROTOTYPING</div>
                <div className="arrow">{rnd_initial_arrow_svg}</div>
                <div className="header item">USER TESTING & ANALYSIS</div>
                <div className="arrow">{rnd_initial_arrow_svg}</div>
                <div className="header item">DOCUMENTATION</div>
            </div>
        </div>
    );
}

function Overview(props) {
    const overview_navbar_Slide3 = `${cdnPrefix}/overview/navbar.png`;

    const overview_after_Slide1 = `${cdnPrefix}/overview/after/slide1.png`;
    const overview_after_Slide2 = `${cdnPrefix}/overview/after/slide2.png`;
    const overview_after_Slide3 = `${cdnPrefix}/overview/after/slide3.png`;
    const overview_after_Slide4 = `${cdnPrefix}/overview/after/slide4.png`;
    const overview_after_Slide5 = `${cdnPrefix}/overview/after/slide5.png`;
    const overview_after_Slide6 = `${cdnPrefix}/overview/after/slide6.png`;
    const overview_after_Slide7 = `${cdnPrefix}/overview/after/slide7.png`;

    const overview_before_Slide1 = `${cdnPrefix}/overview/before/slide1.png`;
    const overview_before_Slide5 = `${cdnPrefix}/overview/before/slide5.png`;
    const overview_before_Slide6 = `${cdnPrefix}/overview/before/slide6.png`;
    const overview_before_Slide7 = `${cdnPrefix}/overview/before/slide7.png`;

    const slideData = [
        {
            key: "slide1",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <BeforeAfterSlider
                        before={overview_before_Slide1}
                        after={overview_after_Slide1}
                    />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 1</b>: redesigned — landing page
                </>
            ),
        },
        {
            key: "slide2",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide2} />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 2</b>: new — “how it works” page
                </>
            ),
        },
        {
            key: "slide3",
            SlideComponent: ({ className, ...props }) => (
                <motion.div
                    {...props}
                    className={clsx(className, "mini-scroller")}
                >
                    <img
                        src={overview_navbar_Slide3}
                        className="slide-3-navbar"
                    />
                    <img src={overview_after_Slide3} className="content" />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 3</b>: new — event host, “create a new event” page
                </>
            ),
        },
        {
            key: "slide4",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <img src={overview_after_Slide4} />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 4</b>: new — event host, dashboard
                </>
            ),
        },
        {
            key: "slide5",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <BeforeAfterSlider
                        before={overview_before_Slide5}
                        after={overview_after_Slide5}
                    />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 5</b>: redesigned — event attendee, “sign in” page
                </>
            ),
        },
        {
            key: "slide6",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <BeforeAfterSlider
                        before={overview_before_Slide6}
                        after={overview_after_Slide6}
                    />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 6</b>: redesigned — event attendee, event page
                    (before input)
                </>
            ),
        },
        {
            key: "slide7",
            SlideComponent: (props) => (
                <motion.div {...props}>
                    <BeforeAfterSlider
                        before={overview_before_Slide7}
                        after={overview_after_Slide7}
                    />
                </motion.div>
            ),
            description: (
                <>
                    <b>figure 7</b>: redesigned — event attendee, event page
                    (after input)
                </>
            ),
        },
    ];

    return (
        <div {...props} id="overview">
            <div className="label">
                <CaseItem className="header">overview</CaseItem>
                <CaseItem className="title">introduction</CaseItem>
            </div>
            <InteractiveElement
                withReactiveShape={{ lerpValue: 0.01 }}
                withScrollAnimation={{
                    animateIn: "fadeIn zoomIn",
                }}
                withParallax={{
                    y: [-5, 5],
                }}
                className="graphic-background"
            >
                <div className="inner circle" />
            </InteractiveElement>
            <InteractiveElement
                withParallax
                withReactiveShape
                withScrollAnimation
                className="graphic-person-standing"
            >
                {overview_person_standing_svg}
            </InteractiveElement>
            <InteractiveElement
                withParallax={{
                    y: [35, -35],
                }}
                withReactiveShape={{ lerpValue: 0.02 }}
                withScrollAnimation
                className="graphic-person-sitting"
            >
                {overview_person_sitting_svg}
            </InteractiveElement>
            <CaseItem className="body">
                When2Meet is a popular scheduling tool used by many college
                students to <b>figure out mutual availabilities for events</b>{" "}
                and streamline the planning process.
                <br />
                <br />
                Within a timespan of two weeks, my team and I collaborated to
                redesign When2Meet to
                <b> better cater to the needs of the users</b>, using
                human-centered design mindset.
            </CaseItem>
            <FramerCarousel
                slides={slideData}
                type="captioned"
                className="overview-carousel"
            />
        </div>
    );
}

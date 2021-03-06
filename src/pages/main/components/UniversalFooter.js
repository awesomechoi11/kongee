import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import ReactiveShape from "../../../components/ReactiveShape";
import {
    mousePartialState_atom,
    mouse_wrapper_atom,
    override_mouse_atom,
    transition_atom,
} from "../../../recoil/atoms";
import {
    linkedin_svg,
    instagram_svg,
    mail_svg,
    file_svg,
} from "../../../assets/socialMediaIcons";
import vec2 from "gl-vec2";

const vsig =
    "https://cdn.brandon-choi.info/kongee/assets/footer/vsig_white.png";

export default function UniversalFooter({
    scrollableParentSelector = ".ScrollbarsCustom-Scroller",
}) {
    return (
        <div className="universal-footer">
            <Signature scrollableParentSelector={scrollableParentSelector} />
            <CoolShapes scrollableParentSelector={scrollableParentSelector} />
            <SiteMap scrollableParentSelector={scrollableParentSelector} />
            <FancyLine />
            <QuoteNSocials />
        </div>
    );
}

function FancyLine() {
    return (
        <div className="fancy-line-wrapper">
            <div className="fancy-line"></div>
        </div>
    );
}

function QuoteNSocials() {
    const setMousePartial = useSetRecoilState(mousePartialState_atom);
    const setOverride = useSetRecoilState(override_mouse_atom);
    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);

    return (
        <div className="quote-n-socials">
            <div className="quote">
                Designed with lots and lots of{" "}
                <span
                    onMouseMove={(e) => {
                        const position = [e.clientX, e.clientY];
                        const shiftedPos = vec2.add([], position, [0, -350]);
                        setOverride({
                            position: shiftedPos,
                            enabled: true,
                        });
                    }}
                    onMouseEnter={() => {
                        setMousePartial({
                            animState: "philz",
                        });
                        setMouseWrapper({
                            mixBlendMode: "normal",
                        });
                    }}
                    onMouseLeave={() => {
                        setMousePartial({
                            animState: "default",
                        });
                        setOverride({
                            enabled: false,
                            position: [0, 0],
                        });
                        setMouseWrapper({
                            mixBlendMode: "difference",
                        });
                    }}
                >
                    <u>Philtered Soul</u>
                </span>{" "}
                by Sally (Hyunji) Kim. CRAFTED BY{" "}
                <u>
                    <a href="https://brandon-choi.info" target="_blank">
                        BRANDON CHOI
                    </a>
                </u>
                .
            </div>
            <div className="socials">
                <div
                    className="item"
                    onMouseOver={() => {
                        setMousePartial({ animState: "icon" });
                    }}
                    onMouseLeave={() => {
                        setMousePartial({ animState: "default" });
                    }}
                    onClick={() => {
                        setMousePartial({
                            animState: "big",
                        });
                        setTimeout(() => {
                            window.open(
                                "https://www.linkedin.com/in/shjkim/",
                                "_blank"
                            );
                        }, 220);
                    }}
                >
                    {linkedin_svg}
                </div>
                <div
                    className="item"
                    onMouseOver={() => {
                        setMousePartial({ animState: "icon" });
                    }}
                    onMouseLeave={() => {
                        setMousePartial({ animState: "default" });
                    }}
                    onClick={() => {
                        setMousePartial({
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
                >
                    {instagram_svg}
                </div>
                <div
                    className="item"
                    onMouseOver={() => {
                        setMousePartial({ animState: "icon" });
                    }}
                    onMouseLeave={() => {
                        setMousePartial({ animState: "default" });
                    }}
                    onClick={() => {
                        setMousePartial({
                            animState: "big",
                        });
                        setTimeout(() => {
                            window.location.href = "mailto:hello@kongee.info";
                        }, 220);
                    }}
                >
                    {mail_svg}
                </div>
                <div
                    className="item"
                    onMouseOver={() => {
                        setMousePartial({ animState: "icon" });
                    }}
                    onMouseLeave={() => {
                        setMousePartial({ animState: "default" });
                    }}
                    onClick={() => {
                        setMousePartial({
                            animState: "big",
                        });
                        setTimeout(() => {
                            window.open(
                                "https://drive.google.com/file/d/1lBze_fJYSSC9Tt10XBATOCQvFrS1Ec99/view?usp=sharing",
                                "_blank"
                            );
                        }, 220);
                    }}
                >
                    {file_svg}
                </div>
            </div>
        </div>
    );
}

function Signature() {
    return (
        <div className="signature">
            <div className="left">
                <img alt='' src={vsig} alt='' />
            </div>
            <div className="right">
                <div className="top">Sally (Hyunji) Kim</div>
                <div className="bottom">UX / UI DESIGN</div>
            </div>
        </div>
    );
}

function CoolShapes({ scrollableParentSelector }) {
    return (
        <div className="cool-shapes">
            <ReactiveShape
                lerpValue={0.09}
                scrollableParentSelector={scrollableParentSelector}
                className="circle"
            />

            <ReactiveShape
                lerpValue={0.005}
                scrollableParentSelector={scrollableParentSelector}
                className="ring circle"
            />

            <ReactiveShape
                lerpValue={0.01}
                scrollableParentSelector={scrollableParentSelector}
                className="line2"
            />

            <ReactiveShape
                lerpValue={0.02}
                scrollableParentSelector={scrollableParentSelector}
                className="line1"
            />
        </div>
    );
}

function SiteMap() {
    const history = useHistory();
    const setMousePartial = useSetRecoilState(mousePartialState_atom);
    const setTransition = useSetRecoilState(transition_atom);

    const sitemapData = [
        {
            title: "home",
            path: "/",
        },
        {
            title: "work",
            path: "/work",
        },
        {
            title: "playground",
            path: "/playground",
        },
        {
            title: "about",
            path: "/about",
        },
        {
            title: "resume",
            path: "https://drive.google.com/file/d/1lBze_fJYSSC9Tt10XBATOCQvFrS1Ec99/view?usp=sharing",
        },
    ];
    return (
        <div className="sitemap">
            {sitemapData.map((data) => (
                <div key={data.title} className="item">
                    <span
                        className="item-inner"
                        onClick={() => {
                            if (data.title === "resume") {
                                window.open(
                                    "https://drive.google.com/file/d/1lBze_fJYSSC9Tt10XBATOCQvFrS1Ec99/view?usp=sharing",
                                    "_blank"
                                );
                                return;
                            }
                            setTransition({
                                enabled: true,
                                animate: true,
                            });
                            setTimeout(() => {
                                history.push(data.path);
                            }, 300);
                        }}
                        onMouseOver={() => {
                            setMousePartial({ animState: "icon" });
                        }}
                        onMouseLeave={() => {
                            setMousePartial({ animState: "default" });
                        }}
                    >
                        {data.title}
                    </span>
                </div>
            ))}
        </div>
    );
}

import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import vsig from "../../../assets/footer/vsig_white.png";
import ReactiveShape from "../../../components/ReactiveShape";
import { mousePartialState_atom } from "../../../recoil/atoms";
import {
    linkedin_svg,
    instagram_svg,
    mail_svg,
    file_svg,
} from "../../../assets/socialMediaIcons";

export default function UniversalFooter({
    scrollableParentSelector = ".ScrollbarsCustom-Scroller",
}) {
    return (
        <div className="universal-footer">
            <Signature scrollableParentSelector={scrollableParentSelector} />
            <CoolShapes scrollableParentSelector={scrollableParentSelector} />
            <SiteMap scrollableParentSelector={scrollableParentSelector} />
            <FancyLine scrollableParentSelector={scrollableParentSelector} />
            <QuoteNSocials
                scrollableParentSelector={scrollableParentSelector}
            />
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
    return (
        <div className="quote-n-socials">
            <div className="quote">
                Designed with lots and lots of Philtered Soul by Sally (Hyunji)
                Kim. CRAFTED BY BRANDON CHOI.
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
                            console.log(123);
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
                <img src={vsig} />
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
            path: "/resume",
        },
    ];
    return (
        <div className="sitemap">
            {sitemapData.map((data) => (
                <div key={data.title} className="item">
                    <span
                        className="item-inner"
                        onClick={() => {
                            history.push(data.path);
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

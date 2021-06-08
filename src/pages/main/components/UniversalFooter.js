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

export default function UniversalFooter() {
    return (
        <div className="universal-footer">
            <Signature />
            <CoolShapes />
            <SiteMap />
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

function CoolShapes() {
    return (
        <div className="cool-shapes">
            <ReactiveShape
                lerpValue={0.09}
                scrollableParentSelector=".ScrollbarsCustom-Scroller"
                className="circle"
            />

            <ReactiveShape
                lerpValue={0.005}
                scrollableParentSelector=".ScrollbarsCustom-Scroller"
                className="ring circle"
            />

            <ReactiveShape
                lerpValue={0.01}
                scrollableParentSelector=".ScrollbarsCustom-Scroller"
                className="line2"
            />

            <ReactiveShape
                lerpValue={0.02}
                scrollableParentSelector=".ScrollbarsCustom-Scroller"
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

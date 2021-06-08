import { useSetRecoilState } from "recoil";
import { mousePartialState_atom } from "../../../../recoil/atoms";
import useLoadTracker from "../../../../utility/useLoadTracker";
import "./styles.scss";

import vsig from "../../../../assets/vsig.png";
import {
    linkedin_svg,
    instagram_svg,
    mail_svg,
    file_svg,
} from "../../../../assets/socialMediaIcons";
import { motion } from "framer-motion";
import GravityButton from "../../../../components/GravityButton";
import ReactiveShape from "../../../../components/ReactiveShape";

function Landing() {
    useLoadTracker({
        vsig,
    });
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
        <motion.div id="landing">
            <img alt="vertical signature" src={vsig} id="vertical_signature" />

            <div className="landing_info">
                <div className="top">Sally (Hyunji) Kim</div>
                <div className="bottom">
                    <div>
                        <span
                            className="email"
                            {...sizeEvents({
                                animState: "big",
                            })}
                        >
                            hello@kongee.info
                        </span>
                    </div>
                    <div className="desc">ux/ui & product designer</div>
                </div>
            </div>

            <div className="offset_desc">
                <div>
                    I’m a product designer who seeks to empower the world
                    through thoughtful design.
                </div>
                <div>Based in Cupertino, CA. Currently in Davis, CA.</div>
            </div>

            <div className="socials">
                <GravityButton
                    className="social_wrapper"
                    preventLocalCounter
                    enterPadding={[15, 15]}
                    leavePadding={[50, 50]}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {linkedin_svg}
                </GravityButton>
                <GravityButton
                    className="social_wrapper"
                    preventLocalCounter
                    enterPadding={[15, 15]}
                    leavePadding={[50, 50]}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {instagram_svg}
                </GravityButton>
                <GravityButton
                    className="social_wrapper"
                    preventLocalCounter
                    enterPadding={[15, 15]}
                    leavePadding={[50, 50]}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {mail_svg}
                </GravityButton>
                <GravityButton
                    className="social_wrapper"
                    preventLocalCounter
                    enterPadding={[15, 15]}
                    leavePadding={[50, 50]}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {file_svg}
                </GravityButton>
            </div>

            <div className="landing_shapes">
                <ReactiveShape
                    lerpValue={0.01}
                    className="square"
                    scrollableParentSelector="#landing"
                />
                <ReactiveShape
                    lerpValue={-0.01}
                    className="rectangle"
                    scrollableParentSelector="#landing"
                />
                <ReactiveShape
                    lerpValue={0.03}
                    className="circle"
                    scrollableParentSelector="#landing"
                />
                <ReactiveShape
                    lerpValue={-0.03}
                    rotate={36.62}
                    className="line"
                    scrollableParentSelector="#landing"
                />
            </div>
        </motion.div>
    );
}

export default Landing;

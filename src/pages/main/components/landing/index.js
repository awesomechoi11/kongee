import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    global_mouse_position_atom,
    loading_atom,
    override_mouse_atom,
    mousePartialState_atom,
} from "../../../../recoil/atoms";
import useLoadTracker from "../../../../utility/useLoadTracker";
import "./styles.scss";

import vsig from "../../../../assets/vsig.png";
import {
    linkedin_svg,
    instagram_svg,
    mail_svg,
    file_svg,
} from "../../../../assets/socialMediaIcons";
import lerp from "../../../../utility/lerp";
import { motion } from "framer-motion";
import { rectToCenter } from "../../../../utility/elemCenter";
import GravityButton from "../../../../components/GravityButton";
import ReactiveShape from "../../../../components/ReactiveShape";

function Landing() {
    const [loadTracker, loading, progress] = useLoadTracker({
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
            <img
                alt="vertical signature"
                {...loadTracker.vsig}
                id="vertical_signature"
            />

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
                    enterRadius={40}
                    leaveRadius={75}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {linkedin_svg}
                </GravityButton>
                <GravityButton
                    className="social_wrapper"
                    enterRadius={40}
                    leaveRadius={75}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {instagram_svg}
                </GravityButton>
                <GravityButton
                    className="social_wrapper"
                    enterRadius={40}
                    leaveRadius={75}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {mail_svg}
                </GravityButton>
                <GravityButton
                    className="social_wrapper"
                    enterRadius={40}
                    leaveRadius={75}
                    {...sizeEvents({
                        animState: "icon",
                    })}
                >
                    {file_svg}
                </GravityButton>
            </div>

            <div className="landing_shapes">
                <ReactiveShape lerpValue={0.01} className="square" />
                <ReactiveShape lerpValue={-0.01} className="rectangle" />
                <ReactiveShape lerpValue={0.03} className="circle" />
                <ReactiveShape
                    lerpValue={-0.03}
                    rotate={36.62}
                    className="line"
                />
            </div>
        </motion.div>
    );
}

export default Landing;

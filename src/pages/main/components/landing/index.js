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

function Landing() {
    const [loadTracker, loading, progress] = useLoadTracker({
        vsig,
    });
    const setLoading = useSetRecoilState(loading_atom);
    useLayoutEffect(() => {
        if (!loading) {
            setLoading({
                loading,
                progress,
            });
        }
    }, [loading, progress]);
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
                            hello@kongee.com
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

function rectToCenter(rect) {
    return [rect.left + rect.width / 2, rect.top + rect.height / 2];
}

function GravityButton({ enterRadius, leaveRadius, ...props }) {
    const setOverride = useSetRecoilState(override_mouse_atom);
    const [enabled, setEnabled] = useState(false);
    const socialWidth = 25;
    const translate =
        socialWidth / 2 - (enabled ? leaveRadius : enterRadius) / 2;

    function handleMouseMove(e) {
        if (!enabled) setEnabled(true);
        const position = [e.clientX, e.clientY];
        const center = rectToCenter(e.target.getBoundingClientRect());
        setOverride({
            enabled: true,
            position: lerp(position, center, 0.9),
        });
    }
    function handleMouseLeave() {
        setEnabled(false);
        setOverride({
            enabled: false,
            position: [0, 0],
        });
    }
    return (
        <div {...props}>
            <span
                className="circle"
                style={{
                    width: enabled ? leaveRadius : enterRadius,
                    height: enabled ? leaveRadius : enterRadius,
                    transform: `translate(${translate}px,${translate}px)`,
                }}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            ></span>
            {props.children}
        </div>
    );
}

function ReactiveShape({ lerpValue, rotate = 0, ...props }) {
    const mousePosition = useRecoilValue(global_mouse_position_atom);
    const lerpedPosition = useRef([0, 0]);
    const elem = useRef(null);
    const center = useRef(null);
    const style = useRef(null);
    useLayoutEffect(() => {
        if (elem.current && mousePosition.default) {
            if (!center.current) {
                center.current = rectToCenter(
                    elem.current.getBoundingClientRect()
                );
            }
            lerpedPosition.current = lerp(
                center.current,
                mousePosition.lerped,
                lerpValue
            );
            style.current = {
                transform: `translate(calc(${lerpedPosition.current[0]}px - 50%),calc(${lerpedPosition.current[1]}px - 50%)) rotate(${rotate}deg)`,
                top: 0,
                left: 0,
            };
        }
    }, [elem, mousePosition]);
    return <div {...props} style={style.current} ref={elem} />;
}

import { useSetRecoilState } from "recoil";
import {
    loading_atom,
    mousePartialState_atom,
    override_mouse_atom,
    transition_atom,
} from "../../recoil/atoms";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useLocation,
} from "react-router-dom";
import "./styles.scss";
import { useAnimation, motion } from "framer-motion";
import { globe_svg } from "../../assets/svg";
import { eventToCenter } from "../../utility/elemCenter";
import clsx from "clsx";

function withTransitionSetter(WrappedComponent) {
    return () => {
        const setTransition = useSetRecoilState(transition_atom);

        useEffect(() => {
            setTransition({
                enabled: false,
                animate: true,
            });
            setTimeout(() => {}, 0);
        }, []);
        return <WrappedComponent />;
    };
}

const routeMap = [
    {
        name: "landing",
        path: "/",
        component: withTransitionSetter(
            React.lazy(() => import("./components/landing"))
        ),
        children: "SALLY (HYUNJI) KIM",
        onNavbar: "left",
        showNavbar: true,
        exact: true,
    },
    {
        name: "work",
        path: "/work",
        component: withTransitionSetter(
            React.lazy(() => import("./components/work"))
        ),
        children: "WORK",
        onNavbar: "right",
        showNavbar: true,
        exact: false,
    },
    {
        name: "playground",
        path: "/playground",
        component: withTransitionSetter(
            React.lazy(() => import("./components/playground"))
        ),
        children: "PLAYGROUND",
        onNavbar: "right",
        showNavbar: true,
        exact: true,
    },
    {
        name: "about",
        path: "/about",
        component: withTransitionSetter(
            React.lazy(() => import("./components/about"))
        ),
        children: "ABOUT",
        onNavbar: "right",
        showNavbar: true,
        exact: true,
    },
];

function Navbar() {
    const location = useLocation();
    return (
        <div id="navbar">
            <div className="left">
                {routeMap.map(
                    (pageData, index) =>
                        pageData.onNavbar === "left" &&
                        location.pathname !== "/" && (
                            <NavButton
                                key={"left" + pageData.path + index}
                                path={pageData.path}
                            >
                                {pageData.children}
                            </NavButton>
                        )
                )}
            </div>
            <div className="right">
                {routeMap.map(
                    (pageData, index) =>
                        pageData.onNavbar === "right" && (
                            <NavButton
                                key={"right" + pageData.path + index}
                                path={pageData.path}
                            >
                                {pageData.children}
                            </NavButton>
                        )
                )}
                <div id="language_globe">{globe_svg}</div>
            </div>
        </div>
    );
}

function NavButton(props) {
    let history = useHistory();
    let location = useLocation();

    let setMousePartial = useSetRecoilState(mousePartialState_atom);
    const [navigating, setNavigating] = useState(false);
    const setOverride = useSetRecoilState(override_mouse_atom);
    const setTransition = useSetRecoilState(transition_atom);

    const controls = useAnimation();

    return (
        <div
            className="nav_button"
            {...props}
            onClick={async (e) => {
                if (
                    location.pathname.startsWith(props.path) &&
                    location.pathname.endsWith("/case") &&
                    props.path !== "/"
                ) {
                    history.push(props.path);
                    return;
                } else if (
                    location.pathname.startsWith(props.path) &&
                    props.path !== "/"
                )
                    return;

                // run animation then change
                // console.log(e.target, e.target.getBoundingClientRect());

                // get element position
                const elemCenter = eventToCenter(e);

                // override mouse to hover
                setOverride({
                    enabled: true,
                    position: elemCenter,
                });

                // position transition overlay
                const { width, height } = e.target.getBoundingClientRect();
                // show transition overlay
                setNavigating(true);

                controls.set({
                    width: 0,
                    height: 0,
                    display: "block",
                    transform: `translate(calc(${
                        width / 2 - 16
                    }px - 50%),calc(${height / 2 - 8}px - 50%))`,
                });

                //set mouse to big
                setMousePartial({ animState: "big" });

                // play growing ball transition
                await controls.start({
                    width: "200vw",
                    height: "200vw",
                    transition: { duration: 0.6 },
                });

                //set mouse to normal
                setMousePartial({ animState: "default" });

                //show real overlay
                setTransition({
                    enabled: true,
                    animate: false,
                });
                // free the mouse
                setOverride({
                    enabled: false,
                    position: [0, 0],
                });

                setTimeout(() => {
                    history.push(props.path);
                }, 150);

                // now new page is responsible for closing overlay
            }}
            onMouseEnter={() => {
                setMousePartial({ animState: "icon" });
            }}
            onMouseLeave={() => {
                if (navigating) return;
                setMousePartial({ animState: "default" });
            }}
        >
            <div
                className={clsx(
                    "navigation-transition-overlay",
                    navigating && "active"
                )}
            >
                <div className="circle-wrapper">
                    <motion.div
                        animate={controls}
                        className="circle-inner"
                    ></motion.div>
                </div>
                {props.children}
            </div>
            {props.children}
        </div>
    );
}

function Main() {
    return (
        <div id="main">
            <Router>
                <Switch>
                    {routeMap.map((pageData, index) => (
                        <Route
                            exact={pageData.exact}
                            key={"page" + index}
                            path={pageData.path}
                        >
                            <Suspense
                                fallback={
                                    <SuspenseFallback name={pageData.name} />
                                }
                            >
                                <>
                                    <pageData.component />
                                    {pageData.showNavbar && <Navbar />}
                                </>
                            </Suspense>
                        </Route>
                    ))}
                </Switch>
            </Router>
        </div>
    );
}

function SuspenseFallback({ name }) {
    // console.log("suspense loading");
    const setLoading = useSetRecoilState(loading_atom);
    useLayoutEffect(() => {
        setLoading({
            loading: true,
            progress: 0,
        });
    }, []);
    return <div> </div>;
}

export default Main;

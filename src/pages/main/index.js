import { useSetRecoilState } from "recoil";
import { loading_atom, mousePartialState_atom } from "../../recoil/atoms";
import React, { Suspense, useLayoutEffect } from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";
import "./styles.scss";
import { AnimatePresence } from "framer-motion";
import { globe_svg } from "../../assets/svg";

const routeMap = [
    {
        name: "landing",
        path: "/",
        component: React.lazy(() => import("./components/landing")),
        children: <span className="navbar_left_name">SALLY (HYUNJI) KIM</span>,
        onNavbar: "left",
        showNavbar: true,
    },
    {
        name: "work",
        path: "/work",
        component: React.lazy(() => import("./components/work")),
        children: "WORK",
        onNavbar: "right",
        showNavbar: true,
    },
    {
        name: "playground",
        path: "/playground",
        component: React.lazy(() => import("./components/work")),
        children: "PLAYGROUND",
        onNavbar: "right",
        showNavbar: true,
    },
];

function Navbar() {
    return (
        <div id="navbar">
            <div className="left">
                {routeMap.map(
                    (pageData) =>
                        pageData.onNavbar === "left" && (
                            <NavButton path={pageData.path}>
                                {pageData.children}
                            </NavButton>
                        )
                )}
            </div>
            <div className="right">
                {routeMap.map(
                    (pageData) =>
                        pageData.onNavbar === "right" && (
                            <NavButton path={pageData.path}>
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
    let setMousePartial = useSetRecoilState(mousePartialState_atom);
    return (
        <div
            className="nav_button"
            {...props}
            onClick={(e) => {
                // run animation then change

                //screen to black
                // e.target.
                //setMousePartial({ animState: "gigantic" });

                // copy paste button

                //black overlay

                // change location
                setMousePartial({ animState: "gigantic" });
                history.push(props.path);
            }}
            onMouseEnter={() => {
                setMousePartial({ animState: "icon" });
            }}
            onMouseLeave={() => {
                setMousePartial({ animState: "default" });
            }}
        >
            {props.children}
        </div>
    );
}

function Main() {
    return (
        <div id="main">
            <Router>
                <AnimatePresence exitBeforeEnter>
                    <Switch>
                        {routeMap.map((pageData) => (
                            <Route exact path={pageData.path}>
                                <Suspense
                                    fallback={
                                        <SuspenseFallback
                                            name={pageData.name}
                                        />
                                    }
                                >
                                    <>
                                        {pageData.showNavbar && <Navbar />}
                                        <pageData.component />
                                    </>
                                </Suspense>
                            </Route>
                        ))}
                    </Switch>
                </AnimatePresence>
            </Router>
        </div>
    );
}

function SuspenseFallback({ name }) {
    const setLoading = useSetRecoilState(loading_atom);
    useLayoutEffect(() => {
        setLoading({
            loading: true,
            progress: 0,
        });
    }, []);
    return <div> {name} loading... </div>;
}

export default Main;

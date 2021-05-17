import { useSetRecoilState } from "recoil";
import { loading_atom } from "../../recoil/atoms";
import React, { Suspense, useLayoutEffect } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.scss";

const routeMap = [
    {
        name: "landing",
        path: "/",
        component: React.lazy(() => import("./components/landing")),
    },
    {
        name: "work",
        path: "/work",
        component: React.lazy(() => import("./components/work")),
    },
];

function Main() {
    return (
        <div id="main">
            <Router>
                <Switch>
                    {routeMap.map((pageData) => (
                        <Suspense
                            fallback={<SuspenseFallback name={pageData.name} />}
                        >
                            <Route path={pageData.path}>
                                <pageData.component />
                            </Route>
                        </Suspense>
                    ))}
                </Switch>
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
    return <div> loading... </div>;
}

export default Main;

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect } from "react";
import {
    Route,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
} from "react-router";
import { useSetRecoilState } from "recoil";
import { loading_atom } from "../../../../recoil/atoms";
import useLoadTracker from "../../../../utility/useLoadTracker";

import "./styles.scss";

function Work() {
    const [loadTracker, loading, progress] = useLoadTracker({});
    let location = useLocation();
    let history = useHistory();
    let { path, url } = useRouteMatch();

    const contentMap = [
        {
            description: "36-HR HACKATHON • PROTOTYPING • DESIGN",
            date: "FEB 2021 - MAR 2021",
            title: "auxilium",
            hoverText: "coming soon",
            path: "auxilium",
        },
        {
            description: "14-DAY DESIGN SPRINT • UX RESEARCH • DESIGN",
            date: "MAY 2021",
            title: "when2meet redesign",
            hoverText: "coming soon",
            path: "when2meet",
        },
    ];

    useLayoutEffect(() => {
        if (location.pathname === path)
            history.push(`${url}/${contentMap[0].path}`);
    }, [path]);

    return (
        <div id="work">
            {contentMap.map((pageData, index) => (
                <Route exact key={index} path={`${url}/${pageData.path}`}>
                    <SideFadeSwipe key={index}>
                        {pageData.description}
                    </SideFadeSwipe>
                </Route>
            ))}
        </div>
    );
}

function SideFadeSwipe(props) {
    return (
        <AnimatePresence>
            <motion.div
                {...props}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
            >
                {props.children}
            </motion.div>
        </AnimatePresence>
    );
}

function SlideUp(props) {
    return <motion.div {...props}>{props.children}</motion.div>;
}

export default Work;

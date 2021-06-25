import { gql, useQuery } from "@apollo/client";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import InteractiveElement from "../../../../components/InteractiveElement";
import useLoadTracker from "../../../../utility/useLoadTracker";
import { playground_overlay_atom } from "./atoms";
import "./styles.scss";
import clsx from "clsx";
import PlaygroundOverlay from "./PlaygroundOverlay";

const playgroundDataGQL = gql`
    query MyQuery {
        allPlaygroundPosts {
            id
            tags
            title
            tools
            description
            media {
                id
                url
            }
        }
    }
`;
export default function Playground() {
    useLoadTracker({});

    const { loading, error, data } = useQuery(playgroundDataGQL);
    const playgroundData = useMemo(() => {
        if (data && !loading && !error) {
            return {
                chunked: chunkArray(data.allPlaygroundPosts, 3),
                solid: data.allPlaygroundPosts,
            };
        }
        return undefined;
    }, [data]);

    const resetPlaygroundAtom = useResetRecoilState(playground_overlay_atom);

    useEffect(() => {
        resetPlaygroundAtom();
    }, []);

    return (
        <div id="playground">
            <AnimateSharedLayout>
                <PlaygroundOverlay />
                <div className="label">
                    <div className="title">playground</div>
                    <div className="body">
                        BEHIND-THE-SCENES, SCRIBBLES, & SIDE PROJECTS.
                    </div>
                </div>
                <div className="main-wrapper">
                    {playgroundData &&
                        playgroundData.chunked.map((threePosts, rowIndex) => (
                            <div className="row" key={rowIndex}>
                                {threePosts.map((data, colIndex) => (
                                    <Card
                                        className={clsx(
                                            "col-" + colIndex,
                                            "post-wrapper"
                                        )}
                                        key={"post" + rowIndex * 3 + colIndex}
                                        colIndex={colIndex}
                                        data={{
                                            ...data,
                                            solid: playgroundData.solid,
                                            position: rowIndex * 3 + colIndex,
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            </AnimateSharedLayout>
        </div>
    );
}

function Card({ colIndex, data, ...props }) {
    const [loading, progress] = useLoadTracker(
        {
            imageLoad: data.media[0].url,
        },
        false
    );
    const [currentOverlayData, setPlaygroundOverlay] = useRecoilState(
        playground_overlay_atom
    );
    return (
        <InteractiveElement
            withScrollAnimation={{
                scrollableParentSelector: "#playground",
                delay: 150 + colIndex * 50,
            }}
            {...props}
            onClick={() => {
                setPlaygroundOverlay(data);
            }}
        >
            {currentOverlayData.id !== data.id && (
                <motion.div
                    className={clsx("post-inner", progress === 1 && "loaded")}
                    layoutId={data.id}
                >
                    <img src={data.media[0].url} />
                </motion.div>
            )}
        </InteractiveElement>
    );
}

function chunkArray(myArray, chunk_size) {
    var arrayLength = myArray.length;
    var tempArray = [];
    for (let index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index + chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
}

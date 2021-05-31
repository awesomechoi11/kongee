import { useLayoutEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loading_atom } from "../recoil/atoms";

export default function useLoadTracker(assets) {
    var result = {};
    const total = useRef(Object.keys(assets).length);
    const totalLoaded = useRef(0);
    const [loading, setLoading] = useRecoilState(loading_atom);
    const [progress, setProgress] = useState(0);
    for (const [key, value] of Object.entries(assets)) {
        result[key] = {
            src: value,
            onLoad: () => {
                totalLoaded.current += 1;
                setProgress(totalLoaded.current / total.current);
                if (total.current === totalLoaded.current) {
                    setLoading(false);
                }
            },
        };
    }
    if (loading) {
        if (total.current === totalLoaded.current) {
            setLoading(false);
        }
    }

    return [result, loading, progress];
}

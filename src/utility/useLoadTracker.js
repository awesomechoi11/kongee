import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loading_atom } from "../recoil/atoms";

export default function useLoadTracker(assets, updateRecoil = true) {
    const total = useRef(Object.keys(assets).length);
    const totalLoaded = useRef(0);
    const [loading, setLoading] = useRecoilState(loading_atom);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        var resultobj = {};
        for (const [key, value] of Object.entries(assets)) {
            const img = new Image();
            img.src = value;
            img.onload = () => {
                totalLoaded.current += 1;
                setProgress(totalLoaded.current / total.current);
            };
            img.onerror = () => {
                throw "err loading img!";
            };

            resultobj[key] = {
                src: value,
            };
        }
    }, []);
    useEffect(() => {
        if (loading && loading.loading) {
            if (total.current === totalLoaded.current && updateRecoil) {
                setLoading({
                    loading: false,
                    progress: 0,
                });
            }
        }
    }, [progress]);

    return [loading, progress];
}

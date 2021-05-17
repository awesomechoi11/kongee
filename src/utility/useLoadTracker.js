import { useRef, useState } from "react";

export default function useLoadTracker(assets) {
    var result = {};
    const total = useRef(Object.keys(assets).length);
    const totalLoaded = useRef(0);
    const [loading, setLoading] = useState(true);
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
    return [result, loading, progress];
}

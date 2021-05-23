import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loading_atom } from "../../../../recoil/atoms";
import useLoadTracker from "../../../../utility/useLoadTracker";

function Work() {
    const [loadTracker, loading, progress] = useLoadTracker({});
    const setLoading = useSetRecoilState(loading_atom);
    useLayoutEffect(() => {
        if (!loading) {
            setLoading({
                loading,
                progress,
            });
        }
    }, [loading, progress]);

    return <div>work</div>;
}

export default Work;

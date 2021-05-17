import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loading_atom } from "../../../../recoil/atoms";
import useLoadTracker from "../../../../utility/useLoadTracker";
import "./styles.scss";

import vsig from "../../../../assets/vsig.png";

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
    return (
        <div id="landing">
            <img
                {...loadTracker.vsig}
                alt="vertical signature"
                id="vertical_signature"
            />
            <div className="landing_info">
                <div className="top">Sally (Hyunji) Kim</div>
                <div className="bottom">
                    <div className="email">hello@kongee.com</div>
                    <div className="desc">ux/ui & product designer</div>
                </div>
            </div>
        </div>
    );
}

export default Landing;

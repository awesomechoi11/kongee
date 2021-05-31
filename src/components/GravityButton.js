import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { override_mouse_atom } from "../recoil/atoms";
import { rectToCenter } from "../utility/elemCenter";
import lerp from "../utility/lerp";

export default function GravityButton({
    enterRadius,
    leaveRadius,
    itemDim,
    ...props
}) {
    const setOverride = useSetRecoilState(override_mouse_atom);
    const [enabled, setEnabled] = useState(false);
    const socialWidth = (itemDim && itemDim[0]) || 25;
    const socialHeight = itemDim && itemDim[1];
    const translate =
        socialWidth / 2 - (enabled ? leaveRadius : enterRadius) / 2;

    function handleMouseMove(e) {
        if (!enabled) setEnabled(true);
        const position = [e.clientX, e.clientY];
        const center = rectToCenter(e.target.getBoundingClientRect());
        setOverride({
            enabled: true,
            position: lerp(position, center, 0.9),
        });
    }
    function handleMouseLeave() {
        setEnabled(false);
        setOverride({
            enabled: false,
            position: [0, 0],
        });
    }
    return (
        <div {...props}>
            <span
                className="circle"
                style={{
                    width: enabled ? leaveRadius : enterRadius,
                    height: enabled ? leaveRadius : enterRadius,
                    transform: `translate(${translate}px,${translate}px)`,
                }}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            ></span>
            {props.children}
        </div>
    );
}

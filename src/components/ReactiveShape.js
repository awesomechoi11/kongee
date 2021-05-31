import { useLayoutEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { global_mouse_position_atom } from "../recoil/atoms";
import { rectToCenter } from "../utility/elemCenter";
import lerp from "../utility/lerp";
var vec2 = require("gl-vec2");

export default function ReactiveShape({
    lerpValue,
    rotate = 0,
    scrollRef,
    ...props
}) {
    const mousePosition = useRecoilValue(global_mouse_position_atom);
    const lerpedPosition = useRef([0, 0]);
    const elem = useRef(null);
    const center = useRef(null);
    const style = useRef(null);
    const [scrollRefSet, setScrollRefSet] = useState(false);

    useLayoutEffect(() => {
        if (elem.current && mousePosition.default) {
            if (!center.current) {
                const rectCenter = rectToCenter(
                    elem.current.getBoundingClientRect()
                );
                center.current = rectCenter;
            }
            if (!scrollRefSet && scrollRef) {
                if (!scrollRef.current) return;

                setScrollRefSet(true);

                const rectCenter = rectToCenter(
                    elem.current.getBoundingClientRect()
                );
                center.current = vec2.add(vec2.create(), rectCenter, [
                    scrollRef.current.scrollLeft,
                    scrollRef.current.scrollTop,
                ]);
            }

            if (center.current) {
                lerpedPosition.current = lerp(
                    center.current,
                    mousePosition.lerped,
                    lerpValue
                );
                style.current = {
                    transform: `translate(calc(${lerpedPosition.current[0]}px - 50%),calc(${lerpedPosition.current[1]}px - 50%)) rotate(${rotate}deg)`,
                    top: 0,
                    left: 0,
                };
            }
        }
    }, [elem, mousePosition, scrollRef]);
    return (
        <div {...props} style={style.current} ref={elem}>
            {props.children}
        </div>
    );
}

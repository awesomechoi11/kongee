import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    forceMouseRerender,
    mousePartialState_atom,
    override_mouse_atom,
} from "../recoil/atoms";
import { rectToCenter } from "../utility/elemCenter";
import lerp from "../utility/lerp";
import vec2 from "gl-vec2";

export default function GravityButton({
    enterPadding,
    leavePadding,
    itemDim,
    counter,
    onClick,
    onMouseEnter,
    onMouseLeave,
    shape = "circle",
    preventLocalCounter = false,
    ...props
}) {
    const setMouse = useSetRecoilState(mousePartialState_atom);
    const setOverride = useSetRecoilState(override_mouse_atom);
    const [forceMouseRerenderValue, forceMouseRerenderSetter] =
        useRecoilState(forceMouseRerender);
    const [enabled, setEnabled] = useState(false);
    const [localCounter, setLocalCounter] = useState(0);
    // itemDimension is [width, height] of ref
    const [itemDimension, setItemDimension] = useState(itemDim || [25, 25]);

    // on initial load:
    // ref should from undefined to not undefined change
    const ref = useRef(null);
    useEffect(() => {
        if (ref && ref.current) {
            const { width, height } = ref.current.getBoundingClientRect();
            // update item dimension
            setItemDimension([width, height]);
        }
    }, [ref, counter]);

    useEffect(() => {
        // on ref change
        if (localCounter && !preventLocalCounter) {
            setLocalCounter(0);

            const { width, height } = ref.current.getBoundingClientRect();
            const center = rectToCenter(ref.current.getBoundingClientRect());
            // update item dimension
            setItemDimension([width, height]);

            // update mouse shape
            setMouse({
                animState: "custom",
                width,
                height,
                borderRadius: 0,
            });
            // update mouse position
            setOverride({
                enabled: true,
                position: center,
            });

            // trigger mouse position change
            forceMouseRerenderSetter(forceMouseRerenderValue + 1);
        }
    }, [localCounter]);

    // paddingDimension is the addition of itemDimension and given padding values
    const paddingDimension = useMemo(
        () =>
            vec2.add([], itemDimension, enabled ? leavePadding : enterPadding),
        [itemDimension, enabled, leavePadding, enterPadding]
    );

    const translate = useMemo(
        () =>
            vec2.sub(
                [],
                vec2.div([], itemDimension, [2, 2]),
                vec2.div([], paddingDimension, [2, 2])
            ),
        [paddingDimension, itemDimension]
    );

    function handleOnClick(e) {
        if (!preventLocalCounter) setLocalCounter(1);
        if (onClick) onClick(e);
    }

    function handleMouseMove(e) {
        if (!enabled) setEnabled(true);
        const position = [e.clientX, e.clientY];
        const center = rectToCenter(e.target.getBoundingClientRect());
        setOverride({
            enabled: true,
            position: lerp(position, center, 0.9),
        });
    }
    function handleMouseEnter() {
        setMouse({
            animState: "custom",
            width: itemDimension[0],
            height: itemDimension[1],
            borderRadius: 0,
        });
        if (onMouseEnter) onMouseEnter();
    }
    function handleMouseLeave() {
        setEnabled(false);
        setOverride({
            enabled: false,
            position: [0, 0],
        });
        setMouse({
            animState: "default",
        });
        if (onMouseLeave) onMouseLeave();
    }
    return (
        <div {...props} onClick={handleOnClick} ref={ref}>
            <span
                className="circle"
                style={{
                    width: paddingDimension[0],
                    height: paddingDimension[1],
                    transform: `translate(${translate[0]}px,${translate[1]}px)`,
                }}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
            ></span>
            {props.children}
        </div>
    );
}

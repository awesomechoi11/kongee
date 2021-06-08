import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import { useRecoilValue } from "recoil";
import { global_mouse_position_atom } from "../recoil/atoms";
import { rectToCenter } from "../utility/elemCenter";
import lerp from "../utility/lerp";
import vec2 from "gl-vec2";

function getElementTop(elm) {
    var yPos = 0;
    while (elm && elm.offsetTop !== undefined && elm.clientTop !== undefined) {
        yPos += elm.offsetTop + elm.clientTop;
        elm = elm.offsetParent;
    }
    return yPos;
}

function getScrollPos(scrollableParent) {
    if (scrollableParent.pageYOffset !== undefined) {
        return scrollableParent.pageYOffset;
    }
    return scrollableParent.scrollTop;
}

function getScrollableParentHeight(scrollableParent) {
    if (scrollableParent.innerHeight !== undefined) {
        return scrollableParent.innerHeight;
    }
    return scrollableParent.clientHeight;
}

function getViewportTop(scrollableParent) {
    return getScrollPos(scrollableParent);
}

function getViewportBottom(scrollableParent) {
    return (
        getScrollPos(scrollableParent) +
        getScrollableParentHeight(scrollableParent)
    );
}

function isInViewport(y, scrollableParent) {
    return (
        y >= getViewportTop(scrollableParent) &&
        y <= getViewportBottom(scrollableParent)
    );
}

function isAboveViewport(y, scrollableParent) {
    return y < getViewportTop(scrollableParent);
}

function isBelowViewport(y, scrollableParent) {
    return y > getViewportBottom(scrollableParent);
}

function inViewport(elementTop, elementBottom, scrollableParent) {
    return (
        isInViewport(elementTop, scrollableParent) ||
        isInViewport(elementBottom, scrollableParent) ||
        (isAboveViewport(elementTop, scrollableParent) &&
            isBelowViewport(elementBottom, scrollableParent))
    );
}

function onScreen(elementTop, elementBottom, scrollableParent) {
    return (
        !isAboveScreen(elementBottom, scrollableParent) &&
        !isBelowScreen(elementTop, scrollableParent)
    );
}

function isAboveScreen(y, scrollableParent) {
    return y < getScrollPos(scrollableParent);
}

function isBelowScreen(y, scrollableParent) {
    return (
        y >
        getScrollPos(scrollableParent) +
            getScrollableParentHeight(scrollableParent)
    );
}

function getVisibility(node, scrollableParent) {
    const elementTop = getElementTop(node) - getElementTop(scrollableParent);
    const elementBottom = elementTop + node.clientHeight;
    return {
        inViewport: inViewport(elementTop, elementBottom, scrollableParent),
        onScreen: onScreen(elementTop, elementBottom, scrollableParent),
    };
}
export default function ReactiveShape({
    lerpValue,
    rotate = 0,
    scrollableParentSelector,
    ...props
}) {
    const mousePosition = useRecoilValue(global_mouse_position_atom);
    const lerpedPosition = useRef([0, 0]);
    const elem = useRef(null);
    const center = useRef(null);
    const style = useRef(null);
    const scrollableParent = useRef(null);
    const enabled = useRef(false);

    useLayoutEffect(() => {
        if (elem.current && mousePosition.default) {
            if (!center.current) {
                const rectCenter = rectToCenter(
                    elem.current.getBoundingClientRect()
                );
                center.current = rectCenter;
            }
            if (scrollableParent && !scrollableParent.current) {
                scrollableParent.current = document.querySelector(
                    scrollableParentSelector
                );
                const rectCenter = rectToCenter(
                    elem.current.getBoundingClientRect()
                );
                center.current = vec2.add([], rectCenter, [
                    scrollableParent.current.scrollLeft,
                    scrollableParent.current.scrollTop,
                ]);
            }

            // have a single bool ref which is calculated to be true only once
            if (!enabled.current) {
                enabled.current =
                    center &&
                    center.current &&
                    elem &&
                    elem.current &&
                    scrollableParent &&
                    scrollableParent.current;
            }
            // previous bool ensures all variables are avaialable for visibility check
            if (
                enabled &&
                getVisibility(elem.current, scrollableParent.current).inViewport
            ) {
                var transform;
                const scrollAdjustedMousePosition = vec2.add(
                    [],
                    mousePosition.lerped,
                    [
                        scrollableParent.current.scrollLeft,
                        scrollableParent.current.scrollTop,
                    ]
                );
                lerpedPosition.current = lerp(
                    center.current,
                    scrollAdjustedMousePosition,
                    lerpValue
                );

                vec2.sub(
                    lerpedPosition.current,
                    center.current,
                    lerpedPosition.current
                );
                transform = `translate(${lerpedPosition.current[0]}px,${lerpedPosition.current[1]}px) rotate(${rotate}deg)`;

                style.current = {
                    transform,
                };
            }
        }
    }, [elem, mousePosition]);
    return (
        <div {...props} style={style.current} ref={elem}>
            {props.children}
        </div>
    );
}

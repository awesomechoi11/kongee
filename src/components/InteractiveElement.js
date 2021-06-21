import ReactiveShape from "./ReactiveShape";
import ScrollAnimation from "react-animate-on-scroll";
import { Parallax } from "react-scroll-parallax";

export default function InteractiveElement({
    withReactiveShape,
    withScrollAnimation,
    withParallax,
    ...props
}) {
    var Output = props.children;
    if (withReactiveShape) {
        let localprops = {
            lerpValue: 0.04,
            scrollableParentSelector: ".ScrollbarsCustom-Scroller",
            nooffset: true,
            ...(withReactiveShape === "boolean" ? {} : withReactiveShape),
        };

        Output = <ReactiveShape {...localprops}>{Output}</ReactiveShape>;
    }
    if (withScrollAnimation) {
        let localprops = {
            animateIn: "fadeIn",
            scrollableParentSelector: ".ScrollbarsCustom-Scroller",
            delay: 150,
            animateOnce: true,
            ...(withScrollAnimation === "boolean" ? {} : withScrollAnimation),
        };

        Output = <ScrollAnimation {...localprops}>{Output}</ScrollAnimation>;
    }
    if (withParallax) {
        let localprops = {
            y: [50, -50],
            ...(withParallax === "boolean" ? {} : withParallax),
        };
        Output = <Parallax {...localprops}>{Output}</Parallax>;
    }
    return <div {...props}>{Output}</div>;
}

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
    mousePartialState_atom,
    mouse_wrapper_atom,
} from "../../../../../../recoil/atoms";
import UniversalFooter from "../../../UniversalFooter";

export default function CaseFooter({ caseDetails, beforeAndAfter }) {
    return (
        <>
            <div className="footer-outer" style={{ top: "1307.9rem" }}>
                <div className="footer-inner">
                    <FooterItem
                        className="left"
                        caseDetails={beforeAndAfter[0].caseDetails}
                    />
                    <FooterItem
                        className="right"
                        caseDetails={beforeAndAfter[1].caseDetails}
                    />
                </div>
            </div>
            <UniversalFooter />
        </>
    );
}

function FooterItem({ caseDetails, className }) {
    const { enabled, color } = caseDetails;
    const [hovered, setHovered] = useState(false);
    const setMouse = useSetRecoilState(mousePartialState_atom);

    const setMouseWrapper = useSetRecoilState(mouse_wrapper_atom);
    function handleMouseEnter(e) {
        setMouse({
            animState: enabled ? "workHover" : "workHoverNotEnabled",
            color,
        });
        setMouseWrapper({
            mixBlendMode: "normal",
        });
        setHovered(true);
    }
    function handleMouseLeave(e) {
        setMouse({
            animState: "default",
            color: "#fff",
        });
        setMouseWrapper({
            mixBlendMode: "difference",
        });
        setHovered(false);
    }

    return (
        <div
            className={className}
            style={{
                backgroundColor: hovered ? caseDetails.color : "",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="item-wrapper">
                <div className="title">
                    {className === "left" ? "back to" : "next up"}
                </div>
                <div className="item-title">{caseDetails.title}</div>
            </div>
        </div>
    );
}

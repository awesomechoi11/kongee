import { useSetRecoilState } from "recoil";
import { case_selector } from "../../../../../../recoil/case_atoms";

export default function CaseSection({ id, children, ...props }) {
    const setCaseState = useSetRecoilState(case_selector);
    function handleMouseEnter() {
        setCaseState({
            currentMarker: id,
        });
    }
    return (
        <div
            className="case-section"
            onMouseEnter={handleMouseEnter}
            {...props}
            id={id}
        >
            <div className="section-contents">{children}</div>
        </div>
    );
}

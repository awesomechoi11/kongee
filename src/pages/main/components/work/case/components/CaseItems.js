import InteractiveElement from "../../../../../../components/InteractiveElement";

export default function CaseItem(props) {
    return (
        <InteractiveElement withScrollAnimation {...props}>
            {props.children}
        </InteractiveElement>
    );
}

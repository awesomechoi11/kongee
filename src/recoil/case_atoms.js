// atom stuff for case studies

import { atom, selector } from "recoil";

export const case_atom = atom({
    key: "case_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        inTransition: false,
        selected: 0,
        backgroundColor: "#fff",
        top: 0,
        enabled: true,
        currentMarker: false,
        count: 0, // so it refires even if same top value
    }, // default value (aka initial value)
});
export const case_selector = selector({
    key: "case_selector", // unique ID (with respect to other atoms/selectors)
    set: ({ get, set }, newState) => {
        const oldState = get(case_atom);

        var oldCopy = { ...oldState };
        for (const [key, value] of Object.entries(newState)) {
            oldCopy[key] = value;
        }
        set(case_atom, oldCopy);
    },
    get: ({ get }) => get(case_atom),
});

export const case_overlay_atom = atom({
    key: "case_overlay_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        layoutId: "uwu",
    },
    // default value (aka initial value)
});

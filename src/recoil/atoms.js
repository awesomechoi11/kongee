import { atom, selector } from "recoil";

// const textState = atom({
//     key: "textState", // unique ID (with respect to other atoms/selectors)
//     default: "", // default value (aka initial value)
// });

export const mouse_atom = atom({
    key: "mouse_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        animState: "default",
        color: "#000",
    }, // default value (aka initial value)
});

export const mouseAnimState_atom = selector({
    key: "mouseAnimState_atom", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const mouseState = get(mouse_atom);
        return mouseState.animState;
    },
    set: ({ get, set }, newValue) => {
        const oldState = get(mouse_atom);
        set(mouse_atom, { ...oldState, animState: newValue });
    },
});

export const main_atom = atom({
    key: "main_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        state: "loading",
        loading: true,
        progress: 0,
    }, // default value (aka initial value)
});

export const loading_atom = atom({
    key: "loading_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        loading: true,
        progress: 0,
    }, // default value (aka initial value)
});

import { atom, selector } from "recoil";

// const textState = atom({
//     key: "textState", // unique ID (with respect to other atoms/selectors)
//     default: "", // default value (aka initial value)
// });

export const mouse_atom = atom({
    key: "mouse_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        animState: "default",
        backgroundColor: "#fff",
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

export const mousePartialState_atom = selector({
    key: "mousePartialState_atom", // unique ID (with respect to other atoms/selectors)
    set: ({ get, set }, newState) => {
        const oldState = get(mouse_atom);

        var oldCopy = { ...oldState };
        for (const [key, value] of Object.entries(newState)) {
            oldCopy[key] = value;
        }
        set(mouse_atom, oldCopy);
    },
});

export const override_mouse_atom = atom({
    key: "override_mouse_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        position: [0, 0],
        enabled: false,
    }, // default value (aka initial value)
});

export const global_mouse_position_atom = atom({
    key: "global_mouse_position_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        default: [0, 0],
        lerped: [0, 0],
    }, // default value (aka initial value)
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

import { atom, selector } from "recoil";

export const mouse_atom = atom({
    key: "mouse_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        animState: "default",
        backgroundColor: "#fff",
    }, // default value (aka initial value)
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
export const forceRefresh_global_mouse_position_selector = selector({
    key: "forceRefresh_global_mouse_position_selector", // unique ID (with respect to other atoms/selectors)
    set: ({ get, set }, newState) => {
        const oldState = get(global_mouse_position_atom);
        set(global_mouse_position_atom, JSON.parse(JSON.stringify(oldState)));
    },
});

export const forceMouseRerender = atom({
    key: "forceMouseRerender",
    default: 0,
});

export const mouse_wrapper_atom = atom({
    key: "mouse_wrapper_atom",
    default: 0,
});

export const global_mouse_position_selector = selector({
    key: "global_mouse_position_selector",
    set: ({ get, set }, newState) => {
        const oldState = get(mouse_atom);

        var oldCopy = { ...oldState };
        for (const [key, value] of Object.entries(newState)) {
            oldCopy[key] = value;
        }
        set(mouse_atom, oldCopy);
    },
});

export const loading_atom = atom({
    key: "loading_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        loading: true,
        progress: 0,
    }, // default value (aka initial value)
});

export const transition_atom = atom({
    key: "transition_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        enabled: true,
        animate: false,
    }, // default value (aka initial value)
});

export const firstLoad_atom = atom({
    key: "firstLoad_atom",
    default: true,
});

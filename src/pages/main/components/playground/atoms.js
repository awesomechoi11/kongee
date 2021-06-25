import { atom, selector } from "recoil";

export const playground_overlay_atom = atom({
    key: "playground_overlay_atom", // unique ID (with respect to other atoms/selectors)
    default: {
        id: "none",
    },
});

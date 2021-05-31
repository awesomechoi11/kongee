export function rectToCenter(rect) {
    return [rect.left + rect.width / 2, rect.top + rect.height / 2];
}
export function eventToCenter(e) {
    return rectToCenter(e.target.getBoundingClientRect());
}

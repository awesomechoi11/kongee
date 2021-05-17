export default function lerp(a, b, t) {
    return a.map((value, index) => value * (1 - t) + b[index] * t);
}

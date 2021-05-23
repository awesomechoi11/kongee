export default function lerp(fromArr, toArr, t) {
    return fromArr.map((value, index) =>
        Math.abs(value - toArr[index]) > 1
            ? value * (1 - t) + toArr[index] * t
            : toArr[index]
    );
}

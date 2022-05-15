const convert = (t) => {
    if (!t) return;
    const segments = t.split("T");
    segments[1] = segments[1].split(".")[0];
    return segments.join(" ");
}

export default convert;
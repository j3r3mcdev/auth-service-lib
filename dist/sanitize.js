export function sanitize(input) {
    if (!input)
        return "";
    return input.replace(/[<>]/g, "");
}

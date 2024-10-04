export function capitalizeFirstLetter (string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function cutS (string) {
    if (!string) return '';
    return string.slice(0, -1);
};
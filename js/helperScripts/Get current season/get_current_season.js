export function get_current_season() {
    const now = new Date();
    const curr_year = now.getFullYear();
    const curr_month = now.getMonth() + 1; // januari = 0, dus +1

    if (curr_month <= 8) {
        // januari t/m augustus → huidig seizoen is vorig jaar / dit jaar
        return `${curr_year - 1}/${curr_year}`;
    } else {
        // september t/m december → huidig seizoen is dit jaar / volgend jaar
        return `${curr_year}/${curr_year + 1}`;
    }        
}
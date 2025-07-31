import {
    sync_total_contribution_element_position
} from '../Styling/styling.js';


export function reset_contribution_family_total() {
    const family_contribution_total = document.querySelector('.amount-family-contributie-total');
    if (family_contribution_total) {
        family_contribution_total.textContent = '';
        sync_total_contribution_element_position();
    }

    const monthlyField = document.querySelector('.family-contribution-total-per-month');
    if (monthlyField) {
        monthlyField.textContent = '';
    }
}

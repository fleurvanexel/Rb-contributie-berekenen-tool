import {
    sync_total_contribution_element_position
} from '../Styling/styling.js';


export function reset_contributie_family_member(family_member_number) {
    const family_member = document.querySelector(`#family-member-${family_member_number}`);
    const contributieTotaalField = family_member.querySelector('.amount-contributie-totaal');
    if (contributieTotaalField) {
        contributieTotaalField.textContent = '';
        sync_total_contribution_element_position();
    }
}

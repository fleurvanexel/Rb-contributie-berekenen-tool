import {
    update_family_contributie_total
}
from '../Calculate contribution/calculate_contributie_family_total.js';

import { 
    remove_unique_member
} from '../State/unique_members_state.js';

import {
    sync_total_contribution_element_position,
    update_all_contribution_positions
} from '../Styling/styling.js';


export function delete_family_member(family_member_number) {
    const element = document.getElementById(`family-member-${family_member_number}`);
    if (element) element.remove();

    remove_unique_member(family_member_number)

    update_family_contributie_total();
    sync_total_contribution_element_position();
    update_all_contribution_positions();
}

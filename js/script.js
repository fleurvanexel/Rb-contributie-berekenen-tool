import {
    add_family_member
} from './helperScripts/Family member/add_family_member.js';

import { 
    delete_family_member 
} from './helperScripts/Family member/delete_family_member.js';

import {
    get_current_season
} from './helperScripts/Get current season/get_current_season.js';

import { 
    add_unique_member
} from './helperScripts/State/unique_members_state.js';

import {
    sync_total_contribution_element_position,
    update_all_contribution_positions
} from './helperScripts/Styling/styling.js';


let memberCount = 1;

document.addEventListener("DOMContentLoaded", function () {

    // Pagina titel
    let title = document.querySelector('.top-bar h1');
    title.textContent += ` Seizoen ${get_current_season()}`;

    // Add first member on load
    add_family_member(memberCount);
    add_unique_member(memberCount);
    
    // Add new member on button click
    document.getElementById('add_member').addEventListener('click', () => {
        memberCount++;
        add_family_member(memberCount);
        add_unique_member(memberCount);
        update_all_contribution_positions();
    });

    // Delete member on button click
    window.delete_family_member = delete_family_member;

    // Update total contribution element position on load or resizing
    window.addEventListener('load', sync_total_contribution_element_position);
    window.addEventListener('resize', sync_total_contribution_element_position);

});

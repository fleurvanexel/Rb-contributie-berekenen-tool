import {
    calculate_contributie_family_member,
}
from '../Calculate contribution/calculate_contributie_family_member.js';

import {
    reset_contribution_family_total
} from '../Calculate contribution/reset_contributie_family_total.js';

import {
    apply_verplicht_zaalhockey_als_geen_veldhockey
} from '../Verplichte combinaties/verplichte_combinaties.js';


export function add_family_member(family_member_number) {
    reset_contribution_family_total();
    const family_member_element = create_new_family_member_element(family_member_number);
    fill_year_options(family_member_number);
    attach_event_listeners(family_member_element, family_member_number);
}


// ---------- Helper functions for export function ----------


function attach_event_listeners(el, family_member_number) {
    const lidstatus = el.querySelector('.lid-status select');
    const veldhockey = el.querySelectorAll(`input[name="veldhockey-type-family-member-${family_member_number}"]`);
    const toeslag = el.querySelector('.column-3 select');
    const zaalhockey = el.querySelector('.switch input');
    const maand = el.querySelector('.select-field-month');
    const jaar = el.querySelector('.select-field-year');
  
    lidstatus.addEventListener('change', () => calculate_contributie_family_member(family_member_number));
    veldhockey.forEach(radio => radio.addEventListener('change', () => {
        apply_verplicht_zaalhockey_als_geen_veldhockey(family_member_number),
        calculate_contributie_family_member(family_member_number)
    }));
    toeslag.addEventListener('change', () => calculate_contributie_family_member(family_member_number));
    zaalhockey.addEventListener('change', () => calculate_contributie_family_member(family_member_number));    
    maand.addEventListener('change', () => calculate_contributie_family_member(family_member_number));
    jaar.addEventListener('change', () => calculate_contributie_family_member(family_member_number));
}


function create_new_family_member_element(family_member_number) {
    const html_family_member = get_family_member_html(family_member_number);
    const family_container = document.getElementById('family-members-container');
    family_container.insertAdjacentHTML('beforeend', html_family_member);
    set_up_info_buttons_clickable();
    return document.querySelector(`#family-member-${family_member_number}`);
}


function fill_year_options(family_member_number) {
    const year_button_date_of_birth = document.querySelector(`#family-member-${family_member_number} .select-field-year`);
    
    const curr_year = new Date().getFullYear();
    const min_year = curr_year - 110;

    for (let year = curr_year; year >= min_year; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;     
        year_button_date_of_birth.appendChild(option);
    } 
}


function get_family_member_html(family_member_number) {
    const html_family_member = `
        <div class="family-member" id="family-member-${family_member_number}">
            ${family_member_number === 1 ? '' : `
                <button class="delete-member-btn" onclick="delete_family_member(${family_member_number})">
                &times;
                </button>
            `}

            <div class="column-1">
                <div class="family-member-field-title">
                    Geboortejaar
                    <div class="info-wrap">
                        <button class="info-button" type="button">
                            ⓘ
                        </button>
                        <div class="custom-tooltip-right">
                        De peildatum is 1 oktober van het desbetreffende seizoen, een voorbeeld is te vinden op de site.
                        </div>
                    </div>
                </div>
                <div class="user-choose-option">
                <div class="fill-space-before-select"></div>
                <select class="select-field-month">
                    <option value="" disabled selected>Maand</option>
                    <option>Jan</option><option>Feb</option><option>Mrt</option>
                    <option>Apr</option><option>Mei</option><option>Jun</option>
                    <option>Jul</option><option>Aug</option><option>Sep</option>
                    <option>Okt</option><option>Nov</option><option>Dec</option>
                </select>
                <select class="select-field-year">
                    <option value="" disabled selected>Jaar</option>
                </select>
                </div>
                <div class="show-age-category"></div>

                <div class="lid-status">
                    <div class="family-member-field-title">Lidstatus</div>
                    <div class="user-choose-option">
                        <div class="fill-space-before-select"></div>
                        <select class="select-field">
                            <option value="" disabled selected>Inschrijven / Herinschrijven / Al lid</option>
                            <option>Inschrijven</option>
                            <option>Herinschrijven</option>
                            <option>Al lid</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="column-2">
                <div class="family-member-field-title">
                    Lidmaatschapsvorm veldhockey
                    <div class="info-wrap">
                        <button class="info-button" type="button">
                            ⓘ
                        </button>
                        <div class="custom-tooltip-left">
                            Iedereen onder de 18 is volwaardig veldhockeylid.
                        </div>
                    </div>
                </div>
                <div class="note-field-title"><i>Selecteer één optie</i></div>
                <div class="veldhockey-type">
                    <label><input type="radio" name="veldhockey-type-family-member-${family_member_number}" value="Volwaardig">Volwaardig</label><br>
                    <label><input type="radio" name="veldhockey-type-family-member-${family_member_number}" value="Trainingslid">Trainingslid</label><br>
                    <label><input type="radio" name="veldhockey-type-family-member-${family_member_number}" value="Trimmer">Trimmer</label><br>
                    <label><input type="radio" name="veldhockey-type-family-member-${family_member_number}" value="Geen">Geen veldhockey</label>
                </div>
            </div>

            <div class="column-3">
                <div class="family-member-field-title">
                    Selectieteam toeslag
                    <div class="info-wrap">
                        <button class="info-button" type="button">
                            ⓘ
                        </button>
                        <div class="custom-tooltip-left">
                            Alleen van toepassing op de O12-O18 teams en Jong-Senioren. Jong-Senioren spelend in D1/D2/H1/H2 betalen Senioren-contributie.
                        </div>
                    </div>
                </div>
                <div class="user-choose-option">
                    <div class="fill-space-before-select"></div>
                    <select class="select-field">
                        <option value="" disabled selected>Geen / 1e team / 2e team</option>
                        <option>Geen</option>
                        <option>1e team</option>
                        <option>2e team</option>
                    </select>
                </div>
            </div>

            <div class="column-4">
                <div class="family-member-field-title">
                    Speelt zaalhockey?
                    <div class="info-wrap">
                        <button class="info-button" type="button">
                            ⓘ
                        </button>
                        <div class="custom-tooltip-left">
                            Zaalhockey wordt aangebogen vanaf O8 en is verplicht voor O8-O18 teams.
                        </div>
                    </div>
                </div>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>

            <div class="contributie-totaal-family-member-${family_member_number}">
                <div class="text-contributie-totaal">Contributie: </div>
                <div class="amount-contributie-totaal"></div>
            </div>

        </div>
    `;

    return html_family_member;
}


// let lastOpenedWrapper = null;

// document.addEventListener('click', (e) => {
//     const button = e.target.closest('.info-button');

//     if (button && button.tagName === 'BUTTON') {
//         const wrapper = button.closest('.info-wrap');

//         // Close all other active wrappers
//         document.querySelectorAll('.info-wrap.active').forEach(activeWrapper => {
//             if (activeWrapper !== wrapper) {
//                 activeWrapper.classList.remove('active');
//             }
//         });

//         // Toggle current one
//         const isAlreadyOpen = wrapper.classList.contains('active');

//         if (isAlreadyOpen && lastOpenedWrapper === wrapper) {
//             // Second tap on same button: close it
//             wrapper.classList.remove('active');
//             lastOpenedWrapper = null;
//         } else {
//             wrapper.classList.add('active');
//             lastOpenedWrapper = wrapper;
//         }

//         e.stopPropagation();
//     } else {
//         // Clicked outside: close all
//         document.querySelectorAll('.info-wrap.active').forEach(wrapper => {
//             if (!wrapper.contains(e.target)) {
//                 wrapper.classList.remove('active');
//             }
//         });
//         lastOpenedWrapper = null;
//     }
// });

// function set_up_info_buttons_clickable() {
//     document.querySelectorAll('.info-button').forEach(button => {
//         button.addEventListener('click', toggle_info_panel); // This listens for mouse clicks (working on laptops/desktops)
//         button.addEventListener('touchstart', toggle_info_panel); // This listens for the touch event on mobile devices
//     });
// }

// function toggle_info_panel(e) {
//     const button = e.target;
//     const wrapper = button.closest('.info-wrap');
    
//     // Close all other info panels
//     document.querySelectorAll('.info-wrap.active').forEach(other => {
//         if (other !== wrapper) {
//             other.classList.remove('active');
//         }
//     });

//     // Toggle the active state
//     wrapper.classList.toggle('active');
//     e.stopPropagation(); // Prevent global listener from closing it immediately
// }

function set_up_info_buttons_clickable() {
    document.querySelectorAll('.info-button').forEach(button => {
        // Add touchstart and click listeners
        button.addEventListener('click', toggleInfoPanel);
        button.addEventListener('touchstart', toggleInfoPanel, { passive: true });
    });
}

function toggleInfoPanel(e) {
    // Prevent default action and stop propagation to avoid interference with other listeners
    e.preventDefault();
    e.stopPropagation();

    const button = e.target;
    const wrapper = button.closest('.info-wrap');

    // Close all other info panels
    document.querySelectorAll('.info-wrap.active').forEach(other => {
        if (other !== wrapper) {
            other.classList.remove('active');
        }
    });

    // Toggle the active state (open/close the panel)
    wrapper.classList.toggle('active');
}



document.addEventListener('click', (e) => {
    document.querySelectorAll('.info-wrap.active').forEach(wrapper => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('active');
      }
    });
});

import {
    update_family_contributie_total
} from '../Calculate contribution/calculate_contributie_family_total.js';

import {
    reset_contributie_family_member
} from '../Calculate contribution/reset_contributie_family_member.js';

import {
    reset_contribution_family_total
} from '../Calculate contribution/reset_contributie_family_total.js';

import {
    show_breakdown_contributie_family_member
} from '../Calculate contribution/show_breakdown_contributie_family_member.js';

import {
    contributie_veldhockey,
    toeslagen_veldhockey,
    contributie_zaalhockey,
    bijdrage_kledingplan,
    administratiekosten,
    min_leeftijd_hockeyen,
    leeftijd_naar_senioren,
    min_leeftijd_verplicht_volwaardig_veldhockey_lid,
    max_leeftijd_verplicht_volwaardig_veldhockey_lid,
    min_age_jong_senioren,
    max_age_jong_senioren,
    min_leeftijd_selectieteam,
    max_leeftijd_selectieteam,
    min_leeftijd_zaalhockey_verplicht,
    max_leeftijd_zaalhockey_verplicht
} from '../Contribution data/contribution_data.js';

import {
    sync_total_contribution_element_position,
    update_all_contribution_positions
} from '../Styling/styling.js';

import {
    apply_verplichte_combinaties
} from '../Verplichte combinaties/verplichte_combinaties.js'


export function calculate_contributie_family_member(family_member_number) {
    const family_member = document.querySelector(`#family-member-${family_member_number}`);
    if (!family_member) return;

    let { maand, jaar, lidstatus, lidvorm, toeslag, zaalhockey } = get_user_inputs(family_member);
    
    const valid_leeftijd = verify_age_family_member_valid(maand, jaar);
    if (!valid_leeftijd && maand && jaar) {
        show_message_too_young(family_member);
        apply_verplichte_combinaties(family_member, valid_leeftijd);
        reset_contributie_family_member(family_member_number);
        reset_contribution_family_total();
        return;
    }

    if (maand && jaar) {
        show_leeftijdscategorie(family_member, valid_leeftijd);
        apply_verplichte_combinaties(family_member, valid_leeftijd);
    }

    // Revise as verplichte combianties change some
    ({ maand, jaar, lidstatus, lidvorm, toeslag, zaalhockey } = get_user_inputs(family_member));

    // Only show contributie if all field filled
    if (!maand || isNaN(jaar) || !lidstatus || !lidvorm || !toeslag || toeslag === "") {
        reset_contributie_family_member(family_member_number);
        reset_contribution_family_total();
        return;
    }
  
    let contributie_total = 0;
    const breakdown = {
        veldhockey: compute_contributie_veldhockey(valid_leeftijd, lidvorm, toeslag),
        toeslag: compute_contributie_selectieteam_toeslag(valid_leeftijd, toeslag),
        zaalhockey: compute_contributie_zaalhockey(valid_leeftijd, zaalhockey),
        kledingplan: compute_contributie_kledingplan(valid_leeftijd, lidstatus),
        administratie: compute_contributie_administratiekosten(lidstatus)
    };

    contributie_total =
        breakdown.veldhockey +
        breakdown.toeslag +
        breakdown.zaalhockey +
        breakdown.kledingplan +
        breakdown.administratie;

    show_contributie_family_member(family_member, family_member_number, contributie_total, breakdown);

    sync_total_contribution_element_position();
    update_family_contributie_total();
    update_all_contribution_positions();
}


// ---------- Helper functions for export function ----------


function compute_age(maand_value, jaar_value) {    
    const curr_year = new Date().getFullYear();
    const curr_month = new Date().getMonth() + 1; // zero-based

    let seizoen_start_jaar = curr_month <= 8 ? curr_year - 1 : curr_year;

    const peildatum = new Date(seizoen_start_jaar, 9, 1); // maand 9 = oktober

    const maand_index = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"].indexOf(maand_value);
    const geboortedatum = new Date(jaar_value, maand_index, 1);

    let leeftijd = peildatum.getFullYear() - geboortedatum.getFullYear();
    const geboortedag_na_peildatum = geboortedatum.getMonth() >= peildatum.getMonth();
    if (geboortedag_na_peildatum) {
        leeftijd -= 1;
    }

    return leeftijd;
}


function compute_contributie_veldhockey(leeftijd, lidvorm, toeslag) {
    let matchedCategory = null;

    const is_volwaardig_veldhockey_lid = (
        (leeftijd >= min_leeftijd_verplicht_volwaardig_veldhockey_lid &&
        leeftijd <= max_leeftijd_verplicht_volwaardig_veldhockey_lid) || 
        (lidvorm == "Volwaardig")
    );

    const is_jong_senior_die_selectie_toeslag_moet_betalen = (
        leeftijd >= min_age_jong_senioren &&
        leeftijd <= max_age_jong_senioren &&
        lidvorm === "Volwaardig" &&
        (toeslag == "Speelster D1/D2" || toeslag == "Speler H1/H2")
        // ["Speelster D1/D2", "Speler H1/H2"].includes(toeslag)
    );

    if (is_volwaardig_veldhockey_lid && !is_jong_senior_die_selectie_toeslag_moet_betalen) {
        // Find contributie based on age
        matchedCategory = contributie_veldhockey.find(c =>
            typeof c.minAge === "number" &&
            typeof c.maxAge === "number" &&
            leeftijd >= c.minAge &&
            leeftijd <= c.maxAge
        );
    } else if (is_jong_senior_die_selectie_toeslag_moet_betalen) {
        matchedCategory = contributie_veldhockey.find(c => c.category === "Senioren");
    } else {
        matchedCategory = contributie_veldhockey.find(c => c.category === lidvorm);
    }

    return matchedCategory ? matchedCategory.amount : 0;
}


function compute_contributie_selectieteam_toeslag(leeftijd, toeslag) {
    const toeslag_betalen = toeslagen_veldhockey.find(item =>
        leeftijd >= item.minAge &&
        leeftijd <= item.maxAge &&
        item.name === `Selectietoeslag ${toeslag} team`
    );

    return toeslag_betalen ? toeslag_betalen.amount : 0;
}


function compute_contributie_zaalhockey(leeftijd, zaalhockey) {
    let zaalCategory = null;
    if (zaalhockey) {
        zaalCategory = contributie_zaalhockey.find(z =>
            leeftijd >= z.minAge && leeftijd <= z.maxAge
        );
    }
    return zaalCategory ? zaalCategory.amount : 0;
}


function compute_contributie_kledingplan(leeftijd, lidstatus) {
    let kledingplan_bijdrage = 0;

    const { jaarlijkse_bijdrage_kledingplan, borg_kledingplan } = bijdrage_kledingplan;

    const binnen_leeftijd_bijdragen_kledingplan = (
        leeftijd >= jaarlijkse_bijdrage_kledingplan.minAge &&
        leeftijd <= jaarlijkse_bijdrage_kledingplan.maxAge
      );

    if (binnen_leeftijd_bijdragen_kledingplan) {
        kledingplan_bijdrage += jaarlijkse_bijdrage_kledingplan.amount;

        if (["Inschrijven", "Herinschrijven"].includes(lidstatus)) {
            kledingplan_bijdrage += borg_kledingplan.amount;
        }
    }

    return kledingplan_bijdrage;
}


function compute_contributie_administratiekosten(lidstatus) {
    return administratiekosten[lidstatus]?.amount ?? 0;
}


function get_user_inputs(family_member) {
    const maand = family_member.querySelector('.select-field-month')?.value;
    const jaar = parseInt(family_member.querySelector('.select-field-year')?.value);
    const lidstatus = family_member.querySelector('.lid-status select')?.value;
    const lidvorm = family_member.querySelector(`input[name^="veldhockey-type-family-member-"]:checked`)?.value;
    const toeslag = family_member.querySelector('.column-3 select')?.value;
    const zaalhockey = family_member.querySelector('.switch input')?.checked;
  
    return { maand, jaar, lidstatus, lidvorm, toeslag, zaalhockey };
}

function get_veldhockey_category(leeftijd) {
    const match = contributie_veldhockey.find(c => 
        typeof c.minAge === "number" && typeof c.maxAge === "number" && 
        leeftijd >= c.minAge && leeftijd <= c.maxAge
    );
    return match || null;
}


function show_contributie_family_member(family_member, family_member_number, contributie_total, breakdown) {
    const totalField = family_member.querySelector('.amount-contributie-totaal');

    totalField.innerHTML = `
        € ${contributie_total.toFixed(2).replace('.', ',')}
        <span id="contributie-info-icon-${family_member_number}" class="contributie-info-icon hidden"
        onclick="show_breakdown_contributie_family_member(
            ${family_member_number},
            ${breakdown.veldhockey},
            ${breakdown.toeslag},
            ${breakdown.zaalhockey},
            ${breakdown.kledingplan},
            ${breakdown.administratie}
        )">ⓘ</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <div id="contributie-breakdown-${family_member_number}" class="contributie-breakdown hidden"></div>
    `;
}
window.show_breakdown_contributie_family_member = show_breakdown_contributie_family_member;



function show_leeftijdscategorie(family_member, leeftijd) {
    const category_div = family_member.querySelector('.show-age-category');
    const category = get_veldhockey_category(leeftijd);
    if (category) {
        category_div.textContent = `Leeftijdscategorie: ${category.category}`;
    }
}


function show_message_too_young(family_member) {
    const category_div = family_member.querySelector('.show-age-category');
    category_div.textContent = `Nog even geduld! Zodra je op 1 oktober vijf bent, ben je van harte welkom!`;
}
  

function verify_age_family_member_valid(maand, jaar) {
    const leeftijd = compute_age(maand, jaar);
    return leeftijd !== null && leeftijd >= min_leeftijd_hockeyen ? leeftijd : null;
}

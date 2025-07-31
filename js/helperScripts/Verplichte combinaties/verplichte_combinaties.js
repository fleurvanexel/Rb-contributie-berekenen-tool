import {
    min_leeftijd_hockeyen,
    leeftijd_naar_senioren,
    min_leeftijd_verplicht_volwaardig_veldhockey_lid,
    max_leeftijd_verplicht_volwaardig_veldhockey_lid,
    min_age_jong_senioren,
    max_age_jong_senioren,
    min_leeftijd_selectieteam,
    max_leeftijd_selectieteam,
    min_leeftijd_zaalhockey,
    min_leeftijd_zaalhockey_verplicht,
    max_leeftijd_zaalhockey_verplicht
} from '../Contribution data/contribution_data.js';


export function apply_verplichte_combinaties(family_member, leeftijd) {
    const is_te_jong_om_lid_te_zijn = leeftijd < min_leeftijd_hockeyen;
    const is_jong_senior = leeftijd >= min_age_jong_senioren && leeftijd <= max_age_jong_senioren;
    const is_senior = leeftijd > max_age_jong_senioren
    const is_verplicht_volwaardig_veldhockeylid = min_leeftijd_verplicht_volwaardig_veldhockey_lid && leeftijd <= max_leeftijd_verplicht_volwaardig_veldhockey_lid; 
    const is_eventueel_selectie_toeslag_verschuldigd = leeftijd >= min_leeftijd_selectieteam && leeftijd <= max_leeftijd_selectieteam;
    const is_te_jong_om_zaalhockey_lid_te_zijn = leeftijd < min_leeftijd_zaalhockey;
    const is_verplicht_zaalhockey_lid = min_leeftijd_zaalhockey_verplicht && leeftijd <= max_leeftijd_zaalhockey_verplicht; 

    if (is_te_jong_om_lid_te_zijn) {
        // console.log("Verplichte combinatie: te jong");
        lock_lidstatus(family_member);
        lock_veldhockey(family_member);
        lock_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        lock_zaalhockey(family_member);
    }
    else if (is_verplicht_volwaardig_veldhockeylid && !is_eventueel_selectie_toeslag_verschuldigd && !is_verplicht_zaalhockey_lid && is_te_jong_om_zaalhockey_lid_te_zijn) {
        // console.log("Verplichte combinatie: veldhockey & !selectie toeslag & !zaalhockey & te jong zaalhockey");
        free_restrictions_lidstatus(family_member);
        verplicht_volwaardig_veldhockeylid(family_member);
        lock_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        lock_zaalhockey(family_member);
    }
    else if (is_verplicht_volwaardig_veldhockeylid && !is_eventueel_selectie_toeslag_verschuldigd && !is_verplicht_zaalhockey_lid && !is_te_jong_om_zaalhockey_lid_te_zijn) {
        // console.log("Verplichte combinatie: veldhockey & !selectie toeslag & !zaalhockey & mag zaalhockey");
        free_restrictions_lidstatus(family_member);
        verplicht_volwaardig_veldhockeylid(family_member);
        lock_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        free_restrictions_zaalhockey(family_member);
    }
    else if (is_verplicht_volwaardig_veldhockeylid && !is_eventueel_selectie_toeslag_verschuldigd && is_verplicht_zaalhockey_lid) {
        // console.log("Verplichte combinatie: veldhockey & !selectie toeslag & zaalhockey");
        free_restrictions_lidstatus(family_member);
        verplicht_volwaardig_veldhockeylid(family_member);
        lock_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        verplicht_zaalhockey(family_member);
    }
    else if (is_verplicht_volwaardig_veldhockeylid && is_eventueel_selectie_toeslag_verschuldigd && !is_verplicht_zaalhockey_lid && is_te_jong_om_zaalhockey_lid_te_zijn) {
        // console.log("Verplichte combinatie: veldhockey & selectie toeslag & !zaalhockey & te jong");
        free_restrictions_lidstatus(family_member);
        verplicht_volwaardig_veldhockeylid(family_member);
        free_restrictions_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        lock_zaalhockey(family_member);
    }
    else if (is_verplicht_volwaardig_veldhockeylid && is_eventueel_selectie_toeslag_verschuldigd && !is_verplicht_zaalhockey_lid && !is_te_jong_om_zaalhockey_lid_te_zijn) {
        // console.log("Verplichte combinatie: veldhockey & selectie toeslag & !zaalhockey & mag zaalhockey");
        free_restrictions_lidstatus(family_member);
        verplicht_volwaardig_veldhockeylid(family_member);
        free_restrictions_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        free_restrictions_zaalhockey(family_member);
    }
    else if (is_verplicht_volwaardig_veldhockeylid && is_eventueel_selectie_toeslag_verschuldigd && is_verplicht_zaalhockey_lid) {
        // console.log("Verplichte combinatie: veldhockey & selectie toeslag & zaalhockey");
        free_restrictions_lidstatus(family_member);
        verplicht_volwaardig_veldhockeylid(family_member);
        free_restrictions_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        verplicht_zaalhockey(family_member);
    }
    else if (is_jong_senior) {
        // console.log("Verplichte combinatie: jong senior");
        free_restrictions_lidstatus(family_member);
        free_restrictions_veldhockey(family_member);
        lock_trimmer_option_veldhockey(family_member);
        free_restrictions_selectieteam_toeslag(family_member);
        rename_selectieteam_toeslag_jong_senioren(family_member);
        free_restrictions_zaalhockey(family_member);
    }
    else if (is_senior) {
        // console.log("Verplichte combinatie: senior");
        free_restrictions_lidstatus(family_member);
        free_restrictions_veldhockey(family_member);
        lock_selectieteam_toeslag(family_member);
        remove_selectieteam_toeslag_jong_senioren(family_member);
        free_restrictions_zaalhockey(family_member);
    }
}


export function apply_verplicht_zaalhockey_als_geen_veldhockey(family_member_number) {
    // console.log("Geen veldhockey dus verplicht zaalhockey")
    const family_member = document.querySelector(`#family-member-${family_member_number}`);
    const lidvorm = family_member.querySelector(`input[name="veldhockey-type-family-member-${family_member_number}"]:checked`)?.value;
    const zaalhockeyCheckbox = family_member.querySelector('.switch input');

    if (lidvorm == "Geen") {  // Geen veldhockey -> Zaalhockey verplicht
        verplicht_zaalhockey(family_member);
    }
    else {
        free_restrictions_zaalhockey_but_keep_value(family_member);
    }
}


// ---------- Helper functions for export function ----------


function lock_lidstatus(family_member) {
    const lidstatus = family_member.querySelector('.lid-status select');
    lidstatus.value = "";
    lidstatus.disabled = true;
    lidstatus.classList.add("dim-option");
}


function lock_veldhockey(family_member) {
    const radios = family_member.querySelectorAll(`input[name^="veldhockey-type-family-member-"]`);
    radios.forEach(radio => {
        radio.disabled = true;
        radio.parentElement.classList.add("dim-option");
        radio.checked = false; // Deselect all
    });
}


function lock_selectieteam_toeslag(family_member) {
    const toeslag = family_member.querySelector('.column-3 select');
    toeslag.value = "Geen";
    toeslag.disabled = true;
}


function lock_zaalhockey(family_member) {
    const zaalhockeyCheckbox = family_member.querySelector('.switch input');
    zaalhockeyCheckbox.checked = false;
    zaalhockeyCheckbox.disabled = true;
    zaalhockeyCheckbox.classList.add("dim-option");
}


function lock_trimmer_option_veldhockey(family_member) {
    const radios = family_member.querySelectorAll(`input[name^="veldhockey-type-family-member-"]`);
    radios.forEach(radio => {
        const optie_is_trimmer_optie = radio.value === "Trimmer";

        if (optie_is_trimmer_optie) {
            radio.disabled = true;
            radio.checked = false;
            radio.parentElement.classList.add("dim-option");
        }
    });
}


function free_restrictions_lidstatus(family_member) {
    const lidstatus = family_member.querySelector('.lid-status select');
    if (lidstatus?.disabled) {
        lidstatus.disabled = false;
        lidstatus.classList.remove("dim-option");
    }
}


function free_restrictions_veldhockey(family_member) {
    const radios = family_member.querySelectorAll(`input[name^="veldhockey-type-family-member-"]`);
    radios.forEach(radio => {
        if (radio.disabled) {
            radio.disabled = false;
            radio.parentElement.classList.remove("dim-option");
        }
    });
}


function free_restrictions_selectieteam_toeslag(family_member) {
    const toeslag = family_member.querySelector('.column-3 select');
    if (toeslag?.disabled) {
        toeslag.disabled = false;
    }
}


function free_restrictions_zaalhockey(family_member) {
    const zaalhockeyCheckbox = family_member.querySelector('.switch input');
    const lidvorm = family_member.querySelector(`input[name^="veldhockey-type-family-member-"]:checked`)?.value;

    if (zaalhockeyCheckbox?.disabled && lidvorm != "Geen") {
        zaalhockeyCheckbox.checked = false;
        zaalhockeyCheckbox.disabled = false;
        zaalhockeyCheckbox.classList.remove("dim-option");
    }
}


function free_restrictions_zaalhockey_but_keep_value(family_member) {
    const zaalhockeyCheckbox = family_member.querySelector('.switch input');
    const lidvorm = family_member.querySelector(`input[name^="veldhockey-type-family-member-"]:checked`)?.value;

    if (zaalhockeyCheckbox?.disabled && lidvorm != "Geen") {        
        zaalhockeyCheckbox.disabled = false;
        zaalhockeyCheckbox.classList.remove("dim-option");
    }
}


function verplicht_volwaardig_veldhockeylid(family_member) {
    const radios = family_member.querySelectorAll(`input[name^="veldhockey-type-family-member-"]`);
    radios.forEach(radio => {
        if (radio.value === "Volwaardig") {
            radio.checked = true;
            radio.disabled = false;
            radio.parentElement.classList.remove("dim-option");
        } else {
            radio.disabled = true;
            radio.checked = false;
            radio.parentElement.classList.add("dim-option");
        }
    });
}


function verplicht_zaalhockey(family_member) {
    const zaalhockeyCheckbox = family_member.querySelector('.switch input');
    zaalhockeyCheckbox.checked = true;
    zaalhockeyCheckbox.disabled = true;
    zaalhockeyCheckbox.classList.add("dim-option");
}


function rename_selectieteam_toeslag_jong_senioren(family_member) {
    const toeslag = family_member.querySelector('.column-3 select');
    if (toeslag?.options.length >= 4) {
        toeslag.options[0].text = "Geen / Speelster D1/D2 / Speler H1/H2";
        toeslag.options[2].text = "Speelster D1/D2";
        toeslag.options[3].text = "Speler H1/H2";
    }
}


function remove_selectieteam_toeslag_jong_senioren(family_member) {
    const toeslag = family_member.querySelector('.column-3 select');
    if (toeslag?.options.length >= 4) {
        const defaultLabel = "Geen / 1e team / 2e team";

        if (toeslag.options[0].text !== defaultLabel) {
            toeslag.options[0].text = defaultLabel;
            toeslag.options[2].text = "1e";
            toeslag.options[3].text = "2e";
        }
    }
}

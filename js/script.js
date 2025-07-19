// Contributie data
const contributie_veldhockey = [
    { category: "O6 Funkeys", minAge: 5, maxAge: 5, amount: 230 },
    { category: "O7 Coolkids", minAge: 6, maxAge: 6, amount: 255 },
    { category: "O8 & O9", minAge: 7, maxAge: 8, amount: 354 },
    { category: "O10", minAge: 9, maxAge: 9, amount: 415 },
    { category: "O12 t/m O18", minAge: 10, maxAge: 17, amount: 415 },
    // { category: "O10 t/m O18", minAge: 9, maxAge: 17, amount: 415 },
    { category: "Jong-Senioren", minAge: 18, maxAge: 25, amount: 342 },
    { category: "Senioren", minAge: 26, maxAge: 110, amount: 425 },
    { category: "Trimmer", amount: 275 },
    { category: "Trainingslid", amount: 275 },
    { category: "Dames Veteranen", amount: 275 },
    { category: "Geen", amount: 0 }
];

const toeslagen_veldhockey = [
    { name: "Selectietoeslag 1e team", minAge: 10, maxAge: 17, amount: 70 },
    { name: "Selectietoeslag 2e team", minAge: 10, maxAge: 17, amount: 36 }
];

const contributie_zaalhockey = [
    { category: "O8 & O9 Zaal", minAge: 7, maxAge: 8, amount: 80 },
    { category: "O10 t/m O18 Zaal", minAge: 9, maxAge: 17, amount: 90 },
    { category: "Senioren Zaal", minAge: 18, maxAge: 110, amount: 55 }
];

const bijdrage_kledingplan = {
    jaarlijkse_bijdrage_kledingplan: { minAge: 6, maxAge: 17, amount: 45.50 },
    borg_kledingplan: { minAge: 6, maxAge: 17, amount: 50.00 }
};

const administratiekosten = {
    eenmalig_inschrijfgeld: 85,
    administratiekosten_herinschrijving: 43
};

// Min/max leeftijd hockeyen
const min_leeftijd_hockeyen = contributie_veldhockey
    .filter(c => typeof c.minAge === 'number') // exclude entries without minAge
    .reduce((lowest, current) => Math.min(lowest, current.minAge), Infinity);
const leeftijd_naar_senioren = 18;
// console.log(min_leeftijd_hockeyen, leeftijd_naar_senioren)


// Min/max leeftijd volwaardig lid (verplicht trainingen en wedstrijden en zaalhockey)
const min_leeftijd_verplicht_volwaardig_veldhockey_lid = 5
const max_leeftijd_verplicht_volwaardig_veldhockey_lid = leeftijd_naar_senioren - 1;
// console.log(min_leeftijd_verplicht_volwaardig_veldhockey_lid, max_leeftijd_verplicht_volwaardig_veldhockey_lid)


// Min/max leeftijd Jong-Senioren
const jong_senioren = contributie_veldhockey.find(c => c.category === "Jong-Senioren");
const min_age_jong_senioren = jong_senioren.minAge;
const max_age_jong_senioren = jong_senioren.maxAge;
// console.log(min_age_jong_senioren, max_age_jong_senioren)

// Min/max leeftijd betalen selectieteam
const min_leeftijd_selectieteam = toeslagen_veldhockey
    .filter(c => typeof c.minAge === 'number') // exclude entries without minAge
    .reduce((lowest, current) => Math.min(lowest, current.minAge), Infinity);
const max_leeftijd_selectieteam = leeftijd_naar_senioren - 1;
// console.log(min_leeftijd_selectieteam, max_leeftijd_selectieteam)


// Min/max leeftijd zaalhockey/verplicht
const min_leeftijd_zaalhockey_verplicht = contributie_zaalhockey
    .filter(c => typeof c.minAge === 'number') // exclude entries without minAge
    .reduce((lowest, current) => Math.min(lowest, current.minAge), Infinity);
const max_leeftijd_zaalhockey_verplicht = leeftijd_naar_senioren - 1;   
// console.log(min_leeftijd_zaalhockey_verplicht, max_leeftijd_zaalhockey_verplicht)


let memberCount = 1;
let uniqueMembers = [];


document.addEventListener("DOMContentLoaded", function () {

    // --------------------------------------------------- Seizoen buttons ---------------------------------------------------

    function checkCurrentSeason() {
        const now = new Date();
        const curr_year = now.getFullYear();
        const curr_month = now.getMonth() + 1; // januari = 0, dus +1

        if (curr_month <= 8) {
            // Januari t/m augustus → huidig seizoen is vorig jaar / dit jaar
            return `${curr_year - 1}/${curr_year}`;
        } else {
            // September t/m december → huidig seizoen is dit jaar / volgend jaar
            return `${curr_year}/${curr_year + 1}`;
        }        
    }

    let title = document.querySelector('.top-bar h1');
    title.textContent += ` Seizoen ${checkCurrentSeason()}`;

    // const now = new Date();
    // const curr_year = now.getFullYear();
    // const curr_month = now.getMonth() + 1; // januari = 0, dus +1
    // 
    // let huidigSeizoen = "";
    // let komendSeizoen = "";
    // 
    // if (curr_month <= 8) {
    //     // Januari t/m augustus → huidig seizoen is vorig jaar / dit jaar
    //     huidigSeizoen = `${curr_year - 1}/${curr_year}`;
    //     komendSeizoen = `${curr_year}/${curr_year + 1}`;
    // } else {
    //     // September t/m december → huidig seizoen is dit jaar / volgend jaar
    //     huidigSeizoen = `${curr_year}/${curr_year + 1}`;
    //     komendSeizoen = `${curr_year + 1}/${curr_year + 2}`;
    // }
    // 
    // const huidigBtn = document.querySelector('.season-button[data-season="huidig"]');
    // huidigBtn.textContent = `Huidig seizoen (${huidigSeizoen})`;
    // const komendBtn = document.querySelector('.season-button[data-season="komend"]');
    // komendBtn.textContent = `Indicatie (!) komend seizoen* (${komendSeizoen})`;
    // 
    // // Handle click
    // document.querySelectorAll('.season-button').forEach(button => {
    //     button.addEventListener('click', () => {
    //         document.querySelectorAll('.season-button').forEach(btn => btn.classList.remove('active'));
    //         button.classList.add('active');
    //         // const gekozenSeizoen = button.dataset.season;
    // 
    //         checkMonthAndYearBothFilled()
    //     });
    // });

    // ---------------------------------------------------------------------------------------------------------------------


    // --------------------------------------------------- Familie ---------------------------------------------------

    const family_container = document.getElementById('family-members-container');

    function addFamilyMember(family_member_number) {
        resetFamilyContributionTotaal();

        const html_family_member = `
            <div class="family-member" id="family-member-${family_member_number}">
                ${family_member_number === 1 ? '' : `
                    <button class="delete-member-btn" onclick="deleteFamilyMember(${family_member_number})">
                    &times;
                    </button>
                `}

                <div class="column-1">
                    <div class="family-member-field-title">
                        Geboortejaar
                        <div class="info-wrap">
                            ⓘ
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
                            ⓘ
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
                    <label><input type="radio" name="veldhockey-type-family-member-${family_member_number}" value="Dames Veteranen">Dames Veteranen</label><br>
                    <label><input type="radio" name="veldhockey-type-family-member-${family_member_number}" value="Geen">Geen veldhockey</label>
                    </div>
                </div>

                <div class="column-3">
                    <div class="family-member-field-title">
                        Selectieteam toeslag
                        <div class="info-wrap">
                            ⓘ
                            <div class="custom-tooltip-left">
                                Alleen van toepassing op de O12-O18 teams en Jong-Senioren. Jong-Senioren spelend in D1/D2/H1/H2 betalen Senioren-contributie.
                            </div>
                        </div>
                    </div>
                    <div class="user-choose-option">
                    <div class="fill-space-before-select"></div>
                    <select class="select-field">
                        <option value="" disabled selected>Geen / 1e / 2e</option>
                        <option>Geen</option>
                        <option>1e</option>
                        <option>2e</option>
                    </select>
                    </div>
                </div>

                <div class="column-4">
                    <div class="family-member-field-title">
                        Speelt zaalhockey?
                        <div class="info-wrap">
                            ⓘ
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

        family_container.insertAdjacentHTML('beforeend', html_family_member);
        fillYearOptions(family_member_number);  

        const newFamilyElement = document.querySelector(`#family-member-${family_member_number}`);

        const lidstatusSelect = newFamilyElement.querySelector('.lid-status select');
        const veldhockeyRadios = newFamilyElement.querySelectorAll(`input[name="veldhockey-type-family-member-${family_member_number}"]`);
        const toeslagSelect = newFamilyElement.querySelector('.column-3 select');
        const zaalhockeyCheckbox = newFamilyElement.querySelector('.switch input');
        const maandSelect = newFamilyElement.querySelector('.select-field-month');
        const jaarSelect = newFamilyElement.querySelector('.select-field-year');

        lidstatusSelect.addEventListener('change', () => calculateContributie(family_member_number));
        // veldhockeyRadios.forEach(radio => radio.addEventListener('change', () => calculateContributie(family_member_number)));
        veldhockeyRadios.forEach(radio => 
            radio.addEventListener('change', () => {
                calculateContributie(family_member_number);
                verplicht_zaalhockey_als_geen_veldhockey(family_member_number);
            })
        );
        toeslagSelect.addEventListener('change', () => calculateContributie(family_member_number));
        zaalhockeyCheckbox.addEventListener('change', () => calculateContributie(family_member_number));
        maandSelect.addEventListener('change', () => {
            checkMonthAndYearBothFilled(family_member_number);
            calculateContributie(family_member_number);
        });
        jaarSelect.addEventListener('change', () => {
            checkMonthAndYearBothFilled(family_member_number);
            calculateContributie(family_member_number);
        });

    }

    // Add first member on load
    addFamilyMember(memberCount);
    uniqueMembers.push(memberCount);
    
    // Add new member on button click
    document.getElementById('add_member').addEventListener('click', () => {
        memberCount++;
        addFamilyMember(memberCount);
        uniqueMembers.push(memberCount);
        updateAllContributionPositions();
    });

    function deleteFamilyMember(memberNumber) {
        const element = document.getElementById(`family-member-${memberNumber}`);
        if (element) element.remove();
    
        uniqueMembers = uniqueMembers.filter(n => n !== memberNumber);
    
        updateFamilyContributionTotaal();
        syncTotalContributionElementPosition();
        updateAllContributionPositions();
    }
    window.deleteFamilyMember = deleteFamilyMember;


    // ---------------------------------------------------------------------------------------------------------------------

    // --------------------------------------------------- Geboortedatum ---------------------------------------------------

    function fillYearOptions(family_member_number) {
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
    
    function checkMonthAndYearBothFilled(family_member_number) {       
        const family_member = document.querySelector(`#family-member-${family_member_number}`); 
        const maand_value = family_member.querySelector('.select-field-month').value;
        const jaar_value = parseInt(family_member.querySelector('.select-field-year').value);

        if (maand_value && jaar_value) {
            const leeftijd = calculateAge(maand_value, jaar_value)

            const category_div = family_member.querySelector('.show-age-category');
            const category = getVeldhockeyCategory(leeftijd);
            if (category) {
                category_div.textContent = `Leeftijdscategorie: ${category.category}`;
            } else {
                category_div.textContent = `Nog even geduld! Zodra je op 1 oktober vijf bent, ben je van harte welkom!`;
            }

            // Niet mogelijk om lidstatus te kiezen als te jong om lid te zijn
            lockLLidstatusIfTooYoung(family_member_number, leeftijd);

            // Auto-select “Volwaardig” if age is under 18 and dsable & visually dim the other radio options
            lockLidmaatschapsvormYouthOnly(family_member_number, leeftijd);

            // Alleen mogelijk selectieteams O8-O18 teams, anders automatisch 'Geen' en niet bewerkbaar
            lockSelectieteamToeslagNonYouthTeams(family_member_number, leeftijd);

            // Lock slider zaalhockey for O6/O7 (not possible) & O8-O18 (obligatory) teams
            lockSliderYouthTeams(family_member_number, leeftijd);

            // Verplicht zaalhockey als geen veldhockey
            // verplicht_zaalhockey_als_geen_veldhockey(family_member_number);
            keep_verplict_zaalhockey_locked(family_member_number, leeftijd)

            if (leeftijd < min_leeftijd_hockeyen) {
                resetFamilyContributionTotaal();
                // Add updateAllContributionPositions but then contributie/totaal verspringt weer....
            }
        }        
    }

    function calculateAge(maand_value, jaar_value) {    
        const curr_year = new Date().getFullYear();
        const curr_month = new Date().getMonth() + 1; // zero-based

        let seizoen_start_jaar = curr_month <= 8 ? curr_year - 1 : curr_year;
        // const gekozen_seizoen = document.querySelector('.season-button.active').dataset.season;
        // let seizoen_start_jaar;
        // if (gekozen_seizoen === "huidig") {
        //     seizoen_start_jaar = curr_month <= 8 ? curr_year - 1 : curr_year;
        // } else {
        //     seizoen_start_jaar = curr_month <= 8 ? curr_year : curr_year + 1;
        // }

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

    // Show leeftijdscategorie
    function getVeldhockeyCategory(age) {
        const match = contributie_veldhockey.find(c => 
            typeof c.minAge === "number" && typeof c.maxAge === "number" && 
            age >= c.minAge && age <= c.maxAge
        );
        return match || null;
    }


    // ---------------------------------------------------------------------------------------------------------------------

    // --------------------------------------------------- Lidstatus ---------------------------------------------------

    function lockLLidstatusIfTooYoung(family_member_number, leeftijd) {
        const familyMemberElement = document.querySelector(`#family-member-${family_member_number}`);
        const lidstatusSelect = familyMemberElement.querySelector('.lid-status select');
    
        if (leeftijd < min_leeftijd_verplicht_volwaardig_veldhockey_lid) {
            lidstatusSelect.value = "";
            lidstatusSelect.disabled = true;
            lidstatusSelect.classList.add("dim-option");
        } else {
            lidstatusSelect.disabled = false;
            lidstatusSelect.classList.remove("dim-option");
        }
    }
      
    // ---------------------------------------------------------------------------------------------------------------------

    // --------------------------------------------------- Lidmaatschapsvorm veldhockey ---------------------------------------------------

    function lockLidmaatschapsvormYouthOnly(family_member_number, leeftijd) {
        const family_member = document.querySelector(`#family-member-${family_member_number}`);
        const radios = family_member.querySelectorAll(`input[name="veldhockey-type-family-member-${family_member_number}"]`);

        if (leeftijd >= min_leeftijd_verplicht_volwaardig_veldhockey_lid && leeftijd <= max_leeftijd_verplicht_volwaardig_veldhockey_lid) {
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
        } else if (leeftijd < min_leeftijd_verplicht_volwaardig_veldhockey_lid) {
            radios.forEach(radio => {
                radio.disabled = true;  // disable buttons if one is too young
                radio.parentElement.classList.add("dim-option");
                radio.checked = false; // Deselect all
            });
        }
        else {
            radios.forEach(radio => {
                const optie_is_danes_veteranen_optie = radio.value === "Dames Veteranen";
                const optie_is_trimmer_optie = radio.value === "Trimmer";

                if ((optie_is_danes_veteranen_optie || optie_is_trimmer_optie) && leeftijd >= min_age_jong_senioren && leeftijd <= max_age_jong_senioren) {
                    radio.disabled = true;
                    radio.checked = false;
                    radio.parentElement.classList.add("dim-option");
                } else {
                    radio.disabled = false;
                    radio.parentElement.classList.remove("dim-option");
                }
            });
        }
    }

    function verplicht_zaalhockey_als_geen_veldhockey(family_member_number) {
        const familyMemberElement = document.querySelector(`#family-member-${family_member_number}`);
        const lidvorm = familyMemberElement.querySelector(`input[name="veldhockey-type-family-member-${family_member_number}"]:checked`)?.value;
        const zaalhockeyCheckbox = familyMemberElement.querySelector('.switch input');

        if (lidvorm == "Geen") {  // Geen veldhockey -> Zaalhockey verplicht
            zaalhockeyCheckbox.checked = true;
            zaalhockeyCheckbox.disabled = true;
            zaalhockeyCheckbox.classList.add("dim-option");
        }
        else {
            zaalhockeyCheckbox.checked = false;
            zaalhockeyCheckbox.disabled = false;
            zaalhockeyCheckbox.classList.remove("dim-option");
        }

        calculateContributie(family_member_number);
    }

    function keep_verplict_zaalhockey_locked(family_member_number, leeftijd) {
        const familyMemberElement = document.querySelector(`#family-member-${family_member_number}`);
        const lidvorm = familyMemberElement.querySelector(`input[name="veldhockey-type-family-member-${family_member_number}"]:checked`)?.value;
        const zaalhockeyCheckbox = familyMemberElement.querySelector('.switch input');

        if (leeftijd >= leeftijd_naar_senioren && lidvorm == "Geen") {
            zaalhockeyCheckbox.checked = true;
            zaalhockeyCheckbox.disabled = true;
            zaalhockeyCheckbox.classList.add("dim-option");
        }
        else if (leeftijd >= leeftijd_naar_senioren) {
            zaalhockeyCheckbox.checked = false;
            zaalhockeyCheckbox.disabled = false;
            zaalhockeyCheckbox.classList.remove("dim-option");
        }
    }
    
    
    // ---------------------------------------------------------------------------------------------------------------------


    // --------------------------------------------------- Selectieteam ---------------------------------------------------

    function lockSelectieteamToeslagNonYouthTeams(family_member_number, leeftijd) {
        const familyMemberElement = document.querySelector(`#family-member-${family_member_number}`);
        const toeslagSelect = familyMemberElement.querySelector('.column-3 select');

        const is_junior = leeftijd >= min_leeftijd_selectieteam && leeftijd <= max_leeftijd_selectieteam;
        const is_jong_senior = leeftijd >= min_age_jong_senioren && leeftijd <= max_age_jong_senioren;

        if (is_junior || is_jong_senior) {
            toeslagSelect.disabled = false;
    
            // // Optional: clear existing value so user reselects
            // if (toeslagSelect.value === "Geen") {
            //     toeslagSelect.value = ""; // or keep existing if you prefer
            // }
        } else {
            toeslagSelect.value = "Geen";
            toeslagSelect.disabled = true;
        }

        resetFamilyContributionTotaal();
        syncTotalContributionElementPosition();
    }

    // ---------------------------------------------------------------------------------------------------------------------


    // --------------------------------------------------- Zaalhockey ---------------------------------------------------

    // Verplicht O8 t/m O18
    function lockSliderYouthTeams(family_member_number, leeftijd) {
        const familyMemberElement = document.querySelector(`#family-member-${family_member_number}`);
        const zaalhockeyCheckbox = familyMemberElement.querySelector('.switch input');

        if (leeftijd >= min_leeftijd_zaalhockey_verplicht && leeftijd <= max_leeftijd_zaalhockey_verplicht) {
            zaalhockeyCheckbox.checked = true;
            zaalhockeyCheckbox.disabled = true;
            zaalhockeyCheckbox.classList.add("dim-option");
        } else if (leeftijd < min_leeftijd_zaalhockey_verplicht) {
            zaalhockeyCheckbox.checked = false;
            zaalhockeyCheckbox.disabled = true;
            zaalhockeyCheckbox.classList.add("dim-option");
        } else {
            zaalhockeyCheckbox.checked = false;
            zaalhockeyCheckbox.disabled = false;
            zaalhockeyCheckbox.classList.remove("dim-option");
        }
    }
    
    // ---------------------------------------------------------------------------------------------------------------------


    // --------------------------------------------------- Contributie berekenen ---------------------------------------------------


    function calculateContributie(family_member_number) {
        const family_member = document.querySelector(`#family-member-${family_member_number}`);
    
        // 1. Get user inputs
        const maand_value = family_member.querySelector('.select-field-month')?.value;
        const jaar_value = parseInt(family_member.querySelector('.select-field-year')?.value);
        const lidstatus = family_member.querySelector('.lid-status select')?.value;
        const lidvorm = family_member.querySelector(`input[name="veldhockey-type-family-member-${family_member_number}"]:checked`)?.value;
        const toeslag = family_member.querySelector('.column-3 select')?.value;
        const zaalhockey = family_member.querySelector('.switch input')?.checked;

        const jong_senioren = contributie_veldhockey.find(c => c.category === "Jong-Senioren");
        const min_age_jong_senioren = jong_senioren.minAge;
        const max_age_jong_senioren = jong_senioren.maxAge

        if (!maand_value || isNaN(jaar_value) || !lidstatus || !lidvorm || !toeslag || toeslag === "") {
            resetContributie(family_member_number);
            return;
        }
    

        // 3. Compute age using shared function
        const leeftijd = calculateAge(maand_value, jaar_value);
        if (leeftijd === null || leeftijd < min_leeftijd_hockeyen) {
            resetContributie(family_member_number);
            return;
        }
    

        let contributieTotaal = 0;
    
        // 4. Veldhockey contributie
        let matchedCategory = null;

        let info_contributie_veldhockey = 0;
        if (["Trimmer", "Trainingslid", "Dames Veteranen", "Geen"].includes(lidvorm)) {
            // Trimmer/Traingslid/Dames Veteranen access directly but should be at least 18 years old
            if (leeftijd < leeftijd_naar_senioren) {
                resetContributie(family_member_number);
                return;
            }
            matchedCategory = contributie_veldhockey.find(c => c.category === lidvorm);
        } else { // lidvorm is "Volwaardig", base finding category now on age
            if (leeftijd >= min_age_jong_senioren && leeftijd <= max_age_jong_senioren && ["1e", "2e"].includes(toeslag)) {
                matchedCategory = contributie_veldhockey.find(c => c.category === "Senioren");
            } else {
                matchedCategory = contributie_veldhockey.find(c =>
                    typeof c.minAge === "number" &&
                    typeof c.maxAge === "number" &&
                    leeftijd >= c.minAge &&
                    leeftijd <= c.maxAge
                );
            }   
        }
        if (matchedCategory) {
            contributieTotaal += matchedCategory.amount;
            info_contributie_veldhockey = matchedCategory.amount
        } else {
            // No valid match — reset to prevent false totals
            resetContributie(family_member_number);
            return;
        }

        // 5. Selectieteam toeslag
        let info_contributie_selectietoeslag = 0;
        const toeslagInfo = toeslagen_veldhockey.find(item =>
            leeftijd >= item.minAge &&
            leeftijd <= item.maxAge &&
            item.name.includes(`Selectietoeslag ${toeslag} team`)
        );

        if (toeslagInfo) {
            contributieTotaal += toeslagInfo.amount;
            info_contributie_selectietoeslag = toeslagInfo.amount;
        }
    
        // 6. Zaalhockey contributie
        let info_contributie_zaalhockey = 0;
        if (zaalhockey) {
            const zaalCategory = contributie_zaalhockey.find(z =>
                leeftijd >= z.minAge && leeftijd <= z.maxAge
            );
            if (zaalCategory) {
                contributieTotaal += zaalCategory.amount;
                info_contributie_zaalhockey = zaalCategory.amount;
            }
        }
    
        // 7. Kledingplan (annual + deposit)
        let info_contributie_kledingplan = 0;
        if (leeftijd >= bijdrage_kledingplan.jaarlijkse_bijdrage_kledingplan.minAge && leeftijd <= bijdrage_kledingplan.jaarlijkse_bijdrage_kledingplan.maxAge) {
            contributieTotaal += bijdrage_kledingplan.jaarlijkse_bijdrage_kledingplan.amount;
            info_contributie_kledingplan = bijdrage_kledingplan.jaarlijkse_bijdrage_kledingplan.amount;

            if (lidstatus === "Inschrijven" || lidstatus === "Herinschrijven") {
                contributieTotaal += bijdrage_kledingplan.borg_kledingplan.amount;
                info_contributie_kledingplan += bijdrage_kledingplan.borg_kledingplan.amount;
            }
        }
    
        // 8. Administratiekosten
        let info_contributie_adminstratiekosten = 0
        if (lidstatus === "Inschrijven") {
            contributieTotaal += administratiekosten.eenmalig_inschrijfgeld;
            info_contributie_adminstratiekosten = administratiekosten.eenmalig_inschrijfgeld;
        } else if (lidstatus === "Herinschrijven") {
            contributieTotaal += administratiekosten.administratiekosten_herinschrijving;
            info_contributie_adminstratiekosten = administratiekosten.administratiekosten_herinschrijving;
        }
    
        // 9. Update contributie display
        const totalField = family_member.querySelector('.amount-contributie-totaal');

        totalField.innerHTML = `
            € ${contributieTotaal.toFixed(2).replace('.', ',')}
            <span id="contributie-info-icon-${family_member_number}" class="contributie-info-icon hidden"
            onclick="additionalInfoContributie(
                ${family_member_number},
                ${info_contributie_veldhockey},
                ${info_contributie_selectietoeslag},
                ${info_contributie_zaalhockey},
                ${info_contributie_kledingplan},
                ${info_contributie_adminstratiekosten}
            )">ⓘ</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <div id="contributie-breakdown-${family_member_number}" class="contributie-breakdown hidden"></div>
        `;

        syncTotalContributionElementPosition();
        updateFamilyContributionTotaal();

        updateAllContributionPositions();
    }

    function resetContributie(family_member_number) {
        const family_member = document.querySelector(`#family-member-${family_member_number}`);
        const contributieTotaalField = family_member.querySelector('.amount-contributie-totaal');
        if (contributieTotaalField) {
            contributieTotaalField.textContent = '';
            syncTotalContributionElementPosition()
        }
    }

    function updateAllContributionPositions() {
        let min_contribution_left_position = Infinity;
    
        for (const memberNumber of uniqueMembers) {
            const memberBlock = document.getElementById(`family-member-${memberNumber}`);
            if (!memberBlock) continue;
    
            const amountField = memberBlock.querySelector('.text-contributie-totaal');
            if (!amountField) continue;

            // Clear style before measuring
            amountField.style.position = '';
            amountField.style.left = '';
    
            const leftPosition = amountField.getBoundingClientRect().left;
    
            if (leftPosition < min_contribution_left_position) {
                min_contribution_left_position = leftPosition;
            }
        }
    
        // Apply consistent alignment to all member contribution fields
        for (const memberNumber of uniqueMembers) {
            const memberBlock = document.getElementById(`family-member-${memberNumber}`);
            if (!memberBlock) continue;
    
            const amountField = memberBlock.querySelector('.text-contributie-totaal');
            if (!amountField) continue;
    
            const parentLeft = amountField.parentElement.getBoundingClientRect().left;
            const relativeOffset = min_contribution_left_position - parentLeft;
    
            amountField.style.position = 'relative';
            amountField.style.left = `${relativeOffset}px`;
        }

        syncTotalContributionElementPosition();

    }
    

    // ---------------------------------------------------------------------------------------------------------------------


    // --------------------------------------------------- Familie contributie berekenen ---------------------------------------------------

    window.addEventListener('load', syncTotalContributionElementPosition);
    window.addEventListener('resize', syncTotalContributionElementPosition);

    function syncTotalContributionElementPosition() {
        const reference = document.querySelector('.text-contributie-totaal');
        const target = document.querySelector('.text-family-contribution-total');
      
        if (reference && target) {
            const refRect = reference.getBoundingClientRect();
            const parentRect = target.parentElement.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            
            const textOffset = refRect.width - targetRect.width;
            const offset = refRect.left - parentRect.left + textOffset;
          
            target.style.marginLeft = `${offset}px`;

            syncMonthlyContributionElementPosition();
        }
    }


    function syncMonthlyContributionElementPosition() {
        const totalField = document.querySelector('.amount-family-contributie-total');
        const monthlyField = document.querySelector('.family-contribution-total-per-month');
    
        if (totalField && monthlyField) {
            // Allow layout to update before measuring
            requestAnimationFrame(() => {
                const parentRect = monthlyField.parentElement.getBoundingClientRect();
                const totalAmountRect = totalField.getBoundingClientRect();
                const monthlyAmountRect = monthlyField.getBoundingClientRect();
    
                const leftOffset = totalAmountRect.right - monthlyAmountRect.width - parentRect.left - 17;  // padding of 15 and border of 2 in .family-contribution-total
    
                monthlyField.style.position = 'relative';
                monthlyField.style.left = `${leftOffset}px`;
                monthlyField.style.top = 'auto';
            });
        }
    }

    function updateFamilyContributionTotaal() {
        let total = 0;
        let all_members_have_a_contribution = true;

        for (const memberNumber of uniqueMembers) {
            const memberBlock = document.getElementById(`family-member-${memberNumber}`);
            if (!memberBlock) continue;

            const amountField = memberBlock.querySelector('.amount-contributie-totaal');
            if (!amountField) {
                all_members_have_a_contribution = false;
                continue;
            }

            const amountText = amountField.textContent.trim();
            const euroMatch = amountText.match(/€\s*([\d,.]+)/);

            if (euroMatch && euroMatch[1]) {
                const numericValue = parseFloat(euroMatch[1].replace(',', '.'));
                if (!isNaN(numericValue)) {
                    total += numericValue;
                } else {
                    all_members_have_a_contribution = false;
                }
            } else {
                all_members_have_a_contribution = false;
            }
        }

        if (!all_members_have_a_contribution) {
            resetFamilyContributionTotaal();
            return;
        }

        // Familiekorting: € 10 per familielid vanaf 2e familielid
        if (uniqueMembers.length > 1) {
            total -= 10 * (uniqueMembers.length - 1);
        }

        // Update total
        const totalField = document.querySelector('.amount-family-contributie-total');
        const monthlyField = document.querySelector('.family-contribution-total-per-month');

        if (totalField && monthlyField && (total != 0)) {
            totalField.innerHTML = `
                € ${total.toFixed(2).replace('.', ',')}
                <span id="contributie-totaal-info-icon" class="contributie-info-icon hidden"
                onclick="additionalInfoTotaalContributie()">ⓘ</span>
                <div id="contributie-totaal-breakdown" class="contributie-totaal-breakdown hidden"></div>
            `;

            const monthlyAmount = Math.ceil(total / 12 * 100) / 100; // ceil to cents
            monthlyField.textContent = `€ ${monthlyAmount.toFixed(2).replace('.', ',')} per maand`;

            monthlyField.textContent = `€ ${monthlyAmount.toFixed(2).replace('.', ',')} per maand`;
        }

    }

    function resetFamilyContributionTotaal() {
        const family_contribution_total = document.querySelector('.amount-family-contributie-total');
        if (family_contribution_total) {
            family_contribution_total.textContent = '';
            syncTotalContributionElementPosition();
        }

        const monthlyField = document.querySelector('.family-contribution-total-per-month');
        if (monthlyField) {
            monthlyField.textContent = '';
        }
    }

      
    // ---------------------------------------------------------------------------------------------------------------------

});


function additionalInfoContributie(
    family_member_number,
    info_contributie_veldhockey,
    info_contributie_selectietoeslag,
    info_contributie_zaalhockey,
    info_contributie_kledingplan,
    info_contributie_adminstratiekosten
) {
    const breakdownContributie = document.getElementById(`contributie-breakdown-${family_member_number}`);
    if (!breakdownContributie) return;

    // Optional: Format €0.00 values as blank or hide zero rows
    const formatEuro = (value) => value > 0 ? `€ ${value.toFixed(2).replace('.', ',')}` : `€ 0,00`;

    const breakdownHTML = `
        <strong>Contributieoverzicht:</strong>
        <ul class="contributie-breakdown-list">
            <li>🏑 Veldhockey: ${formatEuro(info_contributie_veldhockey)}</li>
            <li>🎯 Selectieteamtoeslag: ${formatEuro(info_contributie_selectietoeslag)}</li>
            <li>🏒 Zaalhockey: ${formatEuro(info_contributie_zaalhockey)}</li>
            <li>👕 Kledingplan: ${formatEuro(info_contributie_kledingplan)}</li>
            <li>🗂️ Administratiekosten: ${formatEuro(info_contributie_adminstratiekosten)}</li>
        </ul>
    `;

    breakdownContributie.innerHTML = breakdownHTML;
    breakdownContributie.classList.toggle("fade-visible");
}    


function additionalInfoTotaalContributie() {
    let html_total_contributie = `
        <strong>Totaaloverzicht:</strong>
        <ul class="contributie-totaal-breakdown-list">        
    `;

    uniqueMembers.forEach((memberNumber, index) => {
        const memberBlock = document.getElementById(`family-member-${memberNumber}`);
        if (!memberBlock) return;
    
        const contributieMatch = memberBlock.querySelector('.amount-contributie-totaal')?.textContent.trim().replace(',', '.').match(/€\s*([\d,.]+)/);
        const contributie_amount = contributieMatch?.[1] ?? '—';
    
        html_total_contributie += `<li>🏑 Familylid ${index + 1}: € ${contributie_amount.replace('.', ',')}</li>`;
    });
    
    if (uniqueMembers.length > 1) {
        html_total_contributie += `<li>Familiekorting: € ${10 * (uniqueMembers.length - 1)}</li>`;
    }

    html_total_contributie += `</ul>`;

    // Update the breakdown container's HTML
    const breakdownContainer = document.getElementById("contributie-totaal-breakdown");
    breakdownContainer.innerHTML = html_total_contributie;

    // Toggle visibility
    breakdownContainer.classList.toggle("fade-visible");
}

// -------------------------- 1. Basiscontributie veldhockey --------------------------
export const contributie_veldhockey = [
    { category: "O6 Funkeys", minAge: 5, maxAge: 5, amount: 230 },
    { category: "O7 Coolkids", minAge: 6, maxAge: 6, amount: 255 },
    { category: "O8 & O9", minAge: 7, maxAge: 8, amount: 354 },
    { category: "O10", minAge: 9, maxAge: 9, amount: 415 },
    { category: "O12 t/m O18", minAge: 10, maxAge: 17, amount: 415 },
    { category: "Jong-Senioren", minAge: 18, maxAge: 25, amount: 342 },
    { category: "Senioren", minAge: 26, maxAge: 110, amount: 425 },
    { category: "Trimmer", amount: 275 },
    { category: "Trainingslid", amount: 275 },
    { category: "Geen", amount: 0 }
];

export const min_leeftijd_hockeyen = 
    contributie_veldhockey.filter(c => typeof c.minAge === 'number') // exclude entries without minAge
                          .reduce((lowest, current) => Math.min(lowest, current.minAge), Infinity);
export const leeftijd_naar_senioren = 18;

const jong_senioren = contributie_veldhockey.find(c => c.category === "Jong-Senioren");
export const min_age_jong_senioren = jong_senioren.minAge;
export const max_age_jong_senioren = jong_senioren.maxAge;

// 1.5 Min/max leeftijd volwaardig lid -> verplicht trainingen, wedstrijden en zaalhockey
export const min_leeftijd_verplicht_volwaardig_veldhockey_lid = 5
export const max_leeftijd_verplicht_volwaardig_veldhockey_lid = leeftijd_naar_senioren - 1;

// ------------------------------------------------------------------------------

// -------------------------- 2. Toeslagen veldhockey --------------------------
export const toeslagen_veldhockey = [
    { name: "Selectietoeslag 1e team", minAge: 10, maxAge: 17, amount: 70 },
    { name: "Selectietoeslag 2e team", minAge: 10, maxAge: 17, amount: 36 }
];

export const min_leeftijd_selectieteam = 
    toeslagen_veldhockey.filter(c => typeof c.minAge === 'number') // exclude entries without minAge
                        .reduce((lowest, current) => Math.min(lowest, current.minAge), Infinity);
export const max_leeftijd_selectieteam = leeftijd_naar_senioren - 1;

// ------------------------------------------------------------------------------

// -------------------------- 3. Zaalhockeybijdrage --------------------------

export const contributie_zaalhockey = [
    { category: "O8 & O9 Zaal", minAge: 7, maxAge: 8, amount: 80 },
    { category: "O10 t/m O18 Zaal", minAge: 9, maxAge: 17, amount: 90 },
    { category: "Senioren Zaal", minAge: 18, maxAge: 110, amount: 55 }
];

export const min_leeftijd_zaalhockey = 
    contributie_zaalhockey.filter(c => typeof c.minAge === 'number') // exclude entries without minAge
                          .reduce((lowest, current) => Math.min(lowest, current.minAge), Infinity);
export const min_leeftijd_zaalhockey_verplicht = 
    contributie_zaalhockey.filter(c => typeof c.minAge === 'number') // exclude entries without minAge
                          .reduce((lowest, current) => Math.min(lowest, current.minAge), Infinity);
export const max_leeftijd_zaalhockey_verplicht = leeftijd_naar_senioren - 1;

// ------------------------------------------------------------------------------

// -------------------------- 4. Kledingbijdrage --------------------------

export const bijdrage_kledingplan = {
    jaarlijkse_bijdrage_kledingplan: { minAge: 6, maxAge: 17, amount: 45.50 },
    borg_kledingplan: { minAge: 6, maxAge: 17, amount: 50.00 }
};

// ------------------------------------------------------------------------------

// -------------------------- 5. Overige kosten --------------------------

export const administratiekosten = {
    Inschrijven: { amount: 85 },
    Herinschrijven: { amount: 43 }
};

// ------------------------------------------------------------------------------

export function show_breakdown_contributie_family_member(
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
            <li>🗂️ (Her)inschrijvingskosten: ${formatEuro(info_contributie_adminstratiekosten)}</li>
        </ul>
    `;

    breakdownContributie.innerHTML = breakdownHTML;
    breakdownContributie.classList.toggle("fade-visible");
}    
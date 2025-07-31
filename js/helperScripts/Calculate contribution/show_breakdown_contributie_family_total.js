import { 
    get_unique_members
} from '../State/unique_members_state.js';

export function show_breakdown_contributie_family_total() {
    let html_total_contributie = `
        <strong>Totaaloverzicht:</strong>
        <ul class="contributie-totaal-breakdown-list">        
    `;

    const uniqueMembers = get_unique_members();
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
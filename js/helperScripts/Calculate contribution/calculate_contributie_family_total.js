import {
    reset_contribution_family_total
} from '../Calculate contribution/reset_contributie_family_total.js';

import {
    show_breakdown_contributie_family_total
} from '../Calculate contribution/show_breakdown_contributie_family_total.js';

import { 
    get_unique_members
} from '../State/unique_members_state.js';


export function update_family_contributie_total() {
    let { all_members_have_a_contribution, sum_individual_contributions: total_contribution } = check_whether_all_members_have_a_contribution();

    if (!all_members_have_a_contribution) {
        reset_contribution_family_total();
        return;
    }

    total_contribution = apply_familiekorting(total_contribution);
    show_contributie_family_total(total_contribution);
}


// ---------- Helper functions for export function ----------


function apply_familiekorting(total) {
    const uniqueMembers = get_unique_members();
    // Familiekorting: € 10 per familielid vanaf 2e familielid
    if (uniqueMembers.length > 1) {
        total -= 10 * (uniqueMembers.length - 1);
    }
    return total;
}


function check_whether_all_members_have_a_contribution() {
    let all_members_have_a_contribution = true;
    let sum_individual_contributions = 0;

    const uniqueMembers = get_unique_members();
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
                sum_individual_contributions += numericValue;
            } else {
                all_members_have_a_contribution = false;
            }
        } else {
            all_members_have_a_contribution = false;
        }
    }
    
    return { all_members_have_a_contribution, sum_individual_contributions };
      
}


function show_contributie_family_total(total_contribution) {
    const totalField = document.querySelector('.amount-family-contributie-total');
    const monthlyField = document.querySelector('.family-contribution-total-per-month');

    if (totalField && monthlyField && (total_contribution != 0)) {
        totalField.innerHTML = `
            € ${total_contribution.toFixed(2).replace('.', ',')}
            <span id="contributie-totaal-info-icon" class="contributie-info-icon hidden"
            onclick="show_breakdown_contributie_family_total()">ⓘ</span>
            <div id="contributie-totaal-breakdown" class="contributie-totaal-breakdown hidden"></div>
        `;

        const monthlyAmount = Math.ceil(total_contribution / 12 * 100) / 100; // ceil to cents
        monthlyField.textContent = `€ ${monthlyAmount.toFixed(2).replace('.', ',')} per maand`;

        monthlyField.textContent = `€ ${monthlyAmount.toFixed(2).replace('.', ',')} per maand`;
    }
}
window.show_breakdown_contributie_family_total = show_breakdown_contributie_family_total;

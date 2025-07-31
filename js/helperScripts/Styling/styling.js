import { 
    get_unique_members
} from '../State/unique_members_state.js';


export function sync_monthly_contribution_element_position() {
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


export function sync_total_contribution_element_position() {
    const reference = document.querySelector('.text-contributie-totaal');
    const target = document.querySelector('.text-family-contribution-total');
  
    if (reference && target) {
        const refRect = reference.getBoundingClientRect();
        const parentRect = target.parentElement.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        
        const textOffset = refRect.width - targetRect.width;
        const offset = refRect.left - parentRect.left + textOffset;
      
        target.style.marginLeft = `${offset}px`;

        sync_monthly_contribution_element_position();
    }
}


export function update_all_contribution_positions() {
    let min_contribution_left_position = Infinity;

    const uniqueMembers = get_unique_members();
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

    sync_total_contribution_element_position();
}

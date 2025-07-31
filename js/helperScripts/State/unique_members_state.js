let uniqueMembers = [];

export function get_unique_members() {
  return uniqueMembers;
}

export function add_unique_member(family_member_number) {
  if (!uniqueMembers.includes(family_member_number)) {
    uniqueMembers.push(family_member_number);
  }
}

export function remove_unique_member(family_member_number) {
  uniqueMembers = uniqueMembers.filter(n => n !== family_member_number);
}

export function set_unique_members(list) {
  uniqueMembers = list;
}
